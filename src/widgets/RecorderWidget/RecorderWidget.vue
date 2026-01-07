<template>
	<div class="RecorderWidget">
		<VsButton
			class="RecorderWidget__play-btn RecorderWidget__button"
			variant="round"
			@click="handleReplayButton"
		>
			<VsTooltip text="play">
				<component
					:is="playButtonIcon"
					class="RecorderWidget__button__icon"
				></component>
			</VsTooltip>
		</VsButton>
		<VsButton
			class="RecorderWidget__record-btn RecorderWidget__button"
			variant="round"
			@click="handleRecordingButton"
		>
			<VsTooltip>
				<component
					:is="recordButtonIcon"
					class="RecorderWidget__button__icon"
				></component>
			</VsTooltip>
		</VsButton>

		<audio ref="audioRef" class="RecorderWidget__audio"></audio>

		<span style="color: white">{{ recorder.state }}</span>
	</div>
</template>

<script lang="ts" setup>
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type AudioCluster from "@/models/AudioCluster";
import AudioRecorder from "@/models/Recorder";
import { Mic, Pause, Play, Square } from "lucide-vue-next";
import { computed, ref } from "vue";

interface RecorderWidgetProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderWidgetProps>();
const audioRef = ref<HTMLAudioElement>();
const recorder = ref<AudioRecorder>(
	new AudioRecorder(source.exit, source.context)
);

const playButtonIcon = computed(() => {
	return recorder.value.state == "recording" ? Pause : Play;
});

const recordButtonIcon = computed(() => {
	return recorder.value.state == "recording" ? Square : Mic;
});

function handleReplayButton() {
	if (audioRef.value) audioRef.value.play();
	console.log("replay");
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
</script>
<style lang="scss" scoped>
$btn-size: 5rem;

.RecorderWidget {
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
		width: 10rem;
		height: 10rem;
		background-color: Red;
	}
}
</style>
