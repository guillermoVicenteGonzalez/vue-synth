<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item">
			<VsToggleButton></VsToggleButton>
		</li>
		<li class="RecorderMenu__item">clear</li>
		<li class="RecorderMenu__item">Restart</li>
		<li class="RecorderMenu__item">Recordable</li>
		<li class="RecorderMenu__item">Download track</li>
		<VsSeparator></VsSeparator>
		<li class="RecorderMenu__item">clear all</li>
		<li class="RecorderMenu__item">play all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsToggleButton from "@/components/common/VsToggleButton/VsToggleButton.vue";
</script>

<style lang="scss" scoped>
$recorder-menu-min-width: 15rem;
$recorder-menu-max-height: 15rem;

.RecorderMenu {
	list-style: none;
	min-width: $recorder-menu-min-width;
	width: fit-content;
	max-height: $recorder-menu-max-height;
	overflow: auto;

	&__item {
		font-size: 1.6rem;
		color: $text-color;
	}
}
</style>
