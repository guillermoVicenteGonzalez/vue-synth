import { default as AudioRecorder, default as Recorder } from "./Recorder";
import type Recording from "./Recording";

const MAX_RECORDER_SLOTS = 4;

export default class RecorderCluster {
	public slots: Recorder[] = [];

	constructor(source: AudioNode, context: AudioContext) {
		for (let i = 0; i < MAX_RECORDER_SLOTS; i++) {
			const recorder = new Recorder(source, context);
			this.slots.push(recorder);
		}
	}

	get recordings(): Recording[] {
		return this.slots
			.map(slot => slot.recording)
			.filter(recording => recording != null);
	}

	public async playAll() {
		await Promise.all(this.recordings.map(recording => recording.playAudio()));
	}

	async pauseAll() {
		this.recordings.forEach(recording => recording.pauseAudio());
	}

	public clearRecording() {
		this.slots.forEach(recording => {
			recording.clearRecording();
		});
	}

	public async mixRecordings() {
		const sampleRate = 44000;
		if (this.recordings.length == 0) return;

		const biggestTrack = this.recordings.sort(
			(a, b) => b.duration - a.duration
		)[0];

		const biggestLength = (await biggestTrack.getAudioBuffer()).length;

		const offlineCtx = new OfflineAudioContext(
			this.recordings.length,
			biggestLength,
			sampleRate
		);

		await Promise.all(
			this.recordings.map(async recording => {
				const t = await recording.getAudioBufferSourceNode(offlineCtx);
				const gainNode = offlineCtx.createGain();
				gainNode.gain.value = recording.volume;
				t.connect(gainNode);
				gainNode.connect(offlineCtx.destination);
				t.start();
				return t;
			})
		);

		const renderedBuffer = await offlineCtx.startRendering();

		const tempCtx = new AudioContext();
		const mixBuffer = tempCtx.createBufferSource();
		mixBuffer.buffer = renderedBuffer;
		const recorder = new AudioRecorder(mixBuffer, tempCtx);

		const recordingUrl = await new Promise<string>((resolve, reject) => {
			recorder.start();
			mixBuffer.start();
			mixBuffer.onended = () => {
				recorder.stop().then(() => {
					if (recorder.recording) {
						const url = recorder.recording.getRecordingUrl();
						resolve(url);
					} else reject();
				});
			};
		});

		return recordingUrl;

		// const renderedBuffer = await offlineC;
	}
}
