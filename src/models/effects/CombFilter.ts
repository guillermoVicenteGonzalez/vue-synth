import { AudioEffect } from "./AudioEffect";

export const MAX_RESONANCE = 0.95;
const DEFAULT_RESONANCE = 0.7;

export const MAX_DAMPENING = 24000;

export class CombFilter extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;
	private filterNode: BiquadFilterNode;
	private delayNode: DelayNode;
	private effectGain: GainNode;

	constructor(ctx: AudioContext) {
		super();
		this.inputNode = ctx.createGain();
		this.filterNode = ctx.createBiquadFilter();
		this.delayNode = ctx.createDelay();
		this.exitNode = ctx.createGain();
		this.effectGain = ctx.createGain();

		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.filterNode);
		this.filterNode.connect(this.effectGain);

		this.inputNode.connect(this.exitNode);
		this.effectGain.connect(this.inputNode); //This is where the feedback is

		this.resonance = DEFAULT_RESONANCE;
	}

	set resonance(r: number) {
		this.effectGain.gain.value = Math.min(r, MAX_RESONANCE);
	}

	get resonance(): number {
		return this.effectGain.gain.value;
	}

	set dampening(d: number) {
		if (d > MAX_DAMPENING) this.dampening = MAX_DAMPENING;
		this.filterNode.frequency.value = d;
	}

	get dampening(): number {
		return this.filterNode.frequency.value;
	}

	set filterType(t: BiquadFilterType) {
		this.filterNode.type = t;
	}

	get filterType(): BiquadFilterType {
		return this.filterNode.type;
	}

	set delay(d: number) {
		this.delayNode.delayTime.value = d;
	}

	get delay(): number {
		return this.delayNode.delayTime.value;
	}

	protected onDisable(): void {
		try {
			this.inputNode.disconnect(this.delayNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected onEnable(): void {
		try {
			this.inputNode.connect(this.delayNode);
		} catch (err) {
			console.error(err);
		}
	}

	resetEffect(): void {
		this.resonance = DEFAULT_RESONANCE;
	}
}
