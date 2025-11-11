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

export class FilterEffect extends AudioEffect {
	declare exitNode: BiquadFilterNode;
	declare inputNode: BiquadFilterNode;

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createBiquadFilter();
		this.inputNode = this.exitNode;
	}
}

export class CompressionEffect extends AudioEffect {
	declare exitNode: DynamicsCompressorNode;
	declare inputNude: DynamicsCompressorNode;

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createDynamicsCompressor();
		this.inputNode = this.exitNode;
	}
}
