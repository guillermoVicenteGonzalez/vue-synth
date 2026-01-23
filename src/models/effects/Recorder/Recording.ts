export type RecorderRecordingState = "Playing" | "Paused";

export default class Recording {
	private volumeNode: GainNode;
	private mediaNode: MediaElementAudioSourceNode;
	private encodedAudio: Blob;
	public audioNode: HTMLAudioElement;
	private ctx: AudioContext;
	//USING A GETTER BREAKS REACTIVITY :(
	testProp: boolean = false;

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

	get paused() {
		return this.audioNode.paused;
	}

	public getRecordingUrl() {
		return window.URL.createObjectURL(this.encodedAudio);
	}

	public async playAudio() {
		if (this.audioNode.readyState) {
			await this.audioNode.play();
		}
	}

	public pauseAudio() {
		this.audioNode.pause();
	}

	public async restartAudio() {
		this.audioNode.currentTime = 0;
		this.audioNode.pause();
		await this.audioNode.play();
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
