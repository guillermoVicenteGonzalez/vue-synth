import type Recorder from "@/models/effects/Recorder/Recorder";
import { computed, ref, triggerRef, watch } from "vue";

export default function useRecorder(recorder: Recorder) {
	const recorderRef = ref<Recorder>(recorder);

	const recordingRef = computed(() => {
		return recorderRef.value.recording;
	});

	const audioRef = computed(() => {
		if (!recordingRef.value) return;

		return recordingRef.value.audioNode;
	});

	//Necessary in order to trigger a render when the audio finishes BY ITSELF
	watch(audioRef, newAudio => {
		if (newAudio instanceof HTMLAudioElement) {
			newAudio.onpause = () => {
				console.log("triggering");
				triggerRef(recordingRef);
			};
		}
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

	async function playAudio() {
		if (!recordingRef.value) return;

		await recordingRef.value.playAudio();
		triggerRef(recordingRef);
	}

	function pauseAudio() {
		if (!recordingRef.value) return;

		recordingRef.value.pauseAudio();
		triggerRef(recordingRef);
	}

	async function restartAudio() {
		if (!recordingRef.value) return;

		await recordingRef.value.restartAudio();
		triggerRef(recordingRef);
	}

	function downloadTrack(name: string = "") {
		if (!recordingRef.value) return;

		const a = document.createElement("a");
		a.href = recordingRef.value.getRecordingUrl();
		a.download = name;
		a.click();
	}

	return {
		startRecording,
		stopRecording,
		playAudio,
		restartAudio,
		pauseAudio,
		downloadTrack,
		audioRef,
		recorderState,
		recorderRef,
		recordingRef,
	};
}
