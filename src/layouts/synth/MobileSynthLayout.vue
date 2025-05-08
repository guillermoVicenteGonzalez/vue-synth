<template>
	<div class="synth-layout">
		<div class="synth-layout__header">
			<slot name="header"> </slot>
		</div>
		<VsTabs></VsTabs>
		<div class="synth-layout__components">
			<slot name="components"></slot>
		</div>

		<div class="synth-layout__display">
			<!-- <slot name="display"></slot> -->
		</div>

		<div class="synth-layout__piano">
			<slot name="piano"></slot>
		</div>

		<div class="synth-layout__footer">
			<!-- <slot name="footer"></slot> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import VsTabs from "@/components/common/VsTabs/VsTabs.vue";
</script>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-components-w: 70rem;
$max-components-w: 4fr;

$min-display-w: 40rem;
$max-display-w: 5fr;

$min-header-h: 2rem;
$max-header-h: 0.5fr;

$min-body-h: 7rem;
$max-body-h: 7fr;

$min-piano-h: 2rem;
$max-piano-h: 2fr;

$min-footer-h: 0.5rem;
$max-footer-h: 0.5fr;

.synth-layout {
	width: 100vw;
	height: 100vh;

	max-width: 100vw;
	max-height: 100vh;

	overflow: hidden;
	display: flex;
	flex-direction: column;

	&__header {
		background-color: $header-color;
		color: $header-text-color;
		height: 3rem;
		flex-basis: 3rem;
		width: 100%;
	}

	&__components {
		background-color: purple;
		width: 100%;
		height: 50%;

		height: 100%;
		width: 100%;
		grid-template-rows: minmax(80%, 10fr) minmax(10%, 1fr);
		gap: 0.5rem;
	}
}
</style>
