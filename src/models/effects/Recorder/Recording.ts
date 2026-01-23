export type RecorderRecordingState = "Playing" | "Paused";

export default class Recording {
	private volumeNode: GainNode;
	private mediaNode: MediaElementAudioSourceNode;
	private encodedAudio: Blob;
	private audioNode: HTMLAudioElement;
	private ctx: AudioContext;
	//USING A GETTER BREAKS REACTIVITY :(
	public state: RecorderRecordingState;

	constructor(encodedAudio: Blob, context: AudioContext) {
		this.volumeNode = context.createGain();
		this.encodedAudio = encodedAudio;

		this.audioNode = new Audio();
		this.audioNode.src = this.getRecordingUrl();
		this.mediaNode = context.createMediaElementSource(this.audioNode);

		this.mediaNode.connect(this.volumeNode);
		this.volumeNode.connect(context.destination);
		this.ctx = context;

		this.state = "Paused";
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

	public async playAudio() {
		if (this.audioNode.readyState) {
			await this.audioNode.play();
			this.state = this.audioNode.paused ? "Paused" : "Playing";
		}
	}

	public pauseAudio() {
		this.audioNode.pause();
		this.state = this.audioNode.paused ? "Paused" : "Playing";
	}

	public restartAudio() {
		this.audioNode.pause();
		this.state = this.audioNode.paused ? "Paused" : "Playing";
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
