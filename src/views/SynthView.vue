<template>
	<component :is="currentLayout">
		<template #header>Header</template>
		<template #waves>
			<ModuleCardListWidget v-model="MainAudioCluster"></ModuleCardListWidget>
		</template>
		<template #filters>
			<EffectListWidget
				v-if="MainAudioCluster"
				v-model="effects"
				:context="mainContext"
				:sources="MainAudioCluster"
			></EffectListWidget>
		</template>
		<template #actions>
			<VsButton @click="createNewModule">New Wave</VsButton>
			<VsButton @click="createEffect('filter')">New filter</VsButton>
			<VsButton @click="deleteAll()">Delete all</VsButton>
		</template>
		<template #envelope>
			<EnvelopeControlWidget v-model="envelope" />
		</template>
		<template #analyser>
			<WaveAnalyser
				:source="merger"
				:canvas-width="1080"
				:canvas-height="200"
			></WaveAnalyser>
		</template>
		<template #piano>
			<KeyboardWidget
				:envelope="envelope"
				:context="mainContext"
				:source-cluster="MainAudioCluster"
			></KeyboardWidget>
		</template>
		<template #footer>
			Footer
			<RouterLink to="/home">asdas</RouterLink>
		</template>
	</component>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import { useMonitorSize } from "@/composables/useMonitorSize";
import MobileSynthLayout from "@/layouts/synth/MobileSynthLayout.vue";
import PortraitSynthLayout from "@/layouts/synth/PortraitSynthLayout.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import { type AudioEffect } from "@/models/AudioModule";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import EnvelopeControlWidget from "@/widgets/EnvelopeControl/EnvelopeControlWidget.vue";
import KeyboardWidget from "@/widgets/Keyboard/KeyboardWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { computed, onMounted, ref } from "vue";

const { isMobile, browserHeight, browserWidth } = useMonitorSize();

const currentLayout = computed(() => {
	if (browserWidth.value <= 400) {
		return MobileSynthLayout;
	}

	if (browserHeight.value < 500) {
		return PortraitSynthLayout;
	}

	return SynthLayout;
});

const MAX_EFFECTS = 5;

// const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger(1));
const MainAudioCluster = ref<AudioCluster>(
	new AudioCluster(mainContext.value, merger.value)
);
const envelope = ref<AudioEnvelope>({
	attack: 0.2,
	decay: 0.4,
	sustain: 0.5,
	release: 0.2,
});

const effects = ref<AudioEffect[]>([]);

function createNewModule() {
	const waveName = `wave ${MainAudioCluster.value.modules.length}`;
	MainAudioCluster.value.createModule(waveName, "sine");
}

function createEffect(effectType: string) {
	if (effects.value.length >= MAX_EFFECTS) return;
	if (effectType == "filter") {
		const nEffect = createFilter(mainContext.value);
		effects.value.push(nEffect);
	}
}

function createFilter(sourceCtx: AudioContext) {
	const newFilter = sourceCtx.createBiquadFilter();
	newFilter.type = "lowpass";
	newFilter.frequency.setTargetAtTime(200, sourceCtx.currentTime, 0);
	return newFilter;
}

function deleteAll() {
	MainAudioCluster.value.modules.forEach(module => {
		module.destroyModule();
	});
	effects.value = [];
	MainAudioCluster.value.modules = [];
}

onMounted(() => {
	merger.value.connect(mainContext.value.destination);
});
</script>

<style scoped lang="scss">
.components {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 4fr 3fr;
	grid-template-rows: minmax(80%, 10fr) minmax(10%, 1fr);
	gap: 0.5rem;

	&__controls {
		grid-column: 1/-1;
		background-color: transparent;
		position: relative;
		bottom: 0;
		height: fit-content;
		padding: 1rem;
		gap: 1rem;
	}

	@include respond(tab-port) {
		display: grid;
	}

	@include respond(phone) {
		// display:;
	}
}

.testContainer {
	background-color: red;
	height: 20px;
	width: 100px;
}
</style>
