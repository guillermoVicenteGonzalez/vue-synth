export abstract class AudioEffect {
	declare exitNode: AudioNode;
	declare inputNode: AudioNode;

	connect(node: AudioNode | AudioEffect) {
		try {
			if (node instanceof AudioNode) this.exitNode.connect(node);
			else {
				this.exitNode.connect(node.inputNode);
			}
		} catch (err) {
			console.error(err);
		}
	}

	disconnect(node: AudioNode | AudioEffect) {
		try {
			if (node instanceof AudioNode) this.exitNode.disconnect(node);
			else this.exitNode.disconnect(node.inputNode);
		} catch (err) {
			console.error(err);
		}
	}

	disable() {}
}

export class MonoNodeEffect<T extends AudioNode> extends AudioEffect {
	declare exitNode: T;
	declare inputNode: T;

	constructor(node: T) {
		super();
		this.exitNode = node;
		this.inputNode = node;
	}
}
