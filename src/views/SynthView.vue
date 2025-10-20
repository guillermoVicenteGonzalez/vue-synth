<template>
	<component :is="currentLayout">
		<template #header>
			<HeaderWidgetWidget>
				<template #controls>
					<HeaderControlsWidget></HeaderControlsWidget>
				</template>
				<template #visualizer>
					<WaveAnalyser
						class="main-analyser"
						:line-color="primaryColor"
						:source="merger"
						:canvas-width="3080"
						:canvas-height="200"
						:brush-size="7"
					></WaveAnalyser>
				</template>
			</HeaderWidgetWidget>
		</template>
		<template #waves>
			<ModuleCardListWidget
				v-model="MainAudioCluster as AudioCluster"
			></ModuleCardListWidget>
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
			<!-- <VsButton @click="createNewModule">New Wave</VsButton>
			<VsButton @click="createEffect('filter')">New filter</VsButton>
			<VsButton @click="deleteAll()">Delete all</VsButton>
			<RecordBtn></RecordBtn>
			<VsSlider label="octave"></VsSlider>
			<VsSlider label="volume"></VsSlider> -->
			<ActionsWidget
				@createWave="createNewModule"
				@createFilter="createEffect('filter')"
				@deleteAll="deleteAll"
			></ActionsWidget>
		</template>
		<template #envelope>
			<EnvelopeControlWidget v-model="envelope" />
		</template>
		<template #lfo>
			<LfoWidgetListWidget
				:widget-variant="LFOlWidgetVariant"
				:variant="lfoListVariant"
				:context="mainContext"
				:sources="lfoSources"
			></LfoWidgetListWidget>
		</template>
		<template #piano>
			<KeyboardWidget
				:envelope="envelope"
				:context="mainContext"
				:source-cluster="MainAudioCluster as AudioCluster"
			></KeyboardWidget>
		</template>

		<template #footer>
			<VSFooter></VSFooter>
		</template>
	</component>
</template>

<script setup lang="ts">
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import { useMonitorSize } from "@/composables/useMonitorSize";
import MobileSynthLayout from "@/layouts/synth/MobileSynthLayout.vue";
import PortraitSynthLayout from "@/layouts/synth/PortraitSynthLayout.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import AudioModule, { type AudioEffect } from "@/models/AudioModule";
import ActionsWidget from "@/widgets/ActionsWidget/ActionsWidget.vue";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import EnvelopeControlWidget from "@/widgets/EnvelopeControl/EnvelopeControlWidget.vue";
import VSFooter from "@/widgets/Footer/VSFooter.vue";
import HeaderControlsWidget from "@/widgets/HeaderControls/HeaderControlsWidget.vue";
import HeaderWidgetWidget from "@/widgets/HeaderWidget/HeaderWidgetWidget.vue";
import KeyboardWidget from "@/widgets/Keyboard/KeyboardWidget.vue";
import {
	type LfoSource,
	type LFOWidgetVariants,
} from "@/widgets/LfoWdidget/LfoWdidgetWidget.vue";
import LfoWidgetListWidget from "@/widgets/LfoWidgetList/LfoWidgetListWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { computed, onMounted, ref, type Ref, type UnwrapRef } from "vue";

const { browserHeight, browserWidth } = useMonitorSize();
const primaryColor = "#42d392";

const currentLayout = computed(() => {
	if (browserWidth.value <= 600) return MobileSynthLayout;

	if (browserWidth.value <= 1380 && browserHeight.value > 600) {
		return MobileSynthLayout;
	}

	if (browserHeight.value < 600) {
		return PortraitSynthLayout;
	}

	return SynthLayout;
});

const LFOlWidgetVariant = computed<LFOWidgetVariants>(() =>
	currentLayout.value == PortraitSynthLayout ? "minimal" : "default"
);

const lfoListVariant = computed(() => {
	return browserWidth.value < 800 ? "horizontal" : "vertical";
});

const MAX_EFFECTS = 5;

// const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger(1));
const MainAudioCluster: Ref<UnwrapRef<AudioCluster>> = ref<AudioCluster>(
	new AudioCluster(mainContext.value, merger.value)
);
const envelope = ref<AudioEnvelope>({
	attack: 0.2,
	decay: 0.4,
	sustain: 0.5,
	release: 0.2,
});

const effects = ref<AudioEffect[]>([]);

// const lfoSources = computed<AudioModule[]>(() => new AudioCluster(mainContext.value, merger.value).modules);
const lfoSources = computed<LfoSource[]>(() => {
	const modules: AudioModule[] = MainAudioCluster.value
		.modules as AudioModule[];
	const effs: AudioNode[] = effects.value;
	const sources: LfoSource[] = [];
	return sources
		.concat(...effs, ...modules)
		.concat(MainAudioCluster.value as AudioCluster);
});

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

.main-analyser {
	background-color: $bg-color-1;
}
</style>
