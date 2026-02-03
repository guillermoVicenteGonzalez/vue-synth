import Recording from "./Recording";
const MIME_TYPE = "audio/mpeg";

export default class AudioRecorder {
	private destination: MediaStreamAudioDestinationNode;
	private recorder: MediaRecorder;
	/**
	 * The AudioNode source whose sound will be recorded
	 */
	private source: AudioNode | null;
	private chunks: Array<BlobPart> = [];
	private ctx: AudioContext;
	public recording: Recording | null = null;

	private resolveStopPromise: () => void = () => {
		console.warn(
			"this method is empty and hasn't been overwritten by a Promise's resolve"
		);
	};

	constructor(audioSource: AudioNode, ctx: AudioContext) {
		this.source = audioSource;
		this.destination = ctx.createMediaStreamDestination();
		this.source.connect(this.destination);
		this.recorder = new MediaRecorder(this.destination.stream);

		this.recorder.ondataavailable = e => {
			this.onRecorderDataAvailable(e);
		};
		this.recorder.onstop = () => {
			try {
				this.onRecorderStop();
			} catch (err) {
				console.error(err);
				this.onRecorderFailed();
			}
		};

		this.ctx = ctx;
	}

	get state() {
		return this.recorder.state;
	}

	public start() {
		this.recorder.start();
	}

	/**
	 * Stops the recording and waits for the result asynchronously by creating a promise that is resolved by `onRecorderStop`
	 */
	public async stop() {
		const p = new Promise<void>(resolve => {
			this.resolveStopPromise = resolve;
		});
		this.recorder.stop();
		await p;
	}

	public clearRecording() {
		if (this.recording == null) return;

		this.recording.pauseAudio();
		this.recording = null;
	}

	private onRecorderDataAvailable(e: BlobEvent) {
		this.chunks.push(e.data);
	}

	private onRecorderStop() {
		// const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
		const blob = new Blob(this.chunks, { type: MIME_TYPE });

		if (blob.size == 0) {
			throw new Error("No audio was recorded");
		}
		this.chunks = [];
		this.recording = new Recording(blob, this.ctx);
		this.resolveStopPromise();
	}

	private onRecorderFailed() {
		this.chunks = [];
		this.resolveStopPromise();
	}

	public loadRecording(file: Blob) {
		const r = new Recording(file, this.ctx);
		this.recording = r;
	}
}
