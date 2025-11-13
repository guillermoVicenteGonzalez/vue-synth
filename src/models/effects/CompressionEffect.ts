import { AudioEffect } from "./AudioEffect";

const MAX_ATTACK = 1;
const MAX_RATIO = 20;
const MAX_KNEE = 40;
const MAX_THRESHOLD = 0;

export class CompressionEffect extends AudioEffect {
	declare exitNode: DynamicsCompressorNode;
	declare inputNude: DynamicsCompressorNode;

	private localAttack: number;
	private localThreshold: number;
	private localKnee: number;
	private localRatio: number;

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createDynamicsCompressor();
		this.inputNode = this.exitNode;

		this.localAttack = this.attack;
		this.localKnee = this.knee;
		this.localRatio = this.ratio;
		this.localThreshold = this.threshold;
	}

	set attack(a: number) {
		if (this.disabled) return;
		this.exitNode.attack.value = a;
		this.localAttack = a;
	}

	get attack(): number {
		return this.exitNode.attack.value;
	}

	set threshold(t: number) {
		if (this.disabled) return;
		this.exitNode.threshold.value = t;
		this.localThreshold = t;
	}

	get threshold(): number {
		return this.exitNode.threshold.value;
	}

	set ratio(r: number) {
		if (this.disabled) return;
		this.exitNode.ratio.value = r;
		this.localRatio = r;
	}

	get ratio(): number {
		return this.exitNode.ratio.value;
	}

	set knee(k: number) {
		if (this.disabled) return;
		this.exitNode.knee.value = k;
		this.localKnee = k;
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

	protected onDisable() {
		this.exitNode.attack.value = MAX_ATTACK;
		this.exitNode.ratio.value = MAX_RATIO;
		this.exitNode.threshold.value = MAX_THRESHOLD;
		this.exitNode.knee.value = MAX_KNEE;
	}

	protected onEnable(): void {
		this.attack = this.localAttack;
		this.knee = this.localKnee;
		this.ratio = this.localRatio;
		this.threshold = this.localThreshold;
	}
}
