<template>
	<VsCard v-if="context" class="lfo-widget-card" :class="dynamicClass">
		<div class="lfo-widget-card__handle">
			<ToggleButton v-model="disabled" :color="primaryColor"></ToggleButton>
			<h3 class="lfo-widget-card__handle__title">LFO</h3>
		</div>
		<div class="lfo-widget" :class="dynamicClass">
			<div class="lfo-widget__selectors">
				<h3 class="lfo-widget__param-label">Waveform:</h3>
				<VsSelector
					v-model="lfoHandler.lfo.waveform"
					class="lfo-widget__selector"
					:items="Object.keys(waveForms)"
					:disabled="disabled"
				/>
				<h3 class="lfo-widget__param-label">Module:</h3>
				<VsSelector
					v-model="selectedModuleName"
					class="lfo-widget__selector"
					:items="sourceNames"
					:disabled="disabled"
				/>
				<h3 class="lfo-widget__param-label">Parameter:</h3>
				<VsSelector
					v-model="lfoHandler.propertyName"
					class="lfo-widget__selector"
					:items="connectionOptions"
					:disabled="disabled"
					@change="connectLFO"
				/>

				<VsButton variant="round" class="delete-btn" @click="handleClear">
					<VsTooltip
						class="delete-btn__tooltip"
						delay="2s"
						orientation="right"
						text="clear selection"
					>
						<X class="delete-btn__icon"></X> </VsTooltip
				></VsButton>
			</div>

			<div class="lfo-widget__display">
				<!-- <WaveCanvas :canvas-height="100" :canvas-width="100"></WaveCanvas> -->
				<WaveCanvas
					:line-color="primaryColor"
					class="lfo-widget__canvas"
					:canvas-width="canvasDynamicDimensions.width"
					:canvas-height="canvasDynamicDimensions.height"
					:wave="dynamicWave"
					:paused="disabled"
					:line-width="7"
				></WaveCanvas>
			</div>
			<!-- <WaveCanvas :wave="lfo.wave"></WaveCanvas> -->
			<div class="lfo-widget__controls">
				<CircleSlider
					v-model="lfoHandler.lfo.frequency"
					:size="CircleSliderSize"
					:fill-color="primaryColor"
					:disabled="disabled"
					:step="0.1"
				></CircleSlider>
				<VsChip class="lfo-widget__chip">Frequency</VsChip>
				<CircleSlider
					v-model="lfoHandler.lfo.amplitude"
					:size="CircleSliderSize"
					:fill-color="primaryColor"
					:default-value="100"
					:max="minMaxLFOStrength.max"
					:min="minMaxLFOStrength.min"
					:step="minMaxLFOStrength.step"
					:disabled="disabled"
				></CircleSlider>
				<VsChip class="lfo-widget__chip">Amplitude</VsChip>
			</div>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import ToggleButton from "@/components/common/VsRadioButton/VsRadioButton.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import { useMonitorSize } from "@/composables/useMonitorSize";
import AudioCluster from "@/models/AudioCluster";
import AudioModule from "@/models/AudioModule";
import type LFOHandler from "@/models/LFOHandler";
import { type LfoSource } from "@/models/LFOHandler";
import Wave, { waveForms } from "@/models/wave";
import { X } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

export type LFOWidgetVariants = "default" | "minimal";

interface LfoWdidgetWidgetProps {
	context: AudioContext;
	sources: LfoSource[];
	variant?: LFOWidgetVariants;
}
const { browserWidth } = useMonitorSize();

const primaryColor = "#42d392";

const {
	context,
	sources,
	variant = "default",
} = defineProps<LfoWdidgetWidgetProps>();
const disabled = ref<boolean>(false);
// const lfo = ref<LFOHandler>({
// 	inputModule: null,
// 	propertyName: null,
// 	lfo: new LFO(context),
// });
const lfoHandler = defineModel<LFOHandler>({ required: true });

const dynamicClass = computed(() => ({
	"lfo-widget-card--disabled": disabled.value,
	[`lfo-widget--${variant}`]: variant,
}));

