export default class AudioRecorder {
	private destination: MediaStreamAudioDestinationNode;
	private recorder: MediaRecorder;
	private source: AudioNode | null;
	private chunks: Array<BlobPart> = [];
	private resolveStopPromise: () => void = () => {
		console.warn(
			"this method is empty and hasn't been overwritten by a Promise's resolve"
		);
	};
	result: Blob | null = null;

	constructor(audioSource: AudioNode, ctx: AudioContext) {
		this.source = audioSource;
		this.destination = ctx.createMediaStreamDestination();
		this.source.connect(this.destination);
		this.recorder = new MediaRecorder(this.destination.stream);

		this.recorder.ondataavailable = e => {
			this.onRecorderDataAvailable(e);
		};
		this.recorder.onstop = () => {
			this.onRecorderStop();
		};
	}

	get state() {
		return this.recorder.state;
	}

	public start() {
		this.recorder.start();
		console.log("Starting recorder");
	}

	public async stop() {
		const p = new Promise<void>(resolve => {
			this.resolveStopPromise = resolve;
		});
		this.recorder.stop();
		console.log("Stopping recorder");
		await p;
		console.log("This should go after on recorder stop");
		console.log(this.result);
	}

	private onRecorderDataAvailable(e: BlobEvent) {
		console.log("on recorder data available recording...");
		this.chunks.push(e.data);
		console.log(this.chunks);
	}

	private onRecorderStop() {
		console.warn("On recorder stop");
		const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
		this.chunks = [];
		this.result = blob;
		this.resolveStopPromise();
	}

	public getRecordingUrl() {
		if (!this.result) {
			console.error("No result");
			return;
		}
		return window.URL.createObjectURL(this.result);
	}
}
