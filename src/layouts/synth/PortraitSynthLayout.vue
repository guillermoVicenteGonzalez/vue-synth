<template>
	<div class="synth-layout">
		<div class="synth-layout__components">
			<slot name="waves"></slot>
			<slot name="filters"></slot>
			<div class="synth-layout__components__actions">
				<slot name="actions"></slot>
			</div>
		</div>

		<div class="synth-layout__display">
			<slot name="envelope"></slot>
			<slot name="analyser"></slot>
			<!-- <FoldContainer>
				<template #button-content>Show display</template>
				<template #content>
					<slot name="display"></slot>
				</template>
			</FoldContainer> -->
		</div>

		<div class="synth-layout__piano">
			<FoldContainer>
				<template #button-content>Show piano</template>
				<template #content>
					<slot name="piano"></slot>
				</template>
			</FoldContainer>
		</div>
	</div>
</template>
<script setup lang="ts">
import FoldContainer from "@/components/common/FoldContainer/FoldContainer.vue";
</script>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-display-h: 3rem;
$max-display-h: 35%;

$piano-max-h: 10rem;
$piano-min-h: 0;

.synth-layout {
	width: 100vw;
	height: 100vh;

	max-width: 100vw;
	max-height: 100vh;

	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&__components {
		min-height: 20rem;
		max-height: 50%;
		height: 100%;
		background-color: red;

		display: grid;
		grid-template-columns: 4fr 3fr;
		grid-template-rows: minmax(75%, 10fr) minmax(3.5rem, 1fr);
		gap: 0.5rem;

		&__actions {
			grid-column: 1/-1;
			gap: 1rem;
		}
	}

	&__display {
		height: fit-content;
		min-height: 30%;
		max-height: 40%;
	}

	&__piano {
		height: fit-content;
		max-height: 20%;
		flex-basis: minmax(0, $piano-max-h);
		background-color: green;
	}
}
</style>
