import Recorder from "./Recorder";
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

	public async stopAll() {
		this.recordings.forEach(recording => recording.pauseAudio());
	}

	public mixRecordings() {
		if (this.recordings.length == 0) return;
	}
}
