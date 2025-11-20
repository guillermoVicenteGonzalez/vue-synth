import { AudioEffect } from "./AudioEffect";

const DEFAULT_DELAY = 0.6;

export default class DelayEffect extends AudioEffect {
	declare exitNode: AudioNode;
	declare inputNode: AudioNode;

	private effectGainNode: GainNode;
	private delayNode: DelayNode;
	private feedBackNode: GainNode;

	constructor(ctx: AudioContext) {
		super();

		this.delayNode = ctx.createDelay();
		this.feedBackNode = ctx.createGain();
		this.effectGainNode = ctx.createGain();

		this.inputNode = this.effectGainNode;
		this.exitNode = this.effectGainNode;

		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.feedBackNode);
		this.feedBackNode.connect(this.inputNode);

		this.rate = DEFAULT_DELAY;
	}

	set rate(d: number) {
		if (this.disabled) return;

		this.delayNode.delayTime.value = d;
	}

	get rate(): number {
		return this.delayNode.delayTime.value;
	}

	set feedback(f: number) {
		if (this.disabled) return;

		this.feedBackNode.gain.value = f;
	}

	protected onDisable(): void {
		this.inputNode.disconnect(this.delayNode);
	}

	protected onEnable(): void {
		this.inputNode.connect(this.delayNode);
	}
}
