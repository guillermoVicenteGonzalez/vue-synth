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
						@download-track="handleDownloadTrack(index)"
						@playall="handlePlayAll"
						@clearall="handleClearAll"
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

		<audio ref="tempPlayer" controls></audio>
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
	console.log("AQUI");

	if (slotIndex < 0 && slotIndex >= recorderCluster.value.slots.length) return;
	const recording = recorderCluster.value.slots[slotIndex].recording;
	if (!recording) return;

	console.warn("AQUI");

	const a = document.createElement("a");
	a.href = recording.getRecordingUrl();
	a.download = `track ${slotIndex}`;
	a.click();
}

function handlePlayAll() {
	recorderCluster.value.playAll();
}

function handleClearAll() {
	recorderCluster.value.slots.forEach(recorder => {
		recorder.clearRecording();
		console.log(recorder.recording);
	});

	console.log("Clearing???");
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
