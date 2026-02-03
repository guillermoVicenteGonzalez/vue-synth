<template>
	<div class="RecorderWidget">
		<VsTab
			v-for="(recorder, index) in recorderCluster.slots"
			:key="index"
			:active="index == activeRecorderIndex"
		>
			<RecorderSlot ref="recorderSlots" :source="source" :recorder="recorder">
				<template #slot-menu>
					<RecorderMenu
						v-model="recorderCluster.slots[index].recording"
						:cluster="recorderCluster"
						@download-track="handleDownloadTrack(index)"
						@download-mix="handleDownloadMix"
						@play-all="handlePlayAll"
						@pause-all="handlePauseAll"
						@clear-recording="handleClearTrack(index)"
						@clear-all="handleClearAll"
						@restart-recording="handleRestartRecording(index)"
						@load-file="(f: Blob) => handleLoadFile(f, index)"
					></RecorderMenu>
				</template>
			</RecorderSlot>
		</VsTab>
		<ul class="RecorderWidget__tab-selector">
			<li
				v-for="(_recorder, index) in recorderCluster.slots"
				:key="index"
				class="RecorderWidget__tab"
				:class="
					index == activeRecorderIndex ? 'RecorderWidget__tab--active' : ''
				"
				@click="handleSelectSlot(index)"
			></li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import VsTab from "@/components/common/VsTab/VsTab.vue";
import type AudioCluster from "@/models/AudioCluster";
import RecorderCluster from "@/models/effects/Recorder/RecorderCluster";
import { ref, type Ref } from "vue";
import RecorderMenu from "./RecorderMenu.vue";
import RecorderSlot from "./RecorderSlot.vue";

interface RecorderWidgetProps {
	source: AudioCluster;
}

const { source } = defineProps<RecorderWidgetProps>();
const recorderCluster: Ref<RecorderCluster, RecorderCluster> =
	ref<RecorderCluster>(new RecorderCluster(source.exit, source.context)) as Ref<
		RecorderCluster,
		RecorderCluster
	>;

const activeRecorderIndex = ref<number>(0);

function handleSelectSlot(n: number) {
	activeRecorderIndex.value = n;
}

function handleDownloadTrack(slotIndex: number) {
	if (slotIndex < 0 && slotIndex >= recorderCluster.value.slots.length) return;
	const recording = recorderCluster.value.slots[slotIndex].recording;
	if (!recording) return;

	const a = document.createElement("a");
	a.href = recording.getRecordingUrl();
	a.download = `track ${slotIndex}`;
	a.click();
}

async function handlePlayAll() {
	await recorderCluster.value.playAll();
}

function handleClearAll() {
	recorderCluster.value.slots.forEach(recorder => {
		recorder.clearRecording();
		console.log(recorder.recording);
	});
}

function handlePauseAll() {
	recorderCluster.value.pauseAll();
}

async function handleDownloadMix() {
	if (recorderCluster.value.isDownloadingMix) return;

	const url = await recorderCluster.value.mixRecordings();

	if (!url) return;

	const a = document.createElement("a");
	a.href = url;
	a.download = `Mix`;
	a.click();
}

function handleClearTrack(slotIndex: number) {
	recorderCluster.value.slots[slotIndex].clearRecording();
}

function handleRestartRecording(index: number) {
	if (index < 0 && index >= recorderCluster.value.slots.length) return;

	const recording = recorderCluster.value.slots[index].recording;
	if (!recording) return;

	recording.restartAudio();
}

function handleLoadFile(file: Blob, slotIndex: number) {
	recorderCluster.value.slots[slotIndex].loadRecording(file);
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
