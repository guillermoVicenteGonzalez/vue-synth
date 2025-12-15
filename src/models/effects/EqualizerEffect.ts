import { AudioEffect } from "./AudioEffect";

export const LOW_KEY_FREQ = 100;
export const MID_LOW_KEY_FREQ = 200;
export const MID_KEY_FREQ = 400;
export const MID_HIGH_KEY_FREQ = 800;
export const HIGH_KEY_FREQ = 1600;

export const EQUALIZER_MIN_GAIN = -40;
export const EQUALIZER_MAX_GAIN = 0;
const DEFAULT_EQUALIZER_GAIN = 0;

export default class Equalizer extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;

	private lowFilter: BiquadFilterNode;
	private midLowFilter: BiquadFilterNode;
	private midFilter: BiquadFilterNode;
	private midHighFilter: BiquadFilterNode;
	private highFilter: BiquadFilterNode;

	constructor(ctx: AudioContext) {
		super();

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();

		this.lowFilter = new BiquadFilterNode(ctx, {
			type: "lowshelf",
			frequency: LOW_KEY_FREQ,
		});
		this.midLowFilter = new BiquadFilterNode(ctx, {
			type: "peaking",
			frequency: MID_LOW_KEY_FREQ,
			Q: 3,
		});
		this.midFilter = new BiquadFilterNode(ctx, {
			type: "peaking",
			frequency: MID_KEY_FREQ,
			Q: 3,
		});
		this.midHighFilter = new BiquadFilterNode(ctx, {
			type: "peaking",
			frequency: MID_HIGH_KEY_FREQ,
			Q: 3,
		});
		this.highFilter = new BiquadFilterNode(ctx, {
			type: "highshelf",
			frequency: HIGH_KEY_FREQ,
		});

		this.inputNode.connect(this.lowFilter);
		this.lowFilter.connect(this.midLowFilter);
		this.midLowFilter.connect(this.midFilter);
		this.midFilter.connect(this.midHighFilter);
		this.midHighFilter.connect(this.highFilter);
		this.highFilter.connect(this.exitNode);

		this.lowGain =
			this.midLowGain =
			this.midGain =
			this.midHighGain =
			this.highGain =
				DEFAULT_EQUALIZER_GAIN;
	}

	set lowGain(g: number) {
		if (g < EQUALIZER_MIN_GAIN) this.lowGain = EQUALIZER_MIN_GAIN;
		if (g > EQUALIZER_MAX_GAIN) this.lowGain = EQUALIZER_MAX_GAIN;

		this.lowFilter.gain.value = g;
	}

	get lowGain() {
		return this.lowFilter.gain.value;
	}

	set midLowGain(g: number) {
		if (g < EQUALIZER_MIN_GAIN) this.midLowGain = EQUALIZER_MIN_GAIN;
		if (g > EQUALIZER_MAX_GAIN) this.midLowGain = EQUALIZER_MAX_GAIN;

		this.midLowFilter.gain.value = g;
	}

	get midLowGain() {
		return this.midLowFilter.gain.value;
	}

	set midGain(g: number) {
		if (g < EQUALIZER_MIN_GAIN) this.midGain = EQUALIZER_MIN_GAIN;
		if (g > EQUALIZER_MAX_GAIN) this.midGain = EQUALIZER_MAX_GAIN;

		this.midFilter.gain.value = g;
	}

	get midGain() {
		return this.midFilter.gain.value;
	}

	set midHighGain(g: number) {
		if (g < EQUALIZER_MIN_GAIN) this.midHighGain = EQUALIZER_MIN_GAIN;
		if (g > EQUALIZER_MAX_GAIN) this.midHighGain = EQUALIZER_MAX_GAIN;

		this.midHighFilter.gain.value = g;
	}

	get midHighGain() {
		return this.midHighFilter.gain.value;
	}

	set highGain(g: number) {
		if (g < EQUALIZER_MIN_GAIN) this.highGain = EQUALIZER_MIN_GAIN;
		if (g > EQUALIZER_MAX_GAIN) this.highGain = EQUALIZER_MAX_GAIN;

		this.highFilter.gain.value = g;
	}

	get highGain() {
		return this.highFilter.gain.value;
	}

	protected onDisable(): void {
		try {
			this.inputNode.disconnect(this.lowFilter);
			this.inputNode.connect(this.exitNode);
			this.highFilter.disconnect(this.exitNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected onEnable(): void {
		try {
			this.inputNode.connect(this.lowFilter);
			this.inputNode.disconnect(this.exitNode);
			this.highFilter.connect(this.exitNode);
		} catch (err) {
			console.error(err);
		}
	}
}
