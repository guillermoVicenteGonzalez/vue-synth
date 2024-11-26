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

$min-components-w: 30rem;
$max-components-w: 2fr;

$min-display-w: 40rem;
$max-display-w: 3fr;

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

	display: grid;
	grid-template-columns:
		[cards-start] minmax($min-components-w, $max-components-w)
		[cards-end visualization-start] minmax($min-display-w, $max-display-w);

	grid-template-rows:
		[header-start] minmax($min-header-h, $max-header-h)
		[header-end body-start] minmax($min-body-h, $max-body-h)
		[body-end piano-start] minmax($min-piano-h, $max-piano-h)
		[piano-end footer-start] minmax($min-footer-h, $max-footer-h);

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
