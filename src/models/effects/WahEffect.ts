import { LFO } from "../LFO";
import { AudioEffect } from "./AudioEffect";

export const MIN_WAH_MIX = 0;
export const MAX_WAH_MIX = 100;
const DEFAULT_WAH_MIX = 50;

export const MIN_WAH_DELAY = 0;
export const MAX_WAH_DELAY = 1;
const DEFAULT_WAH_DELAY = 0;

export const MIN_WAH_CUTOFF = 0;
export const MAX_WAH_CUTOFF = 24000;
const DEFAULT_WAH_CUTOFF = 0;

export const MIN_WAH_SPEED = 0;
export const MAX_WAH_SPEED = 10;
const DEFAULT_WAH_SPEED = 5;

export const MIN_WAH_DEPTH = 0;
export const MAX_WAH_DEPTH = 1000000;
const DEFAULT_WAH_DEPTH = 1000000;

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
	private _mix: number = DEFAULT_WAH_MIX;

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

		this.mix = DEFAULT_WAH_MIX;
		this.delay = DEFAULT_WAH_DELAY;
		this.cutoff = DEFAULT_WAH_CUTOFF;
		this.speed = DEFAULT_WAH_SPEED;
		this.depth = DEFAULT_WAH_DEPTH;

		this.lfo.connect(this.filter.frequency);
		// this.lfo.connect(this.wetGain.gain);
	}

	set type(t: WahTypes) {
		if (this.disabled) return;
		if (t == this._type) return;

		if (this._type == WahTypes.auto) this.lfo.disabled = false;
		else this.lfo.disabled = true;

		this._type = t;
	}

	get type(): WahTypes {
		return this._type;
	}

	set cutoff(f: number) {
		if (this.disabled) return;

		if (f > MAX_WAH_CUTOFF) this.cutoff = MAX_WAH_CUTOFF;
		if (f < MIN_WAH_CUTOFF) this.cutoff = MIN_WAH_CUTOFF;

		this.filter.frequency.value = f;
	}

	get cutoff(): number {
		return this.filter.frequency.value;
	}

	set speed(s: number) {
		// if (this.disabled) return;
		// if (this.type == WahTypes.tremolo) return;

		// if (s > MAX_WAH_SPEED) this.cutoff = MAX_WAH_SPEED;
		// if (s < MIN_WAH_SPEED) this.speed = MIN_WAH_SPEED;

		this.lfo.frequency = s;
	}

	get speed() {
		return this.lfo.frequency;
	}

	set depth(d: number) {
		// if (this.disabled) return;
		// if (this.type == WahTypes.tremolo) return;

		// if (d > MAX_WAH_DEPTH) this.cutoff = MAX_WAH_DEPTH;
		// if (d < MIN_WAH_DEPTH) this.cutoff = MIN_WAH_DEPTH;

		this.lfo.amplitude = d;
	}

	get depth(): number {
		return this.lfo.amplitude;
	}

	set delay(d: number) {
		if (this.disabled) return;

		if (d > MAX_WAH_DELAY) this.cutoff = MAX_WAH_DELAY;
		if (d < MIN_WAH_DELAY) this.cutoff = MIN_WAH_DELAY;

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
