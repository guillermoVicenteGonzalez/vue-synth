<template>
	<VsCard v-if="context" class="lfo-widget-card" :class="dynamicClass">
		<div class="lfo-widget-card__handle">
			<ToggleButton v-model="disabled"></ToggleButton>
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
					:wave="lfo.wave"
					:canvas-width="1000"
					:paused="disabled"
				></WaveCanvas>
				<p>{{ selectedModule }}</p>
			</div>
			<!-- <WaveCanvas :wave="lfo.wave"></WaveCanvas> -->
			<div class="lfo-widget__controls">
				<CircleSlider
					v-model="lfo.frequency"
					:disabled="disabled"
				></CircleSlider>
				<CircleSlider
					v-model="lfo.amplitude"
					:default-value="100"
					:max="300"
					:min="0"
					:disabled="disabled"
				></CircleSlider>
			</div>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import AudioModule from "@/models/AudioModule";
import { LFO } from "@/models/LFO";
import { waveForms } from "@/models/wave";
import { computed, ref } from "vue";

export type LfoSource = AudioModule | AudioNode;

interface LfoWdidgetWidgetProps {
	context: AudioContext;
	sources: LfoSource[];
}

const { context, sources } = defineProps<LfoWdidgetWidgetProps>();
const disabled = ref<boolean>(false);
const lfo = ref<LFO>(new LFO(context));
const dynamicClass = computed(() => {
	return disabled.value ? `lfo-widget-card--disabled` : "";
});

const sourceNames = computed<string[]>(() =>
	sources.map((s, index) => {
		if (s instanceof AudioModule) return s.name;
		else if (s instanceof AudioNode) return `filter ${index}`;
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
	return [];
});

const modulableParameterName = ref<string>();

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
}

function handleClear() {
	lfo.value.disconnect();
	selectedModuleName.value = "";
	modulableParameterName.value = "";
}
</script>

<style lang="scss" scoped>
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: gray;

.lfo-widget-card {
	width: 100%;
	height: 100%;
	display: flex;

	&__handle {
		flex: 0 0 3rem;
		background-color: black;
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
		flex: 1 0 100%;

		display: flex;
		gap: 1rem;
		align-items: center;
	}

	&__display {
		height: auto;
		flex: 1 0 80%;
	}

	&__controls {
	}

	&--disabled {
	}

	// grid-template-rows: 1fr 2fr 1fr;
}
</style>
