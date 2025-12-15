// https://itnext.io/algorithmic-reverb-and-web-audio-api-e1ccec94621a

import { AudioEffect } from "./AudioEffect";
import { CombFilter, MAX_DAMPENING } from "./CombFilter";

const COMB_FILTER_N = 8;
const ALLPAS_FILTER_N = 4;
const FILTER_FREQUENCIES = [225, 556, 441, 341];
const COMB_FILTER_TUNINGS = [1557, 1617, 1491, 1422, 1277, 1356, 1188, 1116];
const SAMPLE_RATE = 44100;

export const MAX_REVERB_DAMPENING = MAX_DAMPENING;
export const MIN_DELAY = -100;
export const MAX_DELAY = 100;
export const DEFAULT_DELAY = 0;

export const MAX_REVERB_MIX = 100;
export const MIN_REVERB_MIX = 0;
const DEFAULT_MIX = 50;

export const MAX_REVERB_PRE_DELAY = 0.3;

const DEFAULT_ROOM_SIZE = 0.7;
const DEFAULT_DAMPENING = 350;
const DEFAULT_PRE_HIGH_CUT = 0;
const DEFAULT_PRE_LOW_CUT = 10000;
/**
 * This effect is based on Freeverb designed by Manfred Schroeder.
 */
export class ReverbEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;

	private wetGainNode: GainNode;
	private dryGainNode: GainNode;
	private preDelayNode: DelayNode;
	private preLowpassFilter: BiquadFilterNode;
	private preHighpassFilter: BiquadFilterNode;
	private combFilters: CombFilter[] = [];
	private filters: BiquadFilterNode[] = [];
	private splitter: ChannelSplitterNode;
	private merger: ChannelMergerNode;
	private _mix: number = DEFAULT_MIX;

	constructor(ctx: AudioContext) {
		super();

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.wetGainNode = ctx.createGain();
		this.dryGainNode = ctx.createGain();
		this.splitter = ctx.createChannelSplitter(2);
		this.merger = ctx.createChannelMerger(2);
		this.preDelayNode = ctx.createDelay();
		this.preLowpassFilter = ctx.createBiquadFilter();
		this.preHighpassFilter = ctx.createBiquadFilter();

		this.inputNode.connect(this.wetGainNode);
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.exitNode);
		this.wetGainNode.connect(this.preDelayNode);
		this.preDelayNode.connect(this.preLowpassFilter);
		this.preLowpassFilter.connect(this.preHighpassFilter);
		this.preHighpassFilter.connect(this.splitter);

		this.preHighpassFilter.type = "highpass";
		this.preLowpassFilter.type = "lowpass";

		this.initializeCombFilters(ctx);
		this.initializeAllpassFilters(ctx);

		this.resetEffect();
	}

	//mix
	set mix(m: number) {
		if (m > MAX_REVERB_MIX) this.mix = MAX_REVERB_MIX;
		if (m < MIN_REVERB_MIX) this.mix = MIN_REVERB_MIX;

		this._mix = m;

		this.wetGainNode.gain.value = this._mix / 100;
		this.dryGainNode.gain.value = (MAX_REVERB_MIX - this._mix) / 100;
	}

	get mix(): number {
		return this._mix;
	}

	//pre delay
	set preDelay(d: number) {
		if (d > MAX_REVERB_PRE_DELAY) this.preDelay = MAX_REVERB_PRE_DELAY;

		this.preDelayNode.delayTime.value = d;
	}

	get preDelay(): number {
		return this.preDelayNode.delayTime.value;
	}

	//pre low cut
	set preLowCut(l: number) {
		this.preLowpassFilter.frequency.value = l;
	}

	get preLowCut(): number {
		return this.preLowpassFilter.frequency.value;
	}

	set preHighCut(h: number) {
		this.preHighpassFilter.frequency.value = h;
	}

	get preHighCut(): number {
		return this.preHighpassFilter.frequency.value;
	}

	set roomSize(s: number) {
		this.combFilters.forEach((filter: CombFilter) => {
			filter.resonance = s;
		});
	}

	get roomSize(): number {
		if (this.combFilters.length == 0) {
			return -1;
		}

		return this.combFilters[0].resonance;
	}

	set dampening(d: number) {
		this.combFilters.forEach((filter: CombFilter) => {
			filter.dampening = d;
		});
	}

	get dampening(): number {
		if (this.combFilters.length == 0) return -1;
		return this.combFilters[0].dampening;
	}

	private initializeCombFilters(ctx: AudioContext) {
		const combs: CombFilter[] = [];

		if (!this.splitter || !this.merger) {
			console.error("Splitter and merger nodes need to be initialized");
			return [];
		}

		const half = COMB_FILTER_N / 2;

		for (let i = 0; i < COMB_FILTER_N; i++) {
			const node = new CombFilter(ctx);
			node.delay = COMB_FILTER_TUNINGS[i] / SAMPLE_RATE;

			try {
				if (i < half) {
					this.splitter.connect(node.inputNode, 0);
					node.connect(this.merger, 0, 0);
				} else {
					this.splitter.connect(node.inputNode, 1);
					node.connect(this.merger, 0, 1);
				}

				combs.push(node);
			} catch (err) {
				console.error(err);
			}
		}

		this.combFilters = combs;
	}

	private initializeAllpassFilters(ctx: AudioContext) {
		const filters: BiquadFilterNode[] = [];

		if (!this.merger) {
			console.error("Merger node needs to be initialized");
			return;
		}

		if (!this.exitNode) {
			console.error("Exit node needs to be initialized");
			return;
		}

		for (let i = 0; i < ALLPAS_FILTER_N; i++) {
			const filter = ctx.createBiquadFilter();
			filter.type = "allpass";
			filter.frequency.value = FILTER_FREQUENCIES[i];
			filters.push(filter);
		}

		if (filters.length != ALLPAS_FILTER_N) {
			console.error("Some error ocurred trying to create the Effect");
			return;
		}

		filters.forEach(
			(filter: BiquadFilterNode, index: number, arr: BiquadFilterNode[]) => {
				if (index == arr.length - 1) return;

				try {
					filter.connect(arr[index + 1]);
				} catch (err) {
					console.error(err);
				}
			}
		);

		try {
			this.merger.connect(filters[0]);
			filters[filters.length - 1].connect(this.exitNode);
		} catch (err) {
			console.error(err);
		}

		this.filters = filters;
	}

	public getWetSignalNode(): AudioNode | null {
		if (!this.filters || this.filters.length == 0) return null;

		return this.filters[this.filters.length - 1];
	}

	public getDrySignalNode(): AudioNode {
		return this.dryGainNode;
	}

	protected onDisable(): void {
		try {
			this.dryGainNode.gain.value = 1;
			this.wetGainNode.gain.value = 0;
			this.inputNode.disconnect(this.wetGainNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected onEnable(): void {
		try {
			this.mix = this._mix;
			this.inputNode.connect(this.wetGainNode);
		} catch (err) {
			console.error(err);
		}
	}

	protected resetEffect(): void {
		this.roomSize = DEFAULT_ROOM_SIZE;
		this.dampening = DEFAULT_DAMPENING;
		this.preDelay = DEFAULT_DELAY;
		this._mix = DEFAULT_MIX;
		this.preLowCut = DEFAULT_PRE_LOW_CUT;
		this.preHighCut = DEFAULT_PRE_HIGH_CUT;
	}
}
