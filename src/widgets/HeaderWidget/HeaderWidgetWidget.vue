<template>
	<header class="vsynth-header">
		<slot name="controls"></slot>
		<div class="vsynth-header__visualizer">
			<slot name="visualizer"></slot>
		</div>
	</header>
</template>

<script setup lang="ts">
// interface HeaderWidgetWidgetProps {}

// const {...} = defineProps<HeaderWidgetWidgetProps>();
</script>

<style lang="scss" scoped>
.vsynth-header {
	background-color: $tertiary-color;
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr;

	&__visualizer {
		width: 100%;
		min-height: 100%;
	}
}
</style>
