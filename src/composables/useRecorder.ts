import type Recorder from "@/models/effects/Recorder/Recorder";
import { computed, ref, triggerRef } from "vue";

export default function useRecorder(recorder: Recorder) {
	const recorderRef = ref<Recorder>(recorder);

	const recordingRef = computed(() => {
		return recorderRef.value.recording;
	});

	const recorderState = computed<RecordingState>(() => {
		return recorderRef.value.state;
	});

	function startRecording() {
		recorderRef.value.start();
		triggerRef(recorderRef);
	}

	async function stopRecording() {
		await recorderRef.value.stop();
		triggerRef(recorderRef);
		triggerRef(recordingRef);
	}

	return {
		startRecording,
		stopRecording,

		recorderState,
		recorderRef,
		recordingRef,
	};
}
