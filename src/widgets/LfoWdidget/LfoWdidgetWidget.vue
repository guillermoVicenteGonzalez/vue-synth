<template>
	<VsCard v-if="context" class="lfo-widget-card" :class="dynamicClass">
		<div class="lfo-widget-card__handle">
			<ToggleButton v-model="disabled" :color="primaryColor"></ToggleButton>
		</div>
		<div class="lfo-widget" :class="dynamicClass">
			<div class="lfo-widget__selectors">
				<h3>Waveform:</h3>
				<VsSelector
					v-model="lfo.waveform"
					:items="Object.keys(waveForms)"
					:disabled="disabled"
				/>
				<h3>Module:</h3>
				<VsSelector
					v-model="selectedModuleName"
					:items="sourceNames"
					:disabled="disabled"
				/>
				<h3>Parameter:</h3>
				<VsSelector
					v-model="modulableParameterName"
					:items="connectionOptions"
					:disabled="disabled"
					@change="connectLFO"
				/>

				<VsButton variant="round" class="delete-btn" @click="handleClear"
					>X</VsButton
				>
			</div>

			<div class="lfo-widget__display">
				<!-- <WaveCanvas :canvas-height="100" :canvas-width="100"></WaveCanvas> -->
				<WaveCanvas
					:line-color="primaryColor"
					class="lfo-widget__canvas"
					:canvas-width="canvasDynamicDimensions.width"
					:canvas-height="canvasDynamicDimensions.height"
					:wave="lfo.wave"
					:paused="disabled"
				></WaveCanvas>
			</div>
			<!-- <WaveCanvas :wave="lfo.wave"></WaveCanvas> -->
			<div class="lfo-widget__controls">
				<CircleSlider
					v-model="lfo.frequency"
					:fill-color="primaryColor"
					:disabled="disabled"
				></CircleSlider>
				<VsChip class="lfo-widget__chip">Frequency</VsChip>
				<CircleSlider
					v-model="lfo.amplitude"
					:fill-color="primaryColor"
					:default-value="100"
					:max="minMaxLFOStrengh.max"
					:min="minMaxLFOStrengh.min"
					:step="minMaxLFOStrengh.step"
					:disabled="disabled"
				></CircleSlider>
				<VsChip class="lfo-widget__chip">Amplitude</VsChip>
			</div>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import AudioCluster from "@/models/AudioCluster";
import AudioModule from "@/models/AudioModule";
import { LFO } from "@/models/LFO";
import { waveForms } from "@/models/wave";
import { computed, ref, watch } from "vue";

export type LfoSource = AudioModule | AudioNode | AudioCluster;

interface LfoWdidgetWidgetProps {
	context: AudioContext;
	sources: LfoSource[];
}

const primaryColor = "#42d392";

const { context, sources } = defineProps<LfoWdidgetWidgetProps>();
const disabled = ref<boolean>(false);
const lfo = ref<LFO>(new LFO(context));
const dynamicClass = computed(() => {
	return disabled.value ? `lfo-widget-card--disabled` : "";
});

const sourceNames = computed<string[]>(() =>
	sources.map((s, index) => {
		if (s instanceof AudioModule) return s.name;
		else if (s instanceof BiquadFilterNode) return `filter ${index}`;
		else if (s instanceof AudioCluster) return `global`;
		else return `unknown ${index}`;
	})
);

const selectedModuleName = ref<string>();
const selectedModule = computed<LfoSource | null>(() => {
	if (!selectedModuleName.value) return null;
	const index = sourceNames.value.indexOf(selectedModuleName.value);
	return sources[index];
});

const connectionOptions = computed(() => {
	if (!selectedModule.value) return [];
	if (selectedModule.value instanceof AudioModule)
		return ["frequency", "amplitude"];
	else if (selectedModule.value instanceof BiquadFilterNode)
		return ["cuttof frequency"];
	else if (selectedModule.value instanceof AudioCluster) return ["global gain"];

	return [];
});

const modulableParameterName = ref<string>();

/**
 * Handles the disconnection from the previous module and the connection of the new one attending to the type of node it is
 */
function connectLFO() {
	lfo.value.disconnect();

	if (!modulableParameterName.value || !selectedModule.value) return;

	if (selectedModule.value instanceof AudioModule) {
		lfo.value.connect(selectedModule.value.gainNode.gain);
		return;
	}

	if (selectedModule.value instanceof BiquadFilterNode) {
		const filter: BiquadFilterNode = selectedModule.value;
		lfo.value.connect(filter.frequency);
		return;
	}

	if (selectedModule.value instanceof AudioCluster) {
		const cluster: AudioCluster = selectedModule.value;
		lfo.value.connect(cluster.gain.gain);
		// lfo.value.connect(merger.);
		return;
	}
}

/**
 * minimum and maximum strength of the lfo depending on the type of module attached
 * The modulated parameter should also be taken into account
 */
const minMaxLFOStrengh = computed(() => {
	if (selectedModule.value instanceof AudioCluster) {
		return {
			min: -1,
			max: 1,
			step: 2,
		};
	}

	if (selectedModule.value instanceof BiquadFilterNode) {
		return {
			min: 0,
			max: 1000,
			step: 0,
		};
	}

	if (selectedModule.value instanceof AudioModule) {
		return {
			min: 0,
			max: 100,
			step: 0,
		};
	}

	return {
		min: 0,
		max: 100,
		step: 0,
	};
});

const canvasDynamicDimensions = computed(() => {
	if (minMaxLFOStrengh.value.max <= 1) {
		return {
			width: 500,
			height: 70,
		};
	}

	return {
		width: 2000,
		height: 400,
	};
});

function handleClear() {
	lfo.value.disconnect();
	selectedModuleName.value = "";
	modulableParameterName.value = "";
}

function handleDisable() {
	lfo.value.disabled = disabled.value;
}

watch(disabled, handleDisable);

//If the module we are tracking is null => we should reset.
watch(selectedModule, () => {
	if (selectedModule.value == null) handleClear();
});
</script>

<style lang="scss" scoped>
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: gray;

.lfo-widget-card {
	width: 100%;
	height: 100%;
	display: flex;
	background-color: $bg-color-2;
	color: $text-color;

	&__handle {
		flex: 0 0 3rem;
		background-color: $handle-bg-color;
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: $handle-padding 0 $handle-padding 0;
		z-index: 2;
	}

	&--disabled {
		position: relative;

		&::after {
			content: "";
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: rgba($disabled-color, 0.1);
			backdrop-filter: blur(1px);
		}
	}
}

.lfo-widget {
	padding: 1rem;

	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	&__selectors {
		height: 3rem;
		flex: 1 1 100%;

		display: flex;
		gap: 1rem;
		align-items: center;
	}

	&__display {
		// height: max-content;
		flex: 1 1 70%;
		// max-width: 80%;
	}

	&__controls {
		// height: max-content;
		min-width: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	&__canvas {
		flex-grow: 0;
		flex-shrink: 1;
		max-height: 100%;
		aspect-ratio: 3;
		background-color: $bg-color-1;
		border-radius: $border-radius-df;
	}

	&__chip {
		width: 100%;
		font-size: 1.6rem;
	}

	&--disabled {
	}

	// grid-template-rows: 1fr 2fr 1fr;
}
</style>
