import { AudioEffect } from "./AudioEffect";

const DISABLED_TYPE: BiquadFilterType = "highpass";
const DISABLED_FREQ = 0;

export class FilterEffect extends AudioEffect {
	declare exitNode: BiquadFilterNode;
	declare inputNode: BiquadFilterNode;

	private internalFrequency: number;
	private internalType: BiquadFilterType;

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createBiquadFilter();
		this.inputNode = this.exitNode;

		this.internalFrequency = this.exitNode.frequency.value;
		this.internalType = this.exitNode.type;
	}

	set frequency(f: number) {
		if (this.disabled) return;

		this.exitNode.frequency.value = f;
		this.internalFrequency = f;
	}

	get frequency() {
		return this.internalFrequency;
	}

	set type(t: BiquadFilterType) {
		if (this.disabled) return;

		this.exitNode.type = t;
		this.internalType = t;
	}

	get type(): BiquadFilterType {
		return this.internalType;
	}

	protected onDisable(): void {
		this.exitNode.type = DISABLED_TYPE;
		this.exitNode.frequency.value = DISABLED_FREQ;
	}

	protected onEnable(): void {
		this.exitNode.type = this.internalType;
		this.exitNode.frequency.value = this.internalFrequency;
	}

	resetEffect(): void {
		this.frequency = 0;
	}
}
