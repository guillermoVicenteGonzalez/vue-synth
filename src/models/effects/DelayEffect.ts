import { AudioEffect } from "./AudioEffect";

const DEFAULT_DELAY = 0.6;

export default class DelayEffect extends AudioEffect {
	declare exitNode: AudioNode;
	declare inputNode: AudioNode;

	private effectGainNode: GainNode;
	private delayNode: DelayNode;
	private feedBackNode: GainNode;
	private wetGainNode: GainNode;

	constructor(ctx: AudioContext) {
		super();

		this.delayNode = ctx.createDelay();
		this.feedBackNode = ctx.createGain();
		this.effectGainNode = ctx.createGain();
		this.wetGainNode = ctx.createGain();

		this.inputNode = this.effectGainNode;
		this.exitNode = this.wetGainNode;

		this.inputNode.connect(this.exitNode);

		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.feedBackNode);
		this.feedBackNode.connect(this.exitNode);
		//connecting the feedback back to the delay creates a feedback loop WITHOUT using the input node
		this.feedBackNode.connect(this.delayNode);

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

	get feedback(): number {
		return this.feedBackNode.gain.value;
	}

	protected onDisable(): void {
		this.inputNode.disconnect(this.delayNode);
	}

	protected onEnable(): void {
		this.inputNode.connect(this.delayNode);
	}
}
