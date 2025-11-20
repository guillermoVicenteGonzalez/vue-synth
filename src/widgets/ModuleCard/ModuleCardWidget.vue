<template>
	<VsCard
		v-if="audioModule"
		:max-height="MAX_CARD_HEIGHT"
		:min-height="MIN_CARD_HEIGHT"
		:class="ModuleCardStyles"
	>
		<div class="ModuleCard__handle">
			<ToggleButton v-model="disabled" :color="primaryColor"></ToggleButton>
			<VsButton
				variant="round"
				class="ModuleCard__delete-btn"
				@click="deleteModule"
			>
				<VsTooltip
					class="delete-btn__tooltip"
					delay="2s"
					orientation="right"
					text="delete wave"
				>
					<X class="delete-btn__icon"></X>
				</VsTooltip>
			</VsButton>
		</div>

		<div class="ModuleCard__body">
			<div class="ModuleCard__left-slot">
				<VsSlider
					v-model="audioModule.wave.amplitude"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="amp"
					:max="50"
					:step="0.01"
					:min="0.01"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>

				<VsTooltip text="Amplitude" orientation="right">
					<CircleSlider
						v-model="audioModule.wave.amplitude"
						:size="CircleSliderSize"
						class="ModuleCard__circle-slider"
						:default-value="10"
						:disabled="disabled"
						:fill-color="primaryColor"
						:min="0.01"
						:max="50"
						@change="onWaveChangeCB"
					></CircleSlider>
				</VsTooltip>

				<VsSlider
					v-model="audioModule.wave.frequency"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="freq"
					:max="1000"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>

				<VsTooltip text="frequency" orientation="right">
					<CircleSlider
						v-model="audioModule.wave.frequency"
						:size="CircleSliderSize"
						class="ModuleCard__circle-slider"
						:default-value="440"
						:fill-color="primaryColor"
						:disabled="disabled"
						:min="0.01"
						:max="1000"
						@change="onWaveChangeCB"
					></CircleSlider>
				</VsTooltip>
			</div>

			<div class="ModuleCard__center-slot">
				<div class="ModuleCard__inputs">
					<VsSelector
						v-model="audioModule.wave.form"
						class="ModuleCard__center-slot__selector"
						:disabled="disabled"
						:items="Object.keys(waveForms)"
						@change="onWaveChangeCB"
					></VsSelector>

					<VsTextInput
						v-model="audioModule.name"
						class="ModuleCard__center-slot__name-input"
						:disabled="disabled"
					></VsTextInput>
				</div>
				<WaveCanvas
					class="ModuleCard__center-slot__wave-canvas"
					:wave="audioModule.wave"
					:paused="disabled"
					:canvas-width="zoom"
					:canvas-height="canvasHeight"
					:line-color="primaryColor"
				></WaveCanvas>
				<VsSlider
					v-model="zoom"
					class="ModuleCard__center-slot__zoom-slider"
					:min="500"
					:max="1000"
					:label="zoom"
					:disabled="disabled"
				></VsSlider>
			</div>

			<div class="ModuleCard__right-slot">
				<VsSlider
					v-model="audioModule.voices"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="voices"
					:max="16"
					:step="1"
					:min="1"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>

				<VsTooltip text="voices" orientation="left">
					<CircleSlider
						v-model="audioModule.voices"
						:size="CircleSliderSize"
						class="ModuleCard__circle-slider"
						:default-value="10"
						:disabled="disabled"
						:min="1"
						:fill-color="primaryColor"
						:max="16"
						@change="onWaveChangeCB"
					></CircleSlider>
				</VsTooltip>

				<VsSlider
					v-model="audioModule.voicesDetune"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="detune"
					:max="100"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>

				<VsTooltip text="voices" orientation="left">
					<CircleSlider
						v-model="audioModule.voicesDetune"
						:size="CircleSliderSize"
						class="ModuleCard__circle-slider"
						:default-value="20"
						:disabled="disabled"
						:fill-color="primaryColor"
						:min="0.01"
						:max="100"
						@change="onWaveChangeCB"
					></CircleSlider>
				</VsTooltip>
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
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsTextInput from "@/components/common/VsTextInput/VsTextInput.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import { useMonitorSize } from "@/composables/useMonitorSize";
import AudioModule from "@/models/AudioModule";
import { waveForms } from "@/models/wave";
import { X } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

