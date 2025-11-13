import type AudioModule from "./AudioModule";

// class FilterHandler {
// 	private interalType: BiquadFilterType;
// 	private internalFrequency: number;
// 	node?: BiquadFilterNode;
// 	module: AudioModule | null = null;

// 	constructor(type: BiquadFilterType, cutFreq: number) {
// 		this.cutoffFrequency = cutFreq;
// 		this.interalType = type;
// 		this.internalFrequency = cutFreq;
// 	}

// 	getNode() {
// 		return this.node;
// 	}

// 	setNode(n_node: BiquadFilterNode) {
// 		this.node = n_node;
// 	}

// 	set cutoffFrequency(freq: number) {
// 		this.internalFrequency = freq;
// 		if (this.node == null) return;
// 		this.node.frequency.setTargetAtTime(
// 			this.cutoffFrequency,
// 			this.node.context.currentTime,
// 			0
// 		);
// 	}

// 	get cutoffFrequency() {
// 		return this.internalFrequency;
// 	}

// 	set type(n_type: BiquadFilterType) {
// 		this.interalType = n_type;
// 		if (this.node == null) return;
// 		this.node.type = this.interalType;
// 	}

// 	get type() {
// 		return this.interalType;
// 	}
// }

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

	constructor(ctx: AudioContext) {
		this.filter = ctx.createBiquadFilter();
		this.type = "lowpass";
		this.cuttofFrequency = 200;
	}

	set cuttofFrequency(f: number) {
		this.filter.frequency.value = f;
	}

	get cuttofFrequency(): number {
		return this.filter.frequency.value;
	}

	set type(t: BiquadFilterType) {
		this.filter.type = t;
	}

	get type(): BiquadFilterType {
		return this.filter.type;
	}

	attachModule(m: AudioModule) {
		this.detachModule();
		this.module = m;
		this.module.attachEffect(this.filter);
	}

	detachModule() {
		if (!this.module) return;

		this.module.detachEffect(this.filter);
		this.module = null;
	}
}

export default FilterHandler;
