<template>
	<header class="mobile-header">
		<div class="mobile-header__visualizer-container">
			<WaveAnalyser
				class="mobile-header__visualizer"
				:line-color="primaryColor"
				:source="cluster.exit"
				:canvas-width="3080"
				:canvas-height="200"
				:brush-size="7"
			></WaveAnalyser>
		</div>

		<!-- <div class="mobile-header__title">VSYNTH</div> -->

		<div class="mobile-header__tabs">
			<VsButton
				variant="round"
				class="mobile-header__button"
				@click="changeTab('piano')"
			>
				<KeyboardMusic class="mobile-header__button__icon"></KeyboardMusic>
			</VsButton>

			<VsButton
				variant="round"
				class="mobile-header__button"
				@click="changeTab('voices')"
			>
				<AudioLines class="movile-header__button__icon"></AudioLines>
			</VsButton>
			<VsButton
				variant="round"
				class="mobile-header__button"
				@click="changeTab('effects')"
			>
				<Sparkles class="mobile-header__button__icon"> </Sparkles>
			</VsButton>

			<VsButton
				variant="round"
				class="mobile-header__button"
				@click="changeTab('envelope')"
			>
				<Mail class="mobile-header__button__icon"></Mail>
			</VsButton>

			<VsButton
				variant="round"
				class="mobile-header__button"
				@click="changeTab('lfo')"
			>
				<Activity class="mobile-header__button__icon"></Activity>
			</VsButton>
		</div>
		<div class="mobile-header__actions">
			<metronome-widget></metronome-widget>
			<settings-button></settings-button>

			<div class="vsynth-header__midi">
				<VsTooltip>
					<midi-selector></midi-selector>
				</VsTooltip>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import MidiSelector from "@/components/MIDI/MidiSelector.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import {
	Activity,
	AudioLines,
	KeyboardMusic,
	Mail,
	Sparkles,
} from "lucide-vue-next";
import MetronomeWidget from "../MetronomeWidget/MetronomeWidget.vue";
import SettingsButton from "../Settings/SettingsButton.vue";

import useSynth from "@/composables/useSynth";
import type { MobileTabs } from "@/layouts/synth/PortraitSynthLayout.vue";

const currentTab = defineModel<MobileTabs>({ default: "voices" });

const primaryColor = "#42d392";
const { cluster } = useSynth();

function changeTab(newTab: MobileTabs) {
	currentTab.value = newTab;
	// alert(`change tab to ${newTab}`);
}
</script>

<style scoped lang="scss">
$min-title-width: 25rem;
$max-title-width: 50%;

$min-actions-size: 5rem;
$max-actions-size: 30%;

$min-tabs-size: 5rem;
$max-tabs-size: 30%;

$min-visualizer-size: 50%;
$max-visualizer-size: 100%;

$btn-size: 4rem;
$btn-size-sm: 3rem;

$visualizer-height: 7rem;

.mobile-header {
	background-color: $tertiary-color;
	width: 100%;
	height: 100%;

	// display: grid;
	// grid-template-columns:
	// 	[title-start] minmax($min-title-width, $max-title-width)
	// 	[title-end tabs-start] minmax($min-tabs-size, $max-tabs-size)
	// 	[tabs-end actions-start] minmax($min-actions-size, $max-actions-size)
	// 	[actions-end visualizer-start] minmax(
	// 		$min-visualizer-size,
	// 		$max-visualizer-size
	// 	);
	display: flex;
	// flex-wrap: wrap;

	&__actions,
	&__tabs,
	&__title {
		padding: $gap-df 0;
	}

	&__visualizer-container {
		height: $visualizer-height;
		flex: 0 1 100%;
	}

	&__actions {
		// flex: 1 1 $min-actions-size;
	}

	&__tabs {
		// flex: 1 1 $min-tabs-size;
	}

	&__visualizer {
		background-color: $bg-color-1;
	}

	&__actions,
	&__tabs {
		padding: 0 $gap-bg;
		border-left: solid 1px black;
		display: flex;
		gap: $gap-df;
		justify-content: space-around;
		align-items: center;
		width: fit-content;
	}

	&__button {
		background-color: $primary-color;
		width: $btn-size;
		height: $btn-size;
		padding: $gap-df;
		display: flex;
		align-items: center;
		padding: $gap-df;

		&__icon {
			@include iconButton();
			color: $tertiary-color;
			color: black;
		}
	}

	&__title {
		align-self: center;
		justify-self: center;
		font-size: 2rem;
		flex: 1 0 $min-title-width;
		text-align: center;
		color: $text-color;
	}
}
</style>
