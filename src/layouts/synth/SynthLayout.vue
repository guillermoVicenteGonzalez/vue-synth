<template>
	<div class="synth-layout">
		<div class="synth-layout__header">
			<slot name="header"> </slot>
		</div>

		<div class="synth-layout__components">
			<slot name="components"></slot>
		</div>

		<div class="synth-layout__display">
			<slot name="display"></slot>
		</div>

		<div class="synth-layout__piano">
			<slot name="piano"></slot>
		</div>

		<div class="synth-layout__footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

.synth-layout {
	width: 100vw;
	height: 100vh;

	max-width: 100vw;
	max-height: 100vh;

	overflow: hidden;

	display: grid;
	grid-template-columns: [cards-start] minmax(30rem, 2fr) [cards-end visualization-start] minmax(
			40rem,
			3fr
		);

	grid-template-rows:
		[header-start] minmax(2rem, 0.5fr) [header-end body-start] minmax(7rem, 7fr)
		[body-end piano-start] minmax(2rem, 2fr) [piano-end footer-start] minmax(0.5rem, 0.5fr);

	&__header {
		background-color: $header-color;
		color: $header-text-color;
		grid-column: 1 / -1;
		grid-row: header-start / header-end;
	}

	&__components {
		grid-row: body-start / body-end;
		grid-column: cards-start / cards-end;
		background-color: $components-bg-color;
		overflow: hidden;
	}

	&__display {
		grid-row: body-start / body-end;
		grid-column: visualization-start / visualization-end;
		background-color: $display-bg-color;
		overflow: hidden;
		resize: both;
	}

	&__piano {
		grid-row: piano-start / piano-end;
		grid-column: 1 / -1;
	}

	&__footer {
		grid-row: footer-start / footer-end;
		grid-column: 1/ -1;
		// height: $footer-h;
		background-color: $footer-bg-color;
	}
}
</style>
