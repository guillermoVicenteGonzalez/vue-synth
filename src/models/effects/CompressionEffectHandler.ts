export class CompressionEffectHandler {
	private compressor: DynamicsCompressorNode;

	set attack(a: number) {
		this.compressor.attack.value = a;
	}

	get attack(): number {
		return this.compressor.attack.value;
	}

	set threshold(t: number) {
		this.compressor.threshold.value = t;
	}

	get threshold(): number {
		return this.compressor.threshold.value;
	}

	set ratio(r: number) {
		this.compressor.ratio.value = r;
	}

	get ratio(): number {
		return this.compressor.ratio.value;
	}

	set knee(k: number) {
		this.compressor.knee.value = k;
	}

	get knee(): number {
		return this.compressor.knee.value;
	}

	get reduction(): number {
		return this.compressor.reduction;
	}

	get release() {
		return this.compressor.release;
	}

	constructor(compressor: DynamicsCompressorNode) {
		this.compressor = compressor;
		//This is done fore future tinkering, although it is redundant now
	}

	disable() {}
}
