<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item RecorderMenu__item--switch">
			<VsTooltip :text="recordableTooltip">
				<span>Recordable</span>
			</VsTooltip>
			<VsSwitchButton v-model="recordable"></VsSwitchButton>
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--switch">
			<VsTooltip :text="loopTooltip">
				<span>Loops</span>
			</VsTooltip>
			<VsSwitchButton v-model="recordingLoops"></VsSwitchButton>
		</li>

		<li class="RecorderMenu__item">Load track</li>
		<li class="RecorderMenu__item">Download track</li>
		<li class="RecorderMenu__item">Volume</li>

		<VsSeparator></VsSeparator>
		<li class="RecorderMenu__item">clear all</li>
		<li class="RecorderMenu__item" @click="handlePlayALl">play all</li>
		<li class="RecorderMenu__item" @click="handlePauseAll">pause all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";

const recordingLoops = defineModel<boolean>("loops");
const recordable = defineModel<boolean>("recordable");

//Disabled for not because of tooltip overflow
const recordableTooltip = "";
const loopTooltip = "";

const emit = defineEmits<{
	(e: "playall"): void;
	(e: "pauseall"): void;
}>();

function handlePlayALl() {
	emit("playall");
}

function handlePauseAll() {
	emit("pauseall");
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

		&:not(&--switch) {
			cursor: pointer;
		}

		&:not(&--switch):hover {
			background-color: $primary-color;
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
