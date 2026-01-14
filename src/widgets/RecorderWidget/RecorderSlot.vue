<template>
	<div class="Recorder-slot">
		<VsButton
			class="Recorder-slot__play-btn Recorder-slot__button"
			:disabled="isReplayBtnDisabled"
			variant="round"
			@click="handleReplayButton"
		>
			<VsTooltip text="play">
				<component
					:is="playButtonIcon"
					class="Recorder-slot__button__icon"
				></component>
			</VsTooltip>
		</VsButton>
		<VsButton
			class="Recorder-slot__record-btn Recorder-slot__button"
			:class="recordButtonDynamicClass"
			variant="round"
			@click="handleRecordingButton"
		>
			<VsTooltip text="Record">
				<component
					:is="recordButtonIcon"
					class="Recorder-slot__button__icon"
				></component>
			</VsTooltip>
		</VsButton>

		<DropdownMenu orientation="top">
			<template #activator>
				<VsButton
					class="Recorder-slot__button Recorder-slot__settings-btn"
					variant="round"
				>
					<VsTooltip>
						<Settings
							class="Recorder-slot__button__icon"
						></Settings> </VsTooltip
				></VsButton>
			</template>

			<template #content>
				<RecorderMenu
					v-model:loops="recordingLoops"
					v-model:recordable="isRecordable"
				></RecorderMenu>
			</template>
		</DropdownMenu>

		<audio
			ref="audioRef"
			class="Recorder-slot__audio"
			:loop="recordingLoops"
		></audio>
	</div>
</template>

<script lang="ts" setup>
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type AudioCluster from "@/models/AudioCluster";
import AudioRecorder from "@/models/Recorder";
import { Mic, Pause, Play, Settings, Square } from "lucide-vue-next";
import { computed, ref, triggerRef, useTemplateRef, watchEffect } from "vue";
import RecorderMenu from "./RecorderMenu.vue";

interface RecorderSlotProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderSlotProps>();
const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");

const recorder = ref<AudioRecorder>(
	new AudioRecorder(source.exit, source.context)
);
const recordingLoops = ref<boolean>(true);
const isRecordable = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const isRecording = ref<RecordingState>();

watchEffect(() => {
	if (!audioRef.value) return;
	isPlaying.value = !audioRef.value.paused;
});

//This should be reactive by default but it is not working???
watchEffect(() => {
	isRecording.value = recorder.value.state;
});

const isReplayBtnDisabled = computed(() => {
	if (!audioRef.value) return true;
	if (!audioRef.value.src) return true;
	return false;
});

const playButtonIcon = computed(() => {
	return isPlaying.value ? Pause : Play;
});

const recordButtonIcon = computed(() => {
	return recorder.value.state == "recording" ? Square : Mic;
});

const recordButtonDynamicClass = computed(() => {
	return {
		"Recorder-slot__record-btn--recording": recorder.value.state == "recording",
	};
});

function handleReplayButton() {
	if (!audioRef.value) return;

	if (audioRef.value.paused) {
	} else audioRef.value.pause();

	triggerRef(audioRef);
}

function handleRecordingButton() {
	if (recorder.value.state == "recording") handleRecorderStop();
	else handleRecorderStart();

	triggerRef(recorder);
}

function handleRecorderStart() {
	recorder.value.start();
}

async function handleRecorderStop() {
	await recorder.value.stop();

	if (!audioRef.value) {
		console.error("no audioRef");
		return;
	}

	const audioUrl = recorder.value.getRecordingUrl();
	if (audioUrl) audioRef.value.src = audioUrl;
	triggerRef(audioRef);
}
</script>
<style lang="scss" scoped>
$btn-size: 5rem;
$recording-color: red;

.Recorder-slot {
	display: flex;
	gap: $gap-df;

	&__button {
		width: $btn-size;
		height: $btn-size;

		display: flex;
		justify-content: center;
		align-items: center;

		&__icon {
			@include iconButton;
		}
	}

	&__record-btn {
		&--recording {
			background-color: $recording-color;
		}
	}

	&__audio {
		display: none;
	}
}
</style>
