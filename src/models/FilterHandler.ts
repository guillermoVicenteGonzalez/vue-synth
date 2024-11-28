class FilterHandler {
	interalType: BiquadFilterType;
	internalFrequency: number;
	node?: BiquadFilterNode;

	constructor(type: BiquadFilterType, cutFreq: number) {
		this.cutoffFrequency = cutFreq;
		this.interalType = type;
		this.internalFrequency = cutFreq;
	}

	getNode() {
		return this.node;
	}

	setNode(n_node: BiquadFilterNode) {
		this.node = n_node;
	}

	set cutoffFrequency(freq: number) {
		this.internalFrequency = freq;
		if (this.node == null) return;
		this.node.frequency.setTargetAtTime(
			this.cutoffFrequency,
			this.node.context.currentTime,
			0
		);
	}

	get cutoffFrequency() {
		return this.internalFrequency;
	}

	set type(n_type: BiquadFilterType) {
		this.interalType = n_type;
		if (this.node == null) return;
		this.node.type = this.interalType;
	}

	get type() {
		return this.interalType;
	}
}

export default FilterHandler;
