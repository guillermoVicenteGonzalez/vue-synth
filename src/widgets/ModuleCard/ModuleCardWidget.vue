<template>
	<VsCard
		v-if="audioModule"
		max-height="20rem"
		max-width="50rem"
		min-height="17rem"
		:class="ModuleCardStyles"
	>
		<div class="ModuleCard__handle">
			<ToggleButton v-model="disabled"></ToggleButton>
			<VsButton variant="round" class="delete-btn" @click="deleteModule"
				>X</VsButton
			>
		</div>

		<div class="ModuleCard__left-slot">
			<VsSelector
				v-model="audioModule.wave.form"
				:disabled="disabled"
				:items="Object.keys(waveForms)"
				@change="onWaveChangeCB"
			></VsSelector>
			<div class="ModuleCard__sliders">
				<!-- <VsSlider
					v-model="audioModule.wave.amplitude"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="amp"
					:max="50"
					step="0.01"
					:min="0.01"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider> -->

				<CircleSlider
					v-model="audioModule.wave.amplitude"
					:default-value="10"
					:disabled="disabled"
					:min="0.01"
					:max="50"
					@change="onWaveChangeCB"
				></CircleSlider>
				<!--
				<VsSlider
					v-model="audioModule.wave.frequency"
					class="ModuleCard__slider"
					:disabled="disabled"
					label="freq"
					:max="1000"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider> -->

				<CircleSlider
					v-model="audioModule.wave.frequency"
					:default-value="440"
					:disabled="disabled"
					:min="0.01"
					:max="1000"
					@change="onWaveChangeCB"
				></CircleSlider>
			</div>
		</div>

		<div class="ModuleCard__center-slot">
			<input
				v-model="audioModule.name"
				class="ModuleCard__center-slot__name-input"
				type="text"
				:disabled="disabled"
			/>
			<WaveCanvas
				class="ModuleCard__center-slot__wave-canvas"
				:wave="audioModule.wave"
				:paused="disabled"
				:canvas-width="zoom"
			></WaveCanvas>
			<VsSlider
				v-model="zoom"
				class="ModuleCard__center-slot__zoom-slider"
				:min="400"
				:max="10000"
				:label="zoom"
				:disabled="disabled"
			></VsSlider>
		</div>

		<div class="ModuleCard__right-slot"></div>
	</VsCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import AudioModule from "@/models/AudioModule";
import { waveForms } from "@/models/wave";
import { computed, ref, watch } from "vue";

const audioModule = defineModel<AudioModule>();
const disabled = ref<boolean>(false);
const zoom = ref<number>(10000);

const emit = defineEmits<{
	(e: "delete", module: AudioModule | undefined): void;
}>();

const ModuleCardStyles = computed(() => {
	return `ModuleCard ${disabled.value ? "ModuleCard--disabled" : null}`;
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
	display: grid;
	grid-template-columns:
		[handle-start] minmax(30px, 0.5fr)
		[handle-end left-start] minmax(20px, 2fr)
		[left-end body-start] minmax(100px, 6fr)
		[body-end right-start] minmax(20px, 1fr);
	grid-template-rows: minmax(10px, 1fr);
	// background-color: global.$primary-color;

	&__handle {
		width: 100%;
		height: 100%;
		background-color: black;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: $handle-padding 0 $handle-padding 0;
		z-index: 2;
	}

	&__left-slot {
		display: grid;
		grid-template-rows: minmax(10%, 1fr) minmax(50%, 8fr);
		height: 100%;
	}

	&__sliders {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-height: 100%;
		// display: flex;
		// justify-content: center;
		// align-items: center;
	}

	&__center-slot {
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;

		&__wave-canvas {
			// max-height: 60%;
			flex-grow: 0;
			flex-shrink: 1;
			max-height: 100%;
			aspect-ratio: 3;
		}

		&__zoom-slider {
			flex-shrink: 0;
			flex-basis: 10%;
		}

		&__name-input {
			flex-shrink: 0;
			flex-basis: 10%;
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
</style>
