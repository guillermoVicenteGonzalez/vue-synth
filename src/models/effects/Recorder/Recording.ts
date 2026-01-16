export default class Recording {
	private volumeNode: GainNode;
	private mediaNode: MediaElementAudioSourceNode;

	constructor(audio: HTMLAudioElement, context: AudioContext) {
		this.volumeNode = context.createGain();
		this.mediaNode = context.createMediaElementSource(audio);

		this.mediaNode.connect(this.volumeNode);
		this.volumeNode.connect(context.destination);
	}

	set volume(v: number) {
		this.volumeNode.gain.value = v;
	}

	get volume() {
		return this.volumeNode.gain.value;
	}
}
