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
			@contextmenu="handleRecorderBtnContextMenu"
			@click="handleRecordingButton"
		>
			<VsTooltip text="Record">
				<component
					:is="recordButtonIcon"
					class="Recorder-slot__button__icon"
				></component>
			</VsTooltip>
		</VsButton>

		<ContextMenu
			class="Recorder-slot__context-menu RecorderSlot__context-menu--recorder-btn"
			:visible="recorderBtnContextMenuVisible"
			:pos-x="recorderBtnContextMenuPos.x"
			:pos-y="recorderBtnContextMenuPos.y"
			@close="recorderBtnContextMenuVisible = false"
		>
			<ul>
				<li>Record and play all</li>
			</ul>
		</ContextMenu>

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
					v-model:volume="volume"
					@download-mix="emit('downloadMix')"
					@playall="emit('playall')"
					@pauseall="emit('pauseall')"
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
import ContextMenu from "@/components/common/ContextMenu/ContextMenu.vue";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type AudioCluster from "@/models/AudioCluster";
import AudioRecorder from "@/models/effects/Recorder/Recorder";
import Recording from "@/models/effects/Recorder/Recording";
import { Mic, Pause, Play, Settings, Square } from "lucide-vue-next";
import {
	computed,
	onMounted,
	ref,
	triggerRef,
	useTemplateRef,
	watchEffect,
} from "vue";
import RecorderMenu from "./RecorderMenu.vue";

interface RecorderSlotProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderSlotProps>();
const emit = defineEmits<{
	(e: "playall"): void;
	(e: "pauseall"): void;
	(e: "downloadMix"): void;
}>();
const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");
const recorderBtnContextMenuVisible = ref(false);
const recorderBtnContextMenuPos = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const recorder = ref<AudioRecorder>(
	new AudioRecorder(source.exit, source.context)
);
const recordingLoops = ref<boolean>(true);
const isRecordable = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const isRecording = ref<RecordingState>();
const recording = ref<Recording | null>();
const volume = ref<number>(1);

watchEffect(() => {
	if (recording.value) recording.value.volume = volume.value;
});

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
	// if (!audioRef.value.readyState) return true;
	if (audioRef.value.error != null) return true;

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
		if (audioRef.value.readyState) audioRef.value.play();
	} else pauseAudio();

	triggerRef(audioRef);
}

/**
 * Meant to be exposed
 */
function replayAudio() {
	if (!audioRef.value) return;
	if (!audioRef.value.src) return;

	// audioRef.value.pause();
	audioRef.value.currentTime = 0;

	audioRef.value.play();
	triggerRef(audioRef);
}

function pauseAudio() {
	if (!audioRef.value) return;
	audioRef.value.pause();
	audioRef.value.currentTime = 0;
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
	if (audioUrl) {
		try {
			audioRef.value.src = audioUrl;
		} catch (err) {
			console.warn(err);
		}
	}

	triggerRef(audioRef);
}

function handleRecorderBtnContextMenu(e: MouseEvent) {
	e.preventDefault();

	recorderBtnContextMenuVisible.value = !recorderBtnContextMenuVisible.value;
	recorderBtnContextMenuPos.value.x = e.clientX;
	recorderBtnContextMenuPos.value.y = e.clientY;
}

onMounted(() => {
	if (!audioRef.value) return;

	audioRef.value.onerror = () => {
		triggerRef(audioRef);
	};

	recording.value = new Recording(audioRef.value, source.context);
});

defineExpose({
	replayAudio,
	pauseAudio,
	recorder,
});
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

	&__context-menu {
		ul {
			list-style: none;
			display: flex;
			flex-direction: column;

			gap: $gap-df;
			padding: 0 $gap-df;
			color: $text-color;
			font-size: 1.6rem;

			li {
				cursor: pointer;
				border-radius: $border-radius-sm;
				padding: 0 $gap-df;

				&:hover {
					background-color: $primary-color;
				}
			}
		}
	}
}
</style>
