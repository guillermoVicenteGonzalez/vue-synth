<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="recordableTooltip">
				<span>Recordable</span>
			</VsTooltip>
			<VsSwitchButton
				v-model="recordable"
				:disabled="noRecording"
			></VsSwitchButton>
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="loopTooltip">
				<span>Loops</span>
			</VsTooltip>
			<VsSwitchButton
				v-model="recordingLoops"
				:disabled="noRecording"
			></VsSwitchButton>
		</li>

		<li class="RecorderMenu__item">Load track</li>
		<li
			class="RecorderMenu__item"
			:class="dynamicItemsClass"
			@click="handleDownloadTrack"
		>
			Download track
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsSlider v-model="volume" :min="0" :max="1" :step="0.01"></VsSlider>
		</li>

		<VsSeparator></VsSeparator>
		<li class="RecorderMenu__item" @click="handleDownloadMix">Download mix</li>

		<li class="RecorderMenu__item" @click="handleClearAll">clear all</li>
		<li class="RecorderMenu__item" @click="handlePlayALl">play all</li>
		<li class="RecorderMenu__item" @click="handlePauseAll">pause all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type Recording from "@/models/effects/Recorder/Recording";
import { computed, reactive, ref } from "vue";

const recording = defineModel<Recording | null>();
const recordable = ref();

//Disabled for not because of tooltip overflow
const recordableTooltip = "";
const loopTooltip = "";

//Is this better than a ref + watcher to update the recording?????
const recordingSettings = reactive({
	loops: false,
	recordable: true,
	volume: 1,
});

const volume = computed({
	get: () => {
		if (recording.value) return recording.value.volume;
		else return recordingSettings.volume;
	},

	set: (v: number) => {
		recordingSettings.volume = v;
		if (recording.value) recording.value.volume = recordingSettings.volume;
	},
});

const recordingLoops = computed({
	get: () => {
		if (recording.value) return recording.value.loops;
		else return recordingSettings.loops;
	},

	set: (l: boolean) => {
		recordingSettings.loops = l;
		if (recording.value) recording.value.loops = recordingSettings.loops;
	},
});

// watch([recordingLoops, recordable, recording, volume], () => {
// 	console.warn("Efecto");
// 	if (!recording.value) {
// 		return;
// 	}

// 	recording.value.loops = recordingLoops.value;
// 	recording.value.volume = volume.value;
// });

const noRecording = computed(() => {
	return recording.value == null;
});

const dynamicItemsClass = computed(() => ({
	"RecorderMenu__item--disabled": noRecording,
}));

const emit = defineEmits<{
	(e: "playAll"): void;
	(e: "pauseAll"): void;
	(e: "clearAll"): void;
	(e: "downloadMix"): void;
	(e: "downloadTrack"): void;
}>();

function handlePlayALl() {
	emit("playAll");
}

function handlePauseAll() {
	emit("pauseAll");
}

function handleDownloadMix() {
	emit("downloadMix");
}

function handleDownloadTrack() {
	if (!noRecording.value) return;
	emit("downloadTrack");
}

function handleClearAll() {
	emit("clearAll");
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

		&--disabled {
			cursor: not-allowed;
			color: $disabled-color-1;

			&:not(&--control):hover {
				background-color: $disabled-color-2;
			}
		}
	}

	&__button {
		width: 100%;
		height: 100%;
		padding: 0 2rem;
	}
}
</style>
