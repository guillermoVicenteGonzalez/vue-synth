import type Recorder from "@/models/effects/Recorder/Recorder";
import { computed, ref, triggerRef } from "vue";

export default function useRecorder(recorder: Recorder) {
	const recorderRef = ref<Recorder>(recorder);

	const recorderState = computed<RecordingState>(() => {
		return recorderRef.value.state;
	});

	function startRecording() {
		recorderRef.value.start();
		triggerRef(recorderRef);
	}

	function stopRecording() {
		recorderRef.value.stop();
		triggerRef(recorderRef);
	}

	return { startRecording, stopRecording, recorderState, recorderRef };
}
