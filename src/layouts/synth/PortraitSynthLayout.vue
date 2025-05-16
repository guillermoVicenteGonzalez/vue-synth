<template>
	<div class="synth-layout">
		<div class="synth-layout__components">
			<slot name="components"></slot>
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
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		// min-height: 40%;
		// max-height: 50%;
		min-height: 40%;
		height: 100%;
	}

	&__display {
		height: fit-content;
		max-height: 30%;
	}

	&__piano {
		height: fit-content;
		max-height: 20%;
		flex-basis: minmax(0, $piano-max-h);
		background-color: green;
	}
}
</style>
