<template>
	<VsCard max-height="15rem" max-width="50rem">
		<div class="ModuleCard">
			<div class="ModuleCard__handle"></div>
			<div class="ModuleCard__left-slot">
				<VsSelector
					v-model="wave.form"
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
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import Wave, { waveForms } from "@/models/wave";

interface ModuleCardWidgetProps {
	disabled?: boolean;
	wave?: Wave;
}

function onWaveChangeCB() {
	return;
}

const { wave = new Wave(2, 2, 2) } = defineProps<ModuleCardWidgetProps>();
</script>

<style lang="scss" scoped>
$left-slot-bg-color: black;

.ModuleCard {
	display: grid;
	grid-template-columns:
		[handle-start] minmax(20px, 0.5fr)
		[handle-end left-start] minmax(20px, 2fr)
		[left-end body-start] minmax(100px, 7fr)
		[body-end right-start] minmax(20px, 1fr);
	width: 100%;
	min-height: 100%;

	&__handle {
		background-color: $left-slot-bg-color;
		height: 100%;
	}
}
</style>
