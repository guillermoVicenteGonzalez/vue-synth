<template>
	<div class="RecorderWidget">
		<VsTab
			v-for="index in RECORDER_SLOTS"
			:key="index"
			:active="index == activeRecorder"
		>
			<RecorderSlot
				:source="source"
				ref="recorderSlots"
				@playall="playAll"
				@pauseall="pauseAll"
			></RecorderSlot>
		</VsTab>
		<ul class="RecorderWidget__tab-selector">
			<li
				v-for="index in RECORDER_SLOTS"
				:key="index"
				class="RecorderWidget__tab"
				:class="index == activeRecorder ? 'RecorderWidget__tab--active' : ''"
				@click="handleSelectSlot(index)"
			></li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import VsTab from "@/components/common/VsTab/VsTab.vue";
import type AudioCluster from "@/models/AudioCluster";
import { ref, useTemplateRef } from "vue";
import RecorderSlot from "./RecorderSlot.vue";

interface RecorderWidgetProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderWidgetProps>();
const RECORDER_SLOTS = 4;
const activeRecorder = ref<number>(1);
const recorderSlots = useTemplateRef<(typeof RecorderSlot)[]>("recorderSlots");

function handleSelectSlot(n: number) {
	activeRecorder.value = n;
}

function playAll() {
	if (!recorderSlots.value) return;

	recorderSlots.value.forEach(recorder => {
		recorder.replayAudio();
	});
}

function pauseAll() {
	if (!recorderSlots.value) return;

	recorderSlots.value.forEach(recorder => {
		recorder.pauseAudio();
	});
}
</script>
<style lang="scss" scoped>
$btn-size: 5rem;

$tab-width: 3rem;
$tab-height: 1.3rem;

.RecorderWidget {
	display: flex;
	// gap: $gap-df;
	height: 100%;

	align-items: center;

	&__tab-selector {
		margin-left: $gap-df;
		list-style: none;
		height: 100%;
		// background-color: black;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 10px;
		justify-content: space-between;
	}

	&__tab {
		display: block;
		background-color: $bg-color-3;
		width: 5rem;

		height: 100%;
		border-radius: 10px;
		cursor: pointer;
		// height: 100%;
		min-height: $tab-height;
		max-height: $tab-height;

		&--active {
			background-color: $primary-color;
		}
	}
}
</style>
