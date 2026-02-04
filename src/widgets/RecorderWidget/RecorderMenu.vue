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

		<li
			class="RecorderMenu__item"
			:class="dynamicItemsClass"
			@click="handleRestartRecording"
		>
			Restart recording
		</li>

		<li class="RecorderMenu__item" @click="handleLoadFile">Load track</li>

		<li
			class="RecorderMenu__item"
			:class="dynamicItemsClass"
			@click="handleClearRecording"
		>
			Clear recording
		</li>

		<li
			class="RecorderMenu__item"
			:class="dynamicItemsClass"
			@click="handleDownloadTrack"
		>
			Download track
		</li>

		<!-- <li class="RecorderMenu__item" @click="handleDownloadTrack">
			<input type="file" />
		</li> -->

		<li class="RecorderMenu__item RecorderMenu__item--control">
			<VsSlider v-model="volume" :min="0" :max="1" :step="0.01"></VsSlider>
		</li>

		<VsSeparator></VsSeparator>

		<li
			class="RecorderMenu__item"
			:class="dynamicMixBtnClass()"
			@click="handleDownloadMix"
		>
			Download mix
			<VsSpinner v-if="cluster.isDownloadingMix" size="sm"></VsSpinner>
		</li>

		<li
			class="RecorderMenu__item"
			:class="dynamicClusterItemClass()"
			@click="handleClearAll"
		>
			clear all
		</li>
		<li
			class="RecorderMenu__item"
			:class="dynamicClusterItemClass()"
			@click="handlePlayAll"
		>
			play all
		</li>
		<li
			class="RecorderMenu__item"
			:class="dynamicClusterItemClass()"
			@click="handlePauseAll"
		>
			pause all
		</li>
	</ul>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsSpinner from "@/components/common/VsSpinner/VsSpinner.vue";
import VsSwitchButton from "@/components/common/VsSwitchButton/VsSwitchButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type RecorderCluster from "@/models/effects/Recorder/RecorderCluster";
import Recording from "@/models/effects/Recorder/Recording";
import { computed, reactive } from "vue";

interface RecorderMenuProps {
	cluster: RecorderCluster;
}

/**
 * HasRecordings is a caveat. the recordings prop on cluster is a getter => not reactive.
 * I was not able to deeply track the slots prop on the cluster. changes to cluster.recorder.recording where not tracked.
 * Instead, I try to track them from inside the parent
 */
const { cluster } = defineProps<RecorderMenuProps>();

const recording = defineModel<Recording | null>();

//Disabled for not because of tooltip overflow
const recordableTooltip = "";
const loopTooltip = "";

//Is this better than a ref + watcher to update the recording?????
const recordingSettings = reactive({
	loops: false,
	recordable: true,
	volume: 1,
});

const emit = defineEmits<{
	(e: "downloadMix"): void;
	(e: "downloadTrack"): void;
	(e: "playAll"): void;
	(e: "pauseAll"): void;
	(e: "clearAll"): void;
	(e: "clearRecording"): void;
	(e: "restartRecording"): void;
	(e: "loadFile", file: Blob): void;
}>();

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

const recordable = computed({
	get: () => {
		if (recording.value) return recording.value.recordable;
		else return recordingSettings.recordable;
	},

	set: (r: boolean) => {
		recordingSettings.recordable = r;
		if (recording.value) recording.value.recordable = r;
	},
});

//For "single recording" type items
const dynamicItemsClass = computed(() => ({
	"RecorderMenu__item--disabled": recording.value == null,
}));

function dynamicMixBtnClass() {
	return {
		"RecorderMenu__item--toggled": cluster.isDownloadingMix,
		"RecorderMenu__item--disabled": !cluster.slots.some(
			recorder => recorder.recording != null
		),
	};
}
/**
 * For "multi recording" type items.
 * I'm unable to use a computed properly. This is highly inneficient
 */
function dynamicClusterItemClass() {
	return {
		"RecorderMenu__item--disabled": !cluster.slots.some(
			recorder => recorder.recording != null
		),
	};
}

function handleDownloadTrack() {
	emit("downloadTrack");
}

function handleDownloadMix() {
	emit("downloadMix");
}

function handlePlayAll() {
	emit("playAll");
}

function handleClearAll() {
	emit("clearAll");
}

function handlePauseAll() {
	emit("pauseAll");
}

function handleClearRecording() {
	emit("clearRecording");
}

function handleRestartRecording() {
	emit("restartRecording");
}

function handleLoadFile() {
	const i = document.createElement("input");
	i.type = "file";
	i.click();
	i.onchange = () => {
		if (!i.files) return;
		const f = i.files[0];
		emit("loadFile", f);
	};
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
			// cursor: not-allowed;
			color: $disabled-color-1;
			background-color: transparent;
			pointer-events: none;

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
