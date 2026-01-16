export default class AudioRecorder {
	private destination: MediaStreamAudioDestinationNode;
	private recorder: MediaRecorder;
	private source: AudioNode | null;
	private chunks: Array<BlobPart> = [];
	private ctx: AudioContext;
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

		this.ctx = ctx;
	}

	get state() {
		return this.recorder.state;
	}

	public start() {
		this.recorder.start();
	}

	public async stop() {
		const p = new Promise<void>(resolve => {
			this.resolveStopPromise = resolve;
		});
		this.recorder.stop();
		await p;
	}

	private onRecorderDataAvailable(e: BlobEvent) {
		this.chunks.push(e.data);
	}

	private onRecorderStop() {
		console.log(this.chunks);
		const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
		console.log(blob);
		this.chunks = [];
		this.result = blob;
		this.resolveStopPromise();
	}

	public getRecordingUrl() {
		if (!this.result) {
			return;
		}
		return window.URL.createObjectURL(this.result);
	}

	public async getRecordingAudioBuffer() {
		if (!this.result) return null;

		let audioBuffer = this.ctx.createBuffer(
			2,
			this.ctx.sampleRate * 3,
			this.ctx.sampleRate
		);

		const fr = new FileReader();

		const p = new Promise<void>(resolve => {
			fr.onloadend = () => {
				const arrayB = fr.result as ArrayBuffer;
				this.ctx.decodeAudioData(arrayB, a => {
					audioBuffer = a;
				});
				resolve();
			};
		});

		fr.readAsArrayBuffer(this.result);
		await p;
		return audioBuffer;
	}

	public static mixAudio(tracks: AudioBuffer[], sampleRate: number) {
		if (!tracks) return null;

		const biggestLength = tracks.sort((a, b) => a.length - b.length)[0].length;

		const offlineCtx = new OfflineAudioContext(
			tracks.length,
			biggestLength,
			sampleRate
		);

		return offlineCtx;
	}
}
