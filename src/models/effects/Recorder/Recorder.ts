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
		const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
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

		//CUIDADO CON DECODE AUDIO DATA

		const fr = new FileReader();

		const audioBuffer = await new Promise<AudioBuffer>(resolve => {
			fr.onloadend = () => {
				const arrayB = fr.result as ArrayBuffer;
				this.ctx.decodeAudioData(arrayB, a => {
					resolve(a);
				});
			};
			if (this.result != null) fr.readAsArrayBuffer(this.result);
		});

		// const source = new AudioBufferSourceNode(this.ctx);
		// source.buffer = audioBuffer;

		console.log("Returning audio buffer");
		return audioBuffer;
	}

	public static async mixAudio(tracks: AudioBuffer[], sampleRate: number) {
		if (!tracks) return null;

		const biggestTrack = tracks.sort((a, b) => b.duration - a.duration)[0];

		const offlineCtx = new OfflineAudioContext(
			tracks.length,
			biggestTrack.length,
			sampleRate
		);

		const entryPoint = offlineCtx.createGain();
		const sources: AudioBufferSourceNode[] = tracks.map(track => {
			const source = new AudioBufferSourceNode(offlineCtx);
			source.buffer = track;
			source.loop = true;
			source.connect(entryPoint);
			entryPoint.connect(offlineCtx.destination);
			source.start();
			return source;
		});

		console.log("sources");
		console.log(sources);

		const renderedBuffer = await offlineCtx.startRendering();
		console.log(renderedBuffer);

		const tempCtx = new AudioContext();
		const mixBuffer = tempCtx.createBufferSource();
		mixBuffer.connect(tempCtx.destination);
		mixBuffer.buffer = renderedBuffer;
		const recorder = new AudioRecorder(mixBuffer, tempCtx);

		const t = await new Promise<string>((resolve, reject) => {
			recorder.start();
			mixBuffer.start();
			mixBuffer.onended = () => {
				recorder.stop().then(() => {
					const url = recorder.getRecordingUrl();
					if (url) resolve(url);
					else reject();
				});
			};
		});

		console.log(recorder.result);

		return t;
	}
}
