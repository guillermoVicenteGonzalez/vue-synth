<template>
	<VsCard
		v-if="audioModule"
		max-height="20rem"
		max-width="50rem"
		min-height="12rem"
		height="15rem"
		:child-class="ModuleCardStyles"
	>
		<div class="ModuleCard__handle">
			<ToggleButton v-model="disabled"></ToggleButton>
		</div>

		<div class="ModuleCard__left-slot">
			<div class="ModuleCard__sliders">
				<VerticalSlider
					v-model="audioModule.wave.amplitude"
					:range="50"
					@change="onWaveChangeCB"
				></VerticalSlider>
				<VerticalSlider
					v-model="audioModule.wave.frequency"
					:range="1000"
					@change="onWaveChangeCB"
				></VerticalSlider>
			</div>
		</div>

		<div class="ModuleCard__center-slot">{{ audioModule.wave.amplitude }}</div>

		<div class="ModuleCard__right-slot"></div>
	</VsCard>
</template>

<script setup lang="ts">
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VerticalSlider from "@/components/common/VerticalSlider/VerticalSlider.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import AudioModule from "@/models/AudioModule";
import { computed, ref, watch } from "vue";

const audioModule = defineModel<AudioModule>();
const disabled = ref<boolean>(false);

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
	//wave module update oscillator?
	audioModule.value?.updateOscillator();
	return;
}
</script>

<style lang="scss" scoped>
$handle-bg-color: black;
$handle-padding: 1rem;

.ModuleCard {
	background-color: $primary-color;

	display: grid;
	grid-template-columns:
		[handle-start] minmax(30px, 0.5fr)
		[handle-end left-start] minmax(20px, 2fr)
		[left-end body-start] minmax(100px, 7fr)
		[body-end right-start] minmax(20px, 1fr);
	// width: 100%;
	// min-height: 100%;
	// height: 100px;
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
		// display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__sliders {
		width: 80%;
		flex: 1;
		background-color: yellow;
		height: 100%;
		max-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__center-slot {
		height: 100%;
		background-color: purple;
		justify-content: center;
		align-items: center;
	}

	&--disabled {
		position: relative;

		&::after {
			content: "";
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: rgba(red, 0.1);
			backdrop-filter: blur(1px);
		}
	}
}
</style>
