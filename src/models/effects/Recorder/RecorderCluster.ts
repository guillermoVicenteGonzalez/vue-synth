import Recorder from "./Recorder";

const MAX_RECORDER_SLOTS = 4;

export default class RecorderCluster {
	public slots: Recorder[] = [];

	contructor(source: AudioNode, context: AudioContext) {
		for (let i = 0; i < MAX_RECORDER_SLOTS; i++) {
			const recorder = new Recorder(source, context);
			this.slots.push(recorder);
		}
	}
}
