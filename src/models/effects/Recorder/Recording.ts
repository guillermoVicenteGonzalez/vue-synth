export default class Recording {
	private volumeNode: GainNode;
	private mediaNode: MediaElementAudioSourceNode;
	private encodedAudio: Blob;
	private audioNode: HTMLAudioElement;
	private ctx: AudioContext;

	constructor(encodedAudio: Blob, context: AudioContext) {
		this.volumeNode = context.createGain();
		this.encodedAudio = encodedAudio;

		this.audioNode = new Audio();
		this.audioNode.src = this.getRecordingUrl();
		this.mediaNode = context.createMediaElementSource(this.audioNode);

		this.mediaNode.connect(this.volumeNode);
		this.volumeNode.connect(context.destination);
		this.ctx = context;
	}

	set loops(l: boolean) {
		this.audioNode.loop = l;
	}

	get loops() {
		return this.audioNode.loop;
	}

	set volume(v: number) {
		this.volumeNode.gain.value = v;
	}

	get volume() {
		return this.volumeNode.gain.value;
	}

	public getRecordingUrl() {
		return window.URL.createObjectURL(this.encodedAudio);
	}

	public playAudio() {
		if (this.audioNode.readyState) this.audioNode.play();
	}

	public pauseAudio() {
		this.audioNode.pause();
	}

	public restartAudio() {
		this.audioNode.pause();
	}

	public async getAudioBuffer(): Promise<AudioBuffer> {
		const fr = new FileReader();

		const audioBuffer = await new Promise<AudioBuffer>(resolve => {
			fr.onloadend = () => {
				const arrayB = fr.result as ArrayBuffer;
				this.ctx.decodeAudioData(arrayB, a => {
					resolve(a);
				});
			};
			fr.readAsArrayBuffer(this.encodedAudio);
		});

		return audioBuffer;
	}

	public async getAudioBufferSourceNode(context: BaseAudioContext) {
		const buffer = await this.getAudioBuffer();
		const source = new AudioBufferSourceNode(context);
		source.buffer = buffer;
		source.loop = this.loops;
		return source;
	}
}
