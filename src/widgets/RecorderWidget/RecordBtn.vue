<template>
	<VsButton
		variant="round"
		class="RecordBtn"
		:class="recordButtonDynamicClass"
		@click="handleRecordBtnClick"
	>
		<VsTooltip>
			<component :is="recordButtonIcon" class="RecordBtn__icon"> </component>
		</VsTooltip>
	</VsButton>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import useRecorder from "@/composables/useRecorder";
import type Recorder from "@/models/effects/Recorder/Recorder";
import { Mic, Square } from "lucide-vue-next";
import { computed } from "vue";

interface RecordBtnProps {
	recorder: Recorder;
}

const { recorder } = defineProps<RecordBtnProps>();
const { startRecording, stopRecording, recorderState } = useRecorder(recorder);

const recordButtonIcon = computed(() => {
	if (!recorder) return Mic;
	return recorderState.value == "recording" ? Square : Mic;
});

const recordButtonDynamicClass = computed(() => {
	return {
		"RecordBtn--recording": recorderState.value == "recording",
	};
});

function handleRecordBtnClick() {
	console.log(`recorder state: ${recorderState.value}`);

	if (recorder.state == "recording") stopRecording();
	else startRecording();
}
</script>

<style lang="scss" scoped>
$btn-size: 5rem;
$recording-color: red;

.RecordBtn {
	width: $btn-size;
	height: $btn-size;

	display: flex;
	justify-content: center;
	align-items: center;

	&__icon {
		@include iconButton;
	}

	&--recording {
		background-color: $recording-color;
	}
}
</style>
