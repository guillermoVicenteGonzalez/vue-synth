<template>
	<ul class="RecorderMenu">
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="recordableTooltip">
				<span>Recordable</span>
			</VsTooltip>
			<VsSwitchButton
				v-model="recordable"
				:disabled="recording == null"
			></VsSwitchButton>
		</li>
		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsTooltip :text="loopTooltip">
				<span>Loops</span>
			</VsTooltip>
			<VsSwitchButton
				v-model="recordingLoops"
				:disabled="recording == null"
			></VsSwitchButton>
		</li>

		<li class="RecorderMenu__item">Load track</li>
		<li class="RecorderMenu__item">Clear recording</li>

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
		<li
			class="RecorderMenu__item"
			:class="downloadMixButtonDynamicClass"
			@click="handleDownloadMix"
		>
			Download mix
			<VsSpinner v-if="isDownloadingMix" size="sm"></VsSpinner>
		</li>

		<li class="RecorderMenu__item" @click="handleClearAll">clear all</li>
		<li class="RecorderMenu__item" @click="handlePlayAll">play all</li>
		<li class="RecorderMenu__item" @click="handlePauseAll">pause all</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsSpinner from "@/components/common/VsSpinner/VsSpinner.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type RecorderCluster from "@/models/effects/Recorder/RecorderCluster";
import type Recording from "@/models/effects/Recorder/Recording";
import { computed, reactive, ref } from "vue";

interface RecorderMenuProps {
	cluster: RecorderCluster;
}

const { cluster } = defineProps<RecorderMenuProps>();

const recording = defineModel<Recording | null>();
const recordable = ref();

//Disabled for not because of tooltip overflow
const recordableTooltip = "";
const loopTooltip = "";

const isDownloadingMix = ref<boolean>(false);

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

const dynamicItemsClass = computed(() => ({
	"RecorderMenu__item--disabled": recording.value == null,
}));

const downloadMixButtonDynamicClass = computed(() => ({
	"RecorderMenu__item--toggled": isDownloadingMix.value,
	"RecorderMenu__item--disabled": !cluster.recordings.some(r => r != null),
}));

async function handlePlayAll() {
	await cluster.playAll();
}

function handleClearAll() {
	cluster.slots.forEach(recorder => {
		recorder.clearRecording();
		console.log(recorder.recording);
	});

	console.log("Clearing???");
}

function handlePauseAll() {
	cluster.pauseAll();
}

async function handleDownloadMix() {
	if (isDownloadingMix.value) return;

	const availableRecordingTracks = cluster.slots
		.map(recorder => {
			return recorder.recording;
		})
		.filter(recording => {
			return recording != null;
		});

	if (availableRecordingTracks.length == 0) return;

	isDownloadingMix.value = true;

	const url = await cluster.mixRecordings();
	isDownloadingMix.value = false;

	if (!url) return;

	const a = document.createElement("a");
	a.href = url;
	a.download = `Mix`;
	a.click();
}

function handleDownloadTrack() {
	if (!recording.value) return;

	const a = document.createElement("a");
	a.href = recording.value.getRecordingUrl();
	// a.download = `track ${slotIndex}`;
	a.download = "track";
	a.click();
}
</script>

<style lang="scss" scoped>
$recorder-menu-min-width: 15rem;
$recorder-menu-max-height: 20rem;
$button-height: 3rem;
$item-active-scale: 0.95;

@mixin active {
	background-color: $primary-color;
	border-radius: $border-radius-sm;
}

@mixin toggled {
	@include active;
	transform: scale($item-active-scale);
}

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

		&:not(&--control):not(&--toggled) {
			cursor: pointer;

			&:hover {
				background-color: $primary-color;
				border-radius: $border-radius-sm;
			}

			&:active {
				transform: scale($item-active-scale);
			}
		}

		* {
			white-space: nowrap;
		}

		&--disabled {
			cursor: not-allowed;
			color: $disabled-color-1;
			background-color: transparent;

			// Cheap way to increase specificity
			&:hover:hover:hover {
				background-color: transparent;
				cursor: not-allowed;
			}
		}

		&--toggled {
			@include toggled();
			cursor: not-allowed;
		}
	}

	&__button {
		width: 100%;
		height: 100%;
		padding: 0 2rem;
	}
}
</style>
