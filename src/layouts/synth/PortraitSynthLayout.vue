<template>
	<div class="synth-layout">
		<div class="synth-layout__components">
			<slot name="components"></slot>
		</div>

		<div class="synth-layout__display">
			<slot name="display"></slot>
		</div>

		<div class="synth-layout__piano">
			<slot name="piano"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-display-h: 3rem;
$max-display-h: 35%;

.synth-layout {
	width: 100vw;
	height: 100vh;

	max-width: 100vw;
	max-height: 100vh;

	overflow: hidden;

	display: flex;
	flex-direction: column;

	&__components {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		flex-basis: 5rem;
		min-height: 40%;
		max-height: 50%;
	}

	&__display {
		padding: 0.2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		grid-template-rows: minmax($min-display-h, 100%);
		max-height: $max-display-h;
	}

	&__piano {
		height: 100%;
		display: block;
	}
}
</style>
