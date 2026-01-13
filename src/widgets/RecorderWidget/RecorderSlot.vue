<template>
	<div class="Recorder-slot">
		<VsButton
			class="Recorder-slot__play-btn Recorder-slot__button"
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
					@click="openContextMenu"
				>
					<VsTooltip>
						<Settings
							class="Recorder-slot__button__icon"
						></Settings> </VsTooltip
				></VsButton>
			</template>

			<template #content>
				<RecorderMenu></RecorderMenu>
			</template>
		</DropdownMenu>

		<audio
			ref="audioRef"
			class="Recorder-slot__audio"
			:loop="isLooping"
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
import { computed, ref } from "vue";
import RecorderMenu from "./RecorderMenu.vue";

interface RecorderSlotProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderSlotProps>();
const audioRef = ref<HTMLAudioElement>();
const contextMenuVisible = ref<boolean>(false);
const contextMenuPos = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const recorder = ref<AudioRecorder>(
	new AudioRecorder(source.exit, source.context)
);
const isLooping = ref<boolean>(true);
const playButtonIcon = computed(() => {
	return recorder.value.state == "recording" ? Pause : Play;
});

const recordButtonIcon = computed(() => {
	return recorder.value.state == "recording" ? Square : Mic;
});

function handleReplayButton() {
	if (audioRef.value) audioRef.value.play();
}

function handleRecordingButton() {
	if (recorder.value.state == "recording") handleRecorderStop();
	else handleRecorderStart();
}

function handleRecorderStart() {
	recorder.value.start();
	console.log(`recorder start. Recorder state: ${recorder.value.state}`);
}

async function handleRecorderStop() {
	console.log(`recorder stop. Recorder state: ${recorder.value.state}`);

	await recorder.value.stop();

	if (!audioRef.value) {
		console.error("no audioRef");
		return;
	}

	const audioUrl = recorder.value.getRecordingUrl();
	if (audioUrl) audioRef.value.src = audioUrl;
	else console.log("no audioUrl");
}

function openContextMenu(e: MouseEvent) {
	e.preventDefault();
	contextMenuVisible.value = true;
	contextMenuPos.value.x = e.clientX;
	contextMenuPos.value.y = e.clientY;
}
</script>
<style lang="scss" scoped>
$btn-size: 5rem;

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

	&__audio {
		display: none;
	}
}
</style>
