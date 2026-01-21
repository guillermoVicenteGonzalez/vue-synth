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
import type Recorder from "@/models/effects/Recorder/Recorder";
import { Mic, Square } from "lucide-vue-next";
import { computed } from "vue";

interface RecordBtnProps {
	recorder: Recorder;
}

const { recorder } = defineProps<RecordBtnProps>();

const recordButtonIcon = computed(() => {
	if (!recorder) return Mic;
	return recorder.state == "recording" ? Square : Mic;
});

const recordButtonDynamicClass = computed(() => {
	if (!recorder) return "";
	return {
		"RecorderBtn--recording": recorder.state == "recording",
	};
});

function handleRecordBtnClick() {
	if (recorder.state == "recording") recorder.stop();
	else recorder.start();
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
