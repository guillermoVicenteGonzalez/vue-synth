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
		</div>

		<div class="ModuleCard__left-slot">
			<VsSelector
				v-model="audioModule.wave.form"
				:disabled="disabled"
				:items="Object.keys(waveForms)"
				@change="onWaveChangeCB"
			></VsSelector>
			<div class="ModuleCard__sliders">
				<VsSlider
					v-model="audioModule.wave.amplitude"
					:disabled="disabled"
					:label="audioModule.wave.amplitude"
					:max="50"
					:min="0"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>
				<VsSlider
					v-model="audioModule.wave.frequency"
					:disabled="disabled"
					label="freq"
					:max="1000"
					orientation="vertical"
					@change="onWaveChangeCB"
				></VsSlider>
			</div>
		</div>

		<div class="ModuleCard__center-slot">
			<input v-model="audioModule.name" type="text" :disabled="disabled" />
			<WaveCanvas
				:wave="audioModule.wave"
				:paused="disabled"
				:canvas-width="zoom"
			></WaveCanvas>
			<VsSlider
				v-model="zoom"
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
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import AudioModule from "@/models/AudioModule";
import { waveForms } from "@/models/wave";
import { computed, ref, watch } from "vue";

const audioModule = defineModel<AudioModule>();
const disabled = ref<boolean>(false);
const zoom = ref<number>(300);

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
	audioModule.value?.updateOscillator();
	return;
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

	&__handle {
		background-color: $handle-bg-color;
		height: 100%;
		display: flex;
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

		max-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__center-slot {
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
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
