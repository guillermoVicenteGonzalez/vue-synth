import { LFO } from "../LFO";
import { AudioEffect } from "./AudioEffect";

export const MIN_WAH_MIX = 0;
export const MAX_WAH_MIX = 100;

export enum WahTypes {
	tremolo = "tremolo",
	auto = "auto wah",
}

export default class WahEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;

	private lfo: LFO;
	private delayNode: DelayNode;
	private filter: BiquadFilterNode;
	private wetGain: GainNode;
	private dryGain: GainNode;
	private _type: WahTypes = WahTypes.tremolo;
	private _delay: number = 0;
	private _mix: number = 50;

	constructor(ctx: AudioContext) {
		super();
		this.delayNode = ctx.createDelay();
		this.filter = ctx.createBiquadFilter();
		this.wetGain = ctx.createGain();
		this.dryGain = ctx.createGain();
		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.lfo = new LFO(ctx);

		this.filter.type = "bandpass";

		this.inputNode.connect(this.delayNode);
		this.delayNode.connect(this.dryGain);
		this.dryGain.connect(this.exitNode);

		this.inputNode.connect(this.filter);
		this.filter.connect(this.wetGain);
		this.wetGain.connect(this.exitNode);

		this.lfo.connect(this.filter.frequency);
	}

	set type(t: WahTypes) {
		if (this.disabled) return;
		if (t == this._type) return;

		if (this._type == WahTypes.auto) this.lfo.disabled = false;
		else this.lfo.disabled = true;
	}

	get type(): WahTypes {
		return this._type;
	}

	set cutoff(f: number) {
		if (this.disabled) return;

		this.filter.frequency.value = f;
	}

	get cutoff(): number {
		return this.filter.frequency.value;
	}

	set speed(s: number) {
		if (this.disabled) return;
		if (this.type == WahTypes.tremolo) return;

		this.lfo.frequency = s;
	}

	get speed() {
		return this.lfo.frequency;
	}

	set depth(d: number) {
		if (this.disabled) return;
		if (this.type == WahTypes.tremolo) return;

		this.lfo.amplitude = d;
	}

	get depth(): number {
		return this.lfo.amplitude;
	}

	set delay(d: number) {
		if (this.disabled) return;

		this.delayNode.delayTime.value = d;
		this._delay = d;
	}

	get delay() {
		return this._delay;
	}

	set mix(m: number) {
		if (this.disabled) return;

		if (m > MAX_WAH_MIX) this.mix = MAX_WAH_MIX;
		if (m < MIN_WAH_MIX) this.mix = MIN_WAH_MIX;

		this._mix = m;
		this.wetGain.gain.value = this._mix / 100;
		this.dryGain.gain.value = (MAX_WAH_MIX - this._mix) / 100;
	}

	get mix(): number {
		return this._mix;
	}

	protected onEnable(): void {
		this.delayNode.delayTime.value = 0;
		this.inputNode.disconnect(this.filter);
		this.dryGain.gain.value = 1;
	}

	protected onDisable(): void {
		this.delay = this.delay;
		this.inputNode.connect(this.filter);
		this.mix = this.mix;
	}
}
