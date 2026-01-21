<template>
	<VsButton
		class="PlayRecordingButton"
		variant="round"
		@click="handleButtonClick"
	>
		<VsTooltip>
			<component :is="playButtonIcon" class="PlayRecordingButton__icon">
			</component>
		</VsTooltip>
	</VsButton>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type Recorder from "@/models/effects/Recorder/Recorder";
import { Pause, Play } from "lucide-vue-next";
import { computed } from "vue";

interface PlayRecordingBtnProps {
	recorder: Recorder;
}

const { recorder } = defineProps<PlayRecordingBtnProps>();

// const isReplayBtnDisabled = computed(() => {
// 	if (!recorder) return true;
// 	if (!recorder.recording) return true;

// 	return false;
// });

const playButtonIcon = computed(() => {
	if (!recorder.recording) return Pause;

	return recorder.recording.state == "Paused" ? Pause : Play;
});

async function handleButtonClick() {
	if (!recorder.recording) return;

	if (recorder.recording.state == "Paused")
		await recorder.recording.playAudio();
	else recorder.recording.pauseAudio();
}
</script>

<style lang="scss" scoped>
$btn-size: 5rem;
$recording-color: red;

.PlayRecordingButton {
	width: $btn-size;
	height: $btn-size;

	display: flex;
	justify-content: center;
	align-items: center;

	&__icon {
		@include iconButton;
	}
}
</style>
