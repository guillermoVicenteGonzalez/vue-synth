import { AudioEffect } from "./AudioEffect";

export class FilterEffect extends AudioEffect {
	declare exitNode: BiquadFilterNode;
	declare inputNode: BiquadFilterNode;

	constructor(ctx: AudioContext) {
		super();
		this.exitNode = ctx.createBiquadFilter();
		this.inputNode = this.exitNode;
	}
}
