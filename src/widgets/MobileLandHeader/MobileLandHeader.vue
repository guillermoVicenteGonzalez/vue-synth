<template>
	<header class="mobile-land-header">
		<div class="mobile-land-header__visualizer-container">
			<WaveAnalyser
				class="mobile-land-header__visualizer"
				:line-color="primaryColor"
				:source="cluster.exit"
				:canvas-width="3080"
				:canvas-height="200"
				:brush-size="7"
			></WaveAnalyser>
		</div>
		<div class="mobile-land-header__actions">
			<nav class="mobile-land-header__tabs">
				<VsButton
					variant="round"
					class="mobile-land-header__button"
					@click="changeTab('voices')"
				>
					<AudioLines class="mobile-land-header__button__icon"></AudioLines>
				</VsButton>
				<VsButton
					variant="round"
					class="mobile-land-header__button"
					@click="changeTab('effects')"
				>
					<Sparkles class="mobile-land-header__button__icon"></Sparkles>
				</VsButton>

				<VsButton
					variant="round"
					class="mobile-land-header__button"
					@click="changeTab('envelope')"
				>
					<Mail class="mobile-land-header__button__icon"></Mail>
				</VsButton>

				<VsButton
					variant="round"
					class="mobile-land-header__button"
					@click="changeTab('lfo')"
				>
					<Activity class="mobile-land-header__button__icon"></Activity>
				</VsButton>
			</nav>
			<div class="mobile-land-header__tools">
				<MetronomeWidget></MetronomeWidget>
				<SettingsButton></SettingsButton>

				<div class="vsynth-header__midi">
					<VsTooltip>
						<midi-selector></midi-selector>
					</VsTooltip>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import MidiSelector from "@/components/MIDI/MidiSelector.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import useSynth from "@/composables/useSynth";
import { Activity, AudioLines, Mail, Sparkles } from "lucide-vue-next";
import MetronomeWidget from "../MetronomeWidget/MetronomeWidget.vue";
import SettingsButton from "../Settings/SettingsButton.vue";

export type MobileLandHeaderTabs = "voices" | "effects" | "envelope" | "lfo";
const currentTab = defineModel<MobileLandHeaderTabs>({ default: "voices" });

const primaryColor = "#42d392";
const { cluster } = useSynth();

function changeTab(newTab: MobileLandHeaderTabs) {
	currentTab.value = newTab;
}
</script>

<style lang="scss" scoped>
$btn-size: 4rem;
$btn-size-sm: 3rem;

$border-size: 0.1rem;
$border-color: black;

.mobile-land-header {
	width: 100%;
	height: 100%;
	background-color: $tertiary-color;
	display: flex;
	flex-direction: column;

	&__actions {
		display: flex;
		// gap: $gap-sm;
		// justify-content: space-around;
		align-items: center;
	}

	&__visualizer-container {
		height: 100%;
		flex: 0 1 100%;
	}

	&__visualizer {
		background-color: $bg-color-1;
	}

	&__tools,
	&__tabs {
		flex: 1 1 100%;
		justify-content: space-around;
		display: flex;
		padding: $gap-df;
		gap: $gap-bg;
	}

	&__tools {
		border-left: solid $border-size $border-color;
	}

	&__button {
		background-color: $primary-color;
		width: $btn-size;
		height: $btn-size;
		padding: $gap-df;
		display: flex;
		align-items: center;

		&__icon {
			@include iconButton();
			color: black;
		}
	}
}
</style>
