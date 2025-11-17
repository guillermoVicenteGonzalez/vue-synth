export abstract class AudioEffect {
	declare exitNode: AudioNode;
	declare inputNode: AudioNode;
	private enabled: boolean = true;

	set disabled(d: boolean) {
		this.enabled = !d;
		if (this.enabled) this.onEnable();
		else this.onDisable();
	}

	get disabled(): boolean {
		return !this.enabled;
	}

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

	protected abstract onDisable(): void;

	protected abstract onEnable(): void;
}

export class MonoNodeEffect<T extends AudioNode> extends AudioEffect {
	declare exitNode: T;
	declare inputNode: T;

	constructor(node: T) {
		super();
		this.exitNode = node;
		this.inputNode = node;
	}

	declare protected onEnable: () => void;
	declare protected onDisable: () => void;
}
