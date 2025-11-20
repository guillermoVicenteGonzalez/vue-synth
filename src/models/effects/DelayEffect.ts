import { AudioEffect } from "./AudioEffect";

const DEFAULT_DELAY = 0.3;
const DEFAULT_FEEDBACK = 0.4;

export default class DelayEffect extends AudioEffect {
	declare exitNode: AudioNode;
	declare inputNode: AudioNode;

	private effectGainNode: GainNode;
	private delayNode: DelayNode;
	private feedBackNode: GainNode;
	private wetGainNode: GainNode;
	//I use an aditional gain node to control the volume of the effect without affecting the feedback mitigation or the original wave
	private delayGain: GainNode;

	constructor(ctx: AudioContext) {
		super();

		this.delayNode = ctx.createDelay();
		this.feedBackNode = ctx.createGain();
		this.effectGainNode = ctx.createGain();
		this.wetGainNode = ctx.createGain();
		this.delayGain = ctx.createGain();

		this.inputNode = this.effectGainNode;
		this.exitNode = this.wetGainNode;

		this.inputNode.connect(this.exitNode);

		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.feedBackNode);
		this.delayNode.connect(this.delayGain);

		// this.feedBackNode.connect(this.exitNode);
		this.delayGain.connect(this.exitNode);
		//connecting the feedback back to the delay creates a feedback loop WITHOUT using the input node
		this.feedBackNode.connect(this.delayNode);

		this.rate = DEFAULT_DELAY;
		this.feedback = DEFAULT_FEEDBACK;
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

	set gain(g: number) {
		if (this.disabled) return;
		this.delayGain.gain.value = g;
	}

	get gain(): number {
		return this.delayGain.gain.value;
	}

	protected onDisable(): void {
		this.inputNode.disconnect(this.delayNode);
	}

	protected onEnable(): void {
		this.inputNode.connect(this.delayNode);
	}
}
