export class CompressionEffectHandler {
	compressor: DynamicsCompressorNode;
	threshold: number;
	ratio: number;
	knee: number;
	reduction: number;
	attack: number;
	release: number;

	constructor(ctx: AudioContext) {
		this.compressor = ctx.createDynamicsCompressor();

		//This is done fore future tinkering, although it is redundant now
		this.threshold = this.compressor.threshold.value;
		this.ratio = this.compressor.ratio.value;
		this.knee = this.compressor.knee.value;
		this.reduction = this.compressor.reduction;
		this.attack = this.compressor.attack.value;
		this.release = this.compressor.release.value;
	}

	disable() {}
}
