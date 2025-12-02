import { AudioEffect } from "./AudioEffect";

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
		this.effectGain.connect(this.inputNode);
	}

	set resonance(r: number) {
		this.effectGain.gain.value = r;
	}

	get resonance(): number {
		return this.effectGain.gain.value;
	}

	set dampening(d: number) {
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
}
