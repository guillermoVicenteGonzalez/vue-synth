import { AudioEffect } from "./AudioEffect";

export class CompressionEffect extends AudioEffect {
	declare exitNode: DynamicsCompressorNode;
	declare inputNude: DynamicsCompressorNode;

	set attack(a: number) {
		this.exitNode.attack.value = a;
	}

	get attack(): number {
		return this.exitNode.attack.value;
	}

	set threshold(t: number) {
		this.exitNode.threshold.value = t;
	}

	get threshold(): number {
		return this.exitNode.threshold.value;
	}

	set ratio(r: number) {
		this.exitNode.ratio.value = r;
	}

	get ratio(): number {
		return this.exitNode.ratio.value;
	}

	set knee(k: number) {
		this.exitNode.knee.value = k;
	}

	get knee(): number {
		return this.exitNode.knee.value;
	}

	get reduction(): number {
		return this.exitNode.reduction;
	}

	get release() {
		return this.exitNode.release;
	}

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createDynamicsCompressor();
		this.inputNode = this.exitNode;
	}
}
