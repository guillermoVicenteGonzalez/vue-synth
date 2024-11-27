<template>
	<VsCard max-height="15rem" max-width="50rem" min-height="12rem">
		<div v-if="audioModule" class="ModuleCard">
			<div class="ModuleCard__handle">
				<ToggleButton></ToggleButton>
			</div>
			<div class="ModuleCard__left-slot">
				<VsSelector
					v-model="audioModule.wave.form"
					:items="Object.keys(waveForms)"
					@change="onWaveChangeCB"
				></VsSelector>
			</div>
			<div class="ModuleCard__center-slot"></div>
			<div class="ModuleCard__right-slot"></div>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import AudioModule from "@/models/AudioModule";
import { waveForms } from "@/models/wave";

const audioModule = defineModel<AudioModule>();

function onWaveChangeCB() {
	//wave module update oscillator?
	return;
}
</script>

<style lang="scss" scoped>
$left-slot-bg-color: black;

.ModuleCard {
	background-color: $primary-color;

	display: grid;
	grid-template-columns:
		[handle-start] minmax(30px, 0.5fr)
		[handle-end left-start] minmax(20px, 2fr)
		[left-end body-start] minmax(100px, 7fr)
		[body-end right-start] minmax(20px, 1fr);
	width: 100%;
	min-height: 100%;
	height: 100%;

	&__handle {
		background-color: $left-slot-bg-color;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: 0.5rem 0 0.5rem 0;
	}
}
</style>
