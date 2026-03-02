<template>
	<header class="vsynth-header">
		<div class="vsynth-header__left">
			<h2 class="vsynth-header__title">VSYNTH</h2>
			<div class="vsynth-header__controls">
				<slot name="controls"></slot>
			</div>
			<div class="vsynth-header__actions">
				<metronome-widget></metronome-widget>
				<settings-button></settings-button>

				<div class="vsynth-header__midi">
					<vs-tooltip text="MIDI" orientation="right">
						<midi-selector></midi-selector>
					</vs-tooltip>
				</div>
			</div>
		</div>
		<div class="vsynth-header__visualizer">
			<slot name="visualizer"></slot>
		</div>
	</header>
</template>

<script setup lang="ts">
import MidiSelector from "@/components/MIDI/MidiSelector.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import MetronomeWidget from "../MetronomeWidget/MetronomeWidget.vue";
import SettingsButton from "../Settings/SettingsButton.vue";

// interface HeaderWidgetWidgetProps {}

// const {...} = defineProps<HeaderWidgetWidgetProps>();
</script>

<style lang="scss" scoped>
$min-title-width: 30rem;
$base-controls-width: 40rem;

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

	&__left {
		// display: grid;
		// grid-template-columns: minmax(20rem, 2fr) minmax(30rem, 2fr) minmax(
		// 		30rem,
		// 		1fr
		// 	);
		display: flex;
		@include respond(phone) {
			display: flex;
		}
	}

	&__title {
		align-self: center;
		justify-self: center;
		font-size: 2rem;
		flex: 0 0 $min-title-width;
		text-align: center;

		@include respond(phone) {
			display: none;
		}
	}

	&__controls {
		// flex: 1 1 100%;
		flex: 1 1 $base-controls-width;
	}

	&__actions {
		gap: $gap-df;

		display: flex;
		align-items: center;
		height: 100%;

		flex: 0 1 fit-content;
		padding: 0 $gap-df;
		border-left: solid 1px $bg-color-1;
	}

	&__midi {
		// padding: $gap-df;

		@include respond(tab-land) {
			padding: 0 $gap-df;
		}
	}
}
</style>
