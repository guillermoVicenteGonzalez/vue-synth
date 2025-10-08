<template>
	<div class="synth-layout">
		<div class="synth-layout__header">
			<slot name="header"> </slot>
		</div>

		<div class="synth-layout__components">
			<slot name="waves"></slot>
			<slot name="filters"></slot>
			<div class="synth-layout__components__actions">
				<slot name="actions"></slot>
			</div>
		</div>

		<div class="synth-layout__display">
			<slot name="envelope"></slot>
			<slot name="lfo"></slot>
		</div>

		<div class="synth-layout__piano">
			<slot name="piano"></slot>
		</div>

		<div class="synth-layout__footer">
			<!-- <slot name="footer"></slot> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
$global-bg-color: $bg-color-1;

$header-color: $primary-color;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-components-w: 75rem;
$max-components-w: 5fr;

$min-display-w: 40rem;
$max-display-w: 5fr;

$min-header-h: 4rem;
$max-header-h: 6rem;

$min-body-h: 7rem;
$max-body-h: 7fr;

$min-piano-h: 1.5rem;
$max-piano-h: 1.5fr;

$min-footer-h: 0.1rem;
$max-footer-h: 0.3fr;

$min-enveloppe-h: 20rem;
$max-enveloppe-h: 3fr;

$min-lfo-h: 20rem;
$max-lfo-h: 1fr;

.synth-layout {
	background-color: $global-bg-color;

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
		overflow: hidden;

		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: 4fr 3fr;
		grid-template-rows: minmax(75%, 10fr) minmax(3.5rem, 1fr);
		// gap: $gap-bg;
		// padding: $gap-bg;

		&__actions {
			grid-column: 1/-1;
			// // gap: 2rem;
		}
	}

	&__display {
		grid-row: body-start / body-end;
		grid-column: visualization-start / visualization-end;
		overflow: hidden;
		// resize: both;

		height: 100%;

		display: grid;
		grid-template-rows:
			[first-row start] minmax($min-enveloppe-h, $max-enveloppe-h)
			[second-row end] minmax($min-lfo-h $max-lfo-h);

		gap: $gap-bg;
		padding: $gap-bg;
	}

	&__piano {
		grid-row: piano-start / piano-end;
		grid-column: 1 / -1;
		background-color: rgb(48, 48, 48);
	}

	&__footer {
		grid-row: footer-start / footer-end;
		grid-column: 1/ -1;
		// height: $footer-h;
		background-color: $footer-bg-color;
		background-color: purple;
	}

	@media screen and (max-width: 1900px) {
		$min-components-w: 40rem;
	}

	@media screen and (max-width: 1600px) {
		$footer-bg-color: yellow;
	}

	@include respond(tab-land) {
		background-color: red !important	;
		$min-components-w: 30rem;
	}

	@include respond(tab-port) {
		$min-body-h: 10vh;
		grid-template-columns: 1fr 1fr;
		grid-template-rows:
			[header-start] minmax($min-header-h, $max-header-h)
			[header-end body-start] minmax($min-body-h, $max-body-h)
			[body-end visualization-start] minmax(50px, 150px)
			[visualization-end piano-start] minmax(50px, 100px);

		&__header {
			background-color: black;
			grid-column: 1/ -1;
			grid-row: header-start / header-end;
			width: 100%;
		}

		&__components {
			grid-row: body-start / body-end;
			background-color: purple;
			grid-column: 1 / -1;
			overflow: hidden;

			height: 100%;
			width: 100%;
			display: grid;
			grid-template-columns: 4fr 3fr;
			grid-template-rows: minmax(80%, 10fr) minmax(10%, 1fr);
			gap: 0.5rem;
		}

		&__display {
			// visibility: hidden;
			grid-row: visualization-start / visualization-end;
			grid-column: 1 / -1;
			background-color: $display-bg-color;
			overflow: hidden;
			resize: both;

			background-color: #fabada;
		}

		&__footer {
			visibility: hidden;
			grid-row: footer-start / footer-end;
			grid-column: 1/ -1;
			// height: $footer-h;
			background-color: $footer-bg-color;
			background-color: purple;
		}

		&__piano {
			grid-row: piano-start / piano-end;
			grid-column: 1 / -1;
			background-color: rgb(48, 48, 48);
		}
	}

	@include respond(phone) {
		$min-body-h: 60vh;
		grid-template-columns: 1fr;
		grid-template-rows:
			[header-start] minmax($min-header-h, $max-header-h)
			[header-end body-start] minmax(7rem, 100rem)
			[body-end visualization-start] 100px
			[visualization-end piano-start] 200px;

		&__header {
			background-color: black;
			grid-column: 1/ -1;
			grid-row: header-start / header-end;
			width: 100%;
		}

		&__components {
			grid-row: body-start / body-end;
			background-color: purple;
			grid-column: 1 / -1;
			overflow: hidden;
		}

		&__display {
			// visibility: hidden;
			grid-row: visualization-start / visualization-end;
			grid-column: 1 / -1;
			background-color: $display-bg-color;
			overflow: hidden;
			resize: both;

			background-color: #fabada;
		}

		&__footer {
			visibility: hidden;
			grid-row: footer-start / footer-end;
			grid-column: 1/ -1;
			// height: $footer-h;
			background-color: $footer-bg-color;
			background-color: purple;
		}

		&__piano {
			grid-row: piano-start / piano-end;
			grid-column: 1 / -1;
			background-color: rgb(48, 48, 48);
		}
	}
}
</style>
