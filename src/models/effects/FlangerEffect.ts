import { LFO } from "../LFO";
import { AudioEffect } from "./AudioEffect";

const DEFAULT_GAIN = 1;

export class FlangerEffect extends AudioEffect {
	declare inputNode: AudioNode; //=> effectGain
	declare exitNode: AudioNode; //=> wetGain

	private effectGain: GainNode;
	private lfo: LFO;
	private delayNode: DelayNode;
	private wetGainNode: GainNode;
	private feedbackNode: GainNode;

	private internalEffectGain: number;

	constructor(ctx: AudioContext) {
		super();

		//Node creation
		this.lfo = new LFO(ctx);
		this.delayNode = ctx.createDelay();

		this.effectGain = ctx.createGain();
		this.wetGainNode = ctx.createGain();
		this.feedbackNode = ctx.createGain();

		this.exitNode = this.wetGainNode;
		this.inputNode = this.effectGain;

		//Set the main gain
		this.internalEffectGain = this.effectGain.gain.value;

		//Pipelines creation
		//Original signal withouth modification
		this.inputNode.connect(this.exitNode);

		//delayed signal
		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.exitNode);

		//feedback signal
		this.delayNode.connect(this.feedbackNode);
		this.feedbackNode.connect(this.inputNode);

		//lfo that oscillates delay
		this.lfo.connect(this.delayNode.delayTime);
	}

	//controla el delay del delayNode duh
	set delay(d: number) {
		if (this.disabled) return;
		this.delayNode.delayTime.value = d;
	}

	get delay(): number {
		return this.delayNode.delayTime.value;
	}

	set depth(d: number) {
		if (this.disabled) return;
		this.effectGain.gain.value = d;
		this.internalEffectGain = d;
	}

	get depth(): number {
		return this.internalEffectGain;
	}

	/**
	 * Controls the feedback signal gain
	 */
	set feedback(f: number) {
		if (this.disabled) return;
		this.feedbackNode.gain.value = f;
	}

	get feedback() {
		return this.feedbackNode.gain.value;
	}

	set speed(s: number) {
		if (this.disabled) return;

		this.lfo.frequency = s;
	}

	get speed(): number {
		return this.lfo.frequency;
	}

	protected onDisable(): void {
		//we disconnect the delayed signal
		this.delayNode.disconnect(this.exitNode);

		//then we disconnect the feedback signal
		this.feedbackNode.disconnect(this.inputNode);

		//and reset the effect gain
		this.effectGain.gain.value = DEFAULT_GAIN;
	}

	protected onEnable(): void {}
}
