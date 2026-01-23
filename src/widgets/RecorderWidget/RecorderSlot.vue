<template>
	<div class="Recorder-slot">
		<VsButton
			class="Recorder-slot__play-btn Recorder-slot__button"
			variant="round"
			:disabled="isPlayButtonDisabled"
			@click="handlePlayButtonClick"
		>
			<VsTooltip>
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
			@click="handleRecordButtonClick"
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
				<slot name="slot-menu"></slot>
			</template>
		</DropdownMenu>
	</div>
</template>

<script lang="ts" setup>
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import useRecorder from "@/composables/useRecorder";
import type Recorder from "@/models/effects/Recorder/Recorder";
import { Mic, Pause, Play, Settings, Square } from "lucide-vue-next";
import { computed } from "vue";

interface RecorderSlotProps {
	recorder: Recorder;
}

const { recorder } = defineProps<RecorderSlotProps>();
const {
	recorderRef,
	recorderState,
	recordingRef,
	startRecording,
	stopRecording,
} = useRecorder(recorder);

const playButtonIcon = computed(() => {
	// if (!recordingRef.value) return Play;
	if (!recorderRef.value) return Play;
	if (!recorderRef.value.recording) return Play;

	return recorderRef.value.recording.state == "Paused" ? Play : Pause;
});

const isPlayButtonDisabled = computed(() => {
	return recordingRef.value == null;
});

const recordButtonDynamicClass = computed(() => ({
	"Recorder-slot__record-btn--recording":
		recorderRef.value.state == "recording",
}));

const recordButtonIcon = computed(() => {
	return recorderState.value == "recording" ? Square : Mic;
});

function handleRecordButtonClick() {
	if (recorderState.value == "recording") stopRecording();
	else startRecording();
}

async function handlePlayButtonClick() {
	if (!recordingRef.value) return;

	if (recordingRef.value.state == "Paused") {
		await recordingRef.value.playAudio();
	} else recordingRef.value.pauseAudio();
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