// const MAX_CARD_HEIGHT = "20rem";
const MAX_CARD_HEIGHT = "17rem";
const MIN_CARD_HEIGHT = "17rem";

const primaryColor = "#42d392";
const audioModule = defineModel<AudioModule>();
const disabled = ref<boolean>(false);
const zoom = ref<number>(10000);

const canvasHeight = computed(() => {
	if (audioModule.value?.wave.form === "sawtooth") {
		return 1000;
	}

	return 100;
});

const { browserWidth } = useMonitorSize();

const emit = defineEmits<{
	(e: "delete", module: AudioModule | undefined): void;
}>();

const ModuleCardStyles = computed(() => {
	return `ModuleCard ${disabled.value ? "ModuleCard--disabled" : null}`;
});

const CircleSliderSize = computed<number>(() => {
	if (browserWidth.value < 1000) {
		return 70;
	}

	return 80;
});

watch(disabled, () => {
	if (disabled.value) {
		audioModule.value?.unplugOscillator();
	} else {
		audioModule.value?.plugOscillator();
	}
});

function onWaveChangeCB() {
	audioModule.value?.updateModule();
	return;
}

function deleteModule() {
	emit("delete", audioModule.value);
}
</script>

<style lang="scss" scoped>
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: gray;

.ModuleCard {
	width: 100%;
	height: 100%;

	display: flex;
	background-color: $bg-color-2;
	color: $text-color;

	&__handle {
		flex: 0 0 3rem;

		width: 100%;
		height: 100%;
		background-color: $handle-bg-color;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: $handle-padding 0 $handle-padding 0;
		z-index: 2;
	}

	&__body {
		height: 100%;
		width: 100%;
		max-height: v-bind(MAX_CARD_HEIGHT);

		padding: $gap-df;
		display: grid;
		grid-template-columns:
			[handle-end left-start] minmax(2rem, 2fr)
			[left-end body-start] minmax(10rem, 6fr)
			[body-end right-start] minmax(8rem, 2fr);

		grid-template-rows: minmax(10px, 1fr);
	}

	.delete-btn {
		&__icon {
			padding: 0.2rem;
			@include iconButton;
		}
	}

	&__slider {
		display: none;
		@include respond(phone) {
			display: flex;
			flex-direction: column;
		}
		height: 90%;
	}

	&__circle-slider {
		display: block;
		@include respond(phone) {
			display: none;
		}
	}

	&__center-slot {
		height: 100%;
		max-height: v-bind(MAX_CARD_HEIGHT);

		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;

		&__wave-canvas {
			margin-top: $gap-df;
			margin-bottom: $gap-df;

			// max-height: 60%;
			flex-grow: 0;
			flex-shrink: 1;

			// aspect-ratio: 3;
			height: 100%;

			background-color: $bg-color-1;
			border-radius: 0.5rem;

			@include respond(phone) {
				max-height: 40%;
			}
		}

		&__zoom-slider {
			flex-shrink: 0;
			flex-basis: 10%;
		}

		&__name-input {
			// flex-shrink: 1;
			// flex-basis: 10%;
			// flex-grow: 0;
			flex-grow: 1;
			flex-basis: 70%;
			color: $text-color;
		}

		&__selector {
			flex-grow: 1;
			flex-basis: 100%;
		}
	}

	&__inputs {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: $gap-df;

		> * {
			width: 100%;
			flex-basis: 100%;
			flex-grow: 1;
		}
	}

	&__left-slot,
	&__right-slot {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;

		height: 100%;
		max-height: v-bind(MAX_CARD_HEIGHT);

		@include respond(phone) {
			flex-direction: row;
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

	@include respond(phone) {
	}
}
</style>
