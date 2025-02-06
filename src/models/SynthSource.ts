import type AudioCluster from "./AudioCluster";
import type Note from "./note";
import type Wave from "./wave";

/**
 * Represents the source of sound for a synthesiser.
 * It is composed of an oscillator and a gain node.
 */
export class SynthSource {
	gain: GainNode;
	osc: OscillatorNode;
	constantSource: ConstantSourceNode | null = null;
	outputNode: AudioNode;

	/**
	 * @param w - Wave object that will be used as reference
	 * @param ctx - Audio context where the synth source will be created
	 * @param output - Node where the output of the synth source will be connected to
	 */
	constructor(w: Wave, ctx: AudioContext, output: AudioNode) {
		const { oscillator, gain } = this.#createSynthSource(w, ctx);
		this.osc = oscillator;
		this.gain = gain;
		this.osc.start();
		this.outputNode = output;
		this.gain.connect(this.outputNode);
	}

	/**
	 * Creates the oscillator and gain nodes that are the core of the class
	 * @param w - A wave object that will be used as reference to create the oscillator
	 * @param ctx - The context in which the created synth source will be created
	 * @returns - {oscillator: OscillatorNode, gain:GainNode}
	 */
	#createSynthSource(w: Wave, ctx: AudioContext) {
		const osc = ctx.createOscillator();
		osc.frequency.setValueAtTime(w.frequency, ctx.currentTime);
		osc.type = w.form;

		const gainNode = ctx.createGain();
		osc.connect(gainNode);
		return { oscillator: osc, gain: gainNode };
	}

	setDetune(detune: number) {
		this.osc.detune.value = detune;
		console.log(this.osc.detune.value);
	}

	setConstantSource(source: ConstantSourceNode) {
		this.constantSource = source;
		this.constantSource.connect(this.gain);
	}

	delete() {
		this.osc.stop();
		this.osc.disconnect(this.gain);
		this.gain.disconnect(this.outputNode);
		this.constantSource?.disconnect(this.gain);
		this.constantSource = null;
	}
}

export class SynthModule {
	sources: SynthSource[];
	context: AudioContext;
	gainSource: ConstantSourceNode | null;
	audioCluster: AudioCluster;

	constructor(cluster: AudioCluster) {
		this.sources = [];
		this.context = cluster.context;
		this.gainSource = null;
		this.audioCluster = cluster;
	}

	/**
	 * Plays a note on the synth by creating a synth source for every audio module in the cluster and detuning it by the correct amount
	 * @param note - The note to be played
	 */
	play(note: Note) {
		this.gainSource = new ConstantSourceNode(this.context, {
			offset: 0,
		});
		this.sources = this.#createSynthSources(this.audioCluster);
		this.sources.forEach(source => {
			source.setDetune(note.detune);
		});
	}

	stop() {
		this.#deleteSources();
	}

	/**
	 * For every synth source currently playing, we invoke its delete method effectively disconnecting every osc, gain and constant source and eliminating any reference to them
	 */
	#deleteSources() {
		for (const source of this.sources) {
			source.delete();
		}

		this.sources = [];
	}

	#createSynthSources(cluster: AudioCluster) {
		const sources: SynthSource[] = [];
		for (const module of cluster.modules) {
			const synthSource = new SynthSource(
				module.wave,
				this.context,
				module.input
			);
			if (this.gainSource) synthSource.setConstantSource(this.gainSource);
			sources.push(synthSource);
		}

		return sources;
	}
}
