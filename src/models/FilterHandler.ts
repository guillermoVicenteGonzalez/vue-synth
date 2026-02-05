import type AudioModule from "./AudioModule";

const DISABLED_TYPE: BiquadFilterType = "highpass";
const DISABLED_FREQ = 0;

export enum FilterTypes {
	lowpass = "lowpass",
	highpass = "highpass",
	bandpass = "bandpass",
	lowshelf = "lowshelf",
	highself = "highself",
	peaking = "peaking",
	notch = "notch",
	allpass = "allpass",
}

class FilterHandler {
	filter: BiquadFilterNode;
	module: AudioModule | null = null;
	private _disabled: boolean = false;

	//This 2 fields exist to be used alongside disabled
	private _frequency: number;
	private _type: BiquadFilterType;

	constructor(ctx: AudioContext) {
		this.filter = ctx.createBiquadFilter();
		this.type = this._type = "lowpass";
		this.cuttofFrequency = this._frequency = 200;
	}

	set cuttofFrequency(f: number) {
		if (this.disabled) return;

		this._frequency = f;
		this.filter.frequency.value = f;
	}

	get cuttofFrequency(): number {
		return this._frequency;
	}

	set type(t: BiquadFilterType) {
		if (this.disabled) return;

		this._type = t;
		this.filter.type = t;
	}

	get type(): BiquadFilterType {
		return this._type;
	}

	get disabled() {
		return this._disabled;
	}

	set disabled(d: boolean) {
		this._disabled = d;
		if (this._disabled) this.disableModule();
		else this.enableModule();
	}

	attachModule(m: AudioModule) {
		this.detachModule();
		this.module = m;
		this.module.attachEffect(this.filter);
		this._disabled = false;
	}

	detachModule() {
		if (!this.module) return;

		this.module.detachEffect(this.filter);
		this.module = null;
	}

	private disableModule() {
		this.filter.type = DISABLED_TYPE;
		this.filter.frequency.value = DISABLED_FREQ;
	}

	private enableModule() {
		this.filter.type = this._type;
		this.filter.frequency.value = this._frequency;
	}
}

export default FilterHandler;
