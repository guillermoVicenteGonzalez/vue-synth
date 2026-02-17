<template>
	<div class="Recorder-slot">
		<VsTooltip orientation="right" delay="1s" text="Play">
			<VsButton
				class="Recorder-slot__play-btn Recorder-slot__button"
				variant="round"
				:disabled="isPlayButtonDisabled"
				@click="handlePlayButtonClick"
			>
				<component
					:is="playButtonIcon"
					class="Recorder-slot__button__icon"
				></component>
			</VsButton>
		</VsTooltip>

		<VsTooltip orientation="right" text="Record">
			<VsButton
				class="Recorder-slot__record-btn Recorder-slot__button"
				:class="recordButtonDynamicClass"
				variant="round"
				@click="handleRecordButtonClick"
			>
				<component
					:is="recordButtonIcon"
					class="Recorder-slot__button__icon"
				></component>
			</VsButton>
		</VsTooltip>

		<DropdownMenu orientation="top">
			<template #activator>
				<VsTooltip orientation="right" delay="1s" text="Settings">
					<VsButton
						class="Recorder-slot__button Recorder-slot__settings-btn"
						variant="round"
					>
						<Settings class="Recorder-slot__button__icon"></Settings>
					</VsButton>
				</VsTooltip>
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
	playAudio,
	pauseAudio,
} = useRecorder(recorder);

const playButtonIcon = computed(() => {
	if (!recordingRef.value) return Play;

	return recordingRef.value.paused ? Play : Pause;
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

	if (recordingRef.value.paused) {
		await playAudio();
	} else pauseAudio();
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

		padding: $gap-df;

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

	&__play-context-menu {
		@include contextMenu();
		color: $text-color;
	}
}
</style>