const CircleSliderSize = computed<number>(() => {
	if (browserWidth.value < 1000) {
		return 70;
	}

	return 80;
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
// const selectedModule = computed<LfoSource | null>(() => {
// 	if (!selectedModuleName.value) return null;
// 	const index = sourceNames.value.indexOf(selectedModuleName.value);
// 	return sources[index];
// });
watch(selectedModuleName, () => {
	if (!selectedModuleName.value) return null;
	const index = sourceNames.value.indexOf(selectedModuleName.value);
	lfoHandler.value.inputModule = sources[index];
});

const connectionOptions = computed(() => {
	if (!lfoHandler.value.inputModule) return [];
	if (lfoHandler.value.inputModule instanceof AudioModule)
		return ["frequency", "amplitude"];
	else if (lfoHandler.value.inputModule instanceof BiquadFilterNode)
		return ["cuttof frequency"];
	else if (lfoHandler.value.inputModule instanceof AudioCluster)
		return ["global gain"];

	return [];
});

// const modulableParameterName = ref<string>();

/**
 * Handles the disconnection from the previous module and the connection of the new one attending to the type of node it is
 */
function connectLFO() {
	lfoHandler.value.lfo.disconnectAll();

	if (!lfoHandler.value.propertyName || !lfoHandler.value.inputModule) return;

	if (lfoHandler.value.inputModule instanceof AudioModule) {
		lfoHandler.value.lfo.connect(lfoHandler.value.inputModule.gainNode.gain);
		return;
	}

	if (lfoHandler.value.inputModule instanceof BiquadFilterNode) {
		const filter: BiquadFilterNode = lfoHandler.value.inputModule;
		lfoHandler.value.lfo.connect(filter.frequency);
		return;
	}

	if (lfoHandler.value.inputModule instanceof AudioCluster) {
		const cluster: AudioCluster = lfoHandler.value.inputModule;
		lfoHandler.value.lfo.connect(cluster.gain.gain);
		// lfoHandler.value.connect(merger.);
		return;
	}
}

/**
 * minimum and maximum strength of the lfo depending on the type of module attached
 * The modulated parameter should also be taken into account
 */
const minMaxLFOStrength = computed(() => {
	if (lfoHandler.value.inputModule instanceof AudioCluster) {
		return {
			min: -1,
			max: 1,
			step: 0.01,
		};
	}

	if (lfoHandler.value.inputModule instanceof BiquadFilterNode) {
		return {
			min: 0,
			max: 1000,
			step: 1,
		};
	}

	if (lfoHandler.value.inputModule instanceof AudioModule) {
		return {
			min: 0,
			max: 100,
			step: 1,
		};
	}

	return {
		min: 0,
		max: 100,
		step: 0,
	};
});

const canvasDynamicDimensions = computed(() => {
	if (minMaxLFOStrength.value.max <= 1) {
		// return {
		// 	width: 500,
		// 	height: 70,
		// };

		return {
			width: 2000,
			height: 280,
		};
	}

	return {
		width: 2000,
		height: 400,
	};
});

const dynamicWave = computed<Wave>(() => {
	if (lfoHandler.value.inputModule instanceof BiquadFilterNode) {
		const w = new Wave(
			lfoHandler.value.lfo.wave.amplitude / 10,
			lfoHandler.value.lfo.wave.frequency
		);
		w.form = lfoHandler.value.lfo.wave.form;
		return w;
	}

	if (minMaxLFOStrength.value.max <= 1) {
		const w = new Wave(
			lfoHandler.value.lfo.wave.amplitude * 100,
			lfoHandler.value.lfo.wave.frequency
		);
		w.form = lfoHandler.value.lfo.wave.form;
		return w;
	}

	return lfoHandler.value.lfo.wave;
});

function handleClear() {
	lfoHandler.value.lfo.disconnectAll();
	selectedModuleName.value = "";
	lfoHandler.value.propertyName = null;
}

function handleDisable() {
	lfoHandler.value.lfo.disabled = disabled.value;
}

watch(disabled, handleDisable);

//If the module we are tracking is null => we should reset.
watch(
	() => lfoHandler.value.inputModule,
	() => {
		if (lfoHandler.value.inputModule == null) handleClear();
	}
);

//If the node we are tracking changes, the old one should be disconnected
watch(selectedModuleName, (nextVal, oldVal) => {
	if (nextVal != oldVal) {
		lfoHandler.value.lfo.disconnectAll();
	}
});
</script>

<style lang="scss" scoped>
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: gray;

$selectors-height: 3rem;
$display-height: 100%;
$controls-width: 10rem;

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

		&__title {
			display: block;

			top: 0%;

			writing-mode: vertical-rl;
			margin: auto;

			color: $text-color;
			font-size: 1.6rem;
			text-transform: uppercase;
		}
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

.delete-btn {
	&__icon {
		padding: 0.2rem;
		@include iconButton;
	}
}

.lfo-widget {
	width: 100%;
	height: 100%;

	padding: $gap-df;
	gap: $gap-df;

	display: grid;
	grid-template-columns: [display-start] 1fr [display-end controls-start] $controls-width;
	grid-template-rows: [selectors-start] $selectors-height [selectors-end display-start] 1fr;

	&__selectors {
		grid-row: selectors-start;
		grid-column: 1 / -1;
		height: 3rem;
		flex: 1 1 100%;

		display: flex;
		gap: 1rem;
		align-items: center;

		@include respond(tab-port) {
			height: auto;
			flex-wrap: wrap;
		}
	}

	&__param-label {
		@include respond(tab-port) {
			visibility: hidden;
			display: none;
		}
	}

	&__selector {
		@include respond(tab-port) {
			flex-basis: 2rem;
			min-width: auto;
		}
	}

	&__display {
		// height: max-content;
		flex: 1 1 70%;
		// max-width: 80%;
		@include respond(tab-port) {
			flex: 1 1 50%;
		}
	}

	&__controls {
		// height: max-content;
		min-width: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		flex: 1 1 10rem;

		@include respond(tab-port) {
			// flex: 1 1 40%;
		}
	}

	&__canvas {
		flex-grow: 0;
		flex-shrink: 1;
		max-height: 100%;
		// aspect-ratio: 3;
		background-color: $bg-color-1;
		border-radius: $border-radius-df;
	}

	&__chip {
		width: 100%;
		font-size: 1.6rem;
	}

	&--disabled {
	}

	&--minimal {
		.lfo-widget {
			&__param-label {
				display: none;
			}

			&__chip {
				display: none;
			}

			&__display {
				flex: 0 1 70%;
				max-height: 50%;
			}

			&__controls {
				flex-direction: row;
			}
		}
	}

	// grid-template-rows: 1fr 2fr 1fr;
}
</style>
