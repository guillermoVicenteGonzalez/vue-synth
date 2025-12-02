import { AudioEffect } from "./AudioEffect";
import { CombFilter } from "./CombFilter";

const COMB_FILTER_N = 8;
// const ALLPAS_FILTER_N = 4;

/**
 * This effect is based on Freeverb designed by Manfred Schroeder.
 */
export class ReverbEffect extends AudioEffect {
	declare inputNode: AudioNode;
	declare exitNode: AudioNode;

	private wetGain: GainNode;
	private dryGain: GainNode;
	private combFilters: CombFilter[];
	private filters: BiquadFilterNode[];
	private splitter: ChannelSplitterNode;
	private merger: ChannelMergerNode;

	constructor(ctx: AudioContext) {
		super();

		this.inputNode = ctx.createGain();
		this.exitNode = ctx.createGain();
		this.wetGain = ctx.createGain();
		this.dryGain = ctx.createGain();
		this.splitter = ctx.createChannelSplitter();
		this.merger = ctx.createChannelMerger();
	}

	private initializeCombFilters(ctx: AudioContext): CombFilter[] {
		if (!this.splitter || !this.merger) {
			console.error("Splitter and merger nodes need to be initialized");
			return [];
		}

		const half = COMB_FILTER_N / 2;

		for (let i = 0; i < COMB_FILTER_N; i++) {
			const node = new CombFilter(ctx);
			try {
				if (i < half) {
					this.splitter.connect(node.inputNode, 0);
					// node.connect()
				} else {
					this.splitter.connect(node.inputNode, 1);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	private initializeAllpassFilters(): BiquadFilter[] {}

	protected onDisable(): void {}

	protected onEnable(): void {}
}
