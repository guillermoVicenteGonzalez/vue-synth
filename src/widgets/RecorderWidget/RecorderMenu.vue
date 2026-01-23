<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="recordableTooltip">
				<span>Recordable</span>
			</VsTooltip>
			<VsSwitchButton v-model="recordable"></VsSwitchButton>
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="loopTooltip">
				<span>Loops</span>
			</VsTooltip>
			<VsSwitchButton v-model="recordingLoops"></VsSwitchButton>
		</li>

		<li class="RecorderMenu__item">Load track</li>
		<li class="RecorderMenu__item" @click="handleDownloadTrack">
			Download track
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsSlider v-model="volume" :min="0" :max="1" :step="0.01"></VsSlider>
		</li>

		<VsSeparator></VsSeparator>
		<li class="RecorderMenu__item" @click="handleDownloadMix">Download mix</li>

		<li class="RecorderMenu__item">clear all</li>
		<li class="RecorderMenu__item" @click="handlePlayALl">play all</li>
		<li class="RecorderMenu__item" @click="handlePauseAll">pause all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";

const volume = defineModel<number>("volume", {
	default: 1,
});
const recordingLoops = defineModel<boolean>("loops");
const recordable = defineModel<boolean>("recordable");

//Disabled for not because of tooltip overflow
const recordableTooltip = "";
const loopTooltip = "";

const emit = defineEmits<{
	(e: "playall"): void;
	(e: "pauseall"): void;
	(e: "downloadMix"): void;
	(e: "test"): void;
	(e: "downloadTrack"): void;
}>();

function handlePlayALl() {
	emit("playall");
}

function handlePauseAll() {
	emit("pauseall");
}

function handleDownloadMix() {
	emit("downloadMix");
}

function handleDownloadTrack() {
	emit("downloadTrack");
}
</script>

<style lang="scss" scoped>
$recorder-menu-min-width: 15rem;
$recorder-menu-max-height: 15rem;
$button-height: 3rem;

.RecorderMenu {
	list-style: none;
	min-width: $recorder-menu-min-width;
	width: fit-content;
	max-height: $recorder-menu-max-height;
	overflow: auto;

	display: flex;
	flex-direction: column;

	gap: $gap-df;
	padding: 0 $gap-df;

	&__item {
		padding: $gap-df;
		font-size: 1.6rem;
		color: $text-color;
		width: 100%;
		height: $button-height;

		white-space: nowrap;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $gap-bg;

		&:not(&--control) {
			cursor: pointer;
		}

		&:not(&--control):hover {
			background-color: $primary-color;
			border-radius: $border-radius-sm;
		}

		* {
			white-space: nowrap;
		}
	}

	&__button {
		width: 100%;
		height: 100%;
		padding: 0 2rem;
	}
}
</style>
