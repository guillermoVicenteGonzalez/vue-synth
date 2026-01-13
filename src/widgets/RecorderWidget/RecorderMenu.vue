<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item">
			<VsTooltip>
				<VsToggleButton class="RecorderMenu__button">Recordable</VsToggleButton>
			</VsTooltip>
		</li>
		<li class="RecorderMenu__item">
			<VsSwitchButton></VsSwitchButton>
		</li>

		<li class="RecorderMenu__item">Download track</li>
		<VsSeparator></VsSeparator>
		<li class="RecorderMenu__item">clear all</li>
		<li class="RecorderMenu__item">play all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsToggleButton from "@/components/common/VsToggleButton/VsToggleButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
</script>

<style lang="scss" scoped>
$recorder-menu-min-width: 15rem;
$recorder-menu-max-height: 15rem;
$button-height: 3rem;

.RecorderMenu {
	list-style: none;
	min-width: $recorder-menu-min-width;
	width: fit-content;
	max-height: $recorder-menu-max-height;
	overflow: auto;

	display: flex;
	flex-direction: column;

	gap: $gap-df;

	&__item {
		font-size: 1.6rem;
		color: $text-color;
		width: 100%;
		height: $button-height;
	}

	&__button {
		width: 100%;
		height: 100%;
		padding: 0 2rem;
	}
}
</style>
