<template>
	<div class="Recorder-slot">
		<PlayRecordingBtn :recorder="recorder"></PlayRecordingBtn>
		<RecordBtn :recorder="recorder"></RecordBtn>

		<ContextMenu
			class="Recorder-slot__context-menu RecorderSlot__context-menu--recorder-btn"
			:visible="recorderBtnContextMenuVisible"
			:pos-x="recorderBtnContextMenuPos.x"
			:pos-y="recorderBtnContextMenuPos.y"
			@close="recorderBtnContextMenuVisible = false"
		>
			<ul>
				<li>Record and play all</li>
			</ul>
		</ContextMenu>

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
				<RecorderMenu
					v-model:loops="recordingLoops"
					v-model:recordable="isRecordable"
					v-model:volume="volume"
					@download-mix="emit('downloadMix')"
					@playall="emit('playall')"
					@pauseall="emit('pauseall')"
				></RecorderMenu>
			</template>
		</DropdownMenu>

		<audio
			ref="audioRef"
			class="Recorder-slot__audio"
			:loop="recordingLoops"
		></audio>
	</div>
</template>

<script lang="ts" setup>
import ContextMenu from "@/components/common/ContextMenu/ContextMenu.vue";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import type Recorder from "@/models/effects/Recorder/Recorder";
import { Settings } from "lucide-vue-next";
import { ref } from "vue";
import PlayRecordingBtn from "./PlayRecordingBtn.vue";
import RecordBtn from "./RecordBtn.vue";
import RecorderMenu from "./RecorderMenu.vue";

interface RecorderSlotProps {
	recorder: Recorder;
}

const { recorder } = defineProps<RecorderSlotProps>();
const emit = defineEmits<{
	(e: "playall"): void;
	(e: "pauseall"): void;
	(e: "downloadMix"): void;
}>();
const recorderBtnContextMenuVisible = ref(false);
const recorderBtnContextMenuPos = ref<{ x: number; y: number }>({ x: 0, y: 0 });

// const recorder = ref<AudioRecorder>(
// 	new AudioRecorder(source.exit, source.context)
// );
const recordingLoops = ref<boolean>(true);
const isRecordable = ref<boolean>(false);

const volume = ref<number>(1);
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
