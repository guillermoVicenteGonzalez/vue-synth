<template>
	<SynthLayout>
		<template #header>Header</template>
		<template #components>
			<div class="components">
				<ModuleCardListWidget
					v-model="VisualizationAudioCluster"
				></ModuleCardListWidget>
				<!-- Esto tiene que ser un widget -->
				<EffectListWidget
					v-model="effects"
					:context="mainContext"
					:sources="VisualizationAudioCluster"
				></EffectListWidget>
				<div class="components__controls">
					<VsButton @click="createNewModule">New Wave</VsButton>
					<VsButton @click="createEffect('filter')">New filter</VsButton>
				</div>
			</div>
		</template>
		<template #display>
			<div class="displays">
				<div class="displays__pure">
					<SumWavesDisplay :waves="waves"></SumWavesDisplay>
				</div>
				<div class="displays__analyser">
					<WaveAnalyser
						:source="merger"
						:canvas-width="1080"
						:canvas-height="200"
					></WaveAnalyser>
				</div>
			</div>
		</template>
		<template #piano>
			<KeyboardWidget
				:context="mainContext"
				:source-cluster="VisualizationAudioCluster"
			></KeyboardWidget>
		</template>
		<template #footer>
			Footer
			<RouterLink to="/home">asdas</RouterLink>
		</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import SumWavesDisplay from "@/components/waves/SumWavesDisplay/SumWavesDisplay.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioCluster from "@/models/AudioCluster";
import { type AudioEffect } from "@/models/AudioModule";
import Wave from "@/models/wave";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import KeyboardWidget from "@/widgets/Keyboard/KeyboardWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { computed, onMounted, ref } from "vue";

const MAX_EFFECTS = 5;

// const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger(1));
const VisualizationAudioCluster = ref<AudioCluster>(
	new AudioCluster(mainContext.value, merger.value)
);

const effects = ref<AudioEffect[]>([]);

const waves = computed((): Wave[] => {
	// return audioModules.value.map(module => module.wave);
	if (
		!VisualizationAudioCluster.value ||
		VisualizationAudioCluster.value.modules.length == 0
	)
		return [];
	return VisualizationAudioCluster.value.modules.map(module => module.wave);
});

function createNewModule() {
	const waveName = `wave ${VisualizationAudioCluster.value.modules.length}`;
	VisualizationAudioCluster.value.createModule(waveName, "sine");
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
		background-color: green;
		position: relative;
		bottom: 0;
		height: 10rem;
	}
}

.displays {
	height: 100%;
	resize: both;

	display: grid;
	grid-template-rows: [first-row start] minmax(200px, 3fr) [second-row end] minmax(
			200px,
			1fr
		);

	&__pure {
		grid-row: first-row / second-row;
	}

	&__analyser {
		grid-row: second-row / -1;
	}
}

.testContainer {
	background-color: red;
	height: 20px;
	width: 100px;
}
</style>
