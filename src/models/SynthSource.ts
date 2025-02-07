import type AudioCluster from "./AudioCluster";
import type { AudioEnveloppe } from "./AudioEnvelope";
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
	context: AudioContext;

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
		this.context = ctx;
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
		gainNode.gain.value = 0;
		osc.connect(gainNode);
		return { oscillator: osc, gain: gainNode };
	}

	setDetune(detune: number) {
		this.osc.detune.value = detune;
	}

	setConstantSource(source: ConstantSourceNode) {
		this.constantSource = source;
		this.constantSource.connect(this.gain.gain);
		// this.constantSource.start();
	}

	delete() {
		console.log("delete");
		this.osc.stop();
		this.osc.disconnect(this.gain);
		this.gain.disconnect(this.outputNode);
		this.constantSource?.disconnect();
		this.constantSource = null;
	}

	attack(attack: number) {
		this.gain.gain.linearRampToValueAtTime(
			1,
			attack + this.context.currentTime
		);
		console.log("attacking");
	}

	release(release: number) {
		this.gain.gain.cancelAndHoldAtTime(this.context.currentTime);
		this.gain.gain.linearRampToValueAtTime(
			0,
			release + this.context.currentTime
		);
		setTimeout(
			() => {
				this.delete();
			},
			release * 1000 + 1000
		);
	}
}

export class SynthModule {
	sources: SynthSource[];
	context: AudioContext;
	gainSource: ConstantSourceNode | null;
	audioCluster: AudioCluster;
	enveloppe: AudioEnveloppe = {
		attack: 1,
		decay: 0.5,
		sustain: 1,
		release: 0.2,
	};

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
		//maybe eliminate what was playing?
		this.#createSources(note);
		//attack
		// this.gainSource?.offset.linearRampToValueAtTime(
		// 	1,
		// 	this.context.currentTime + this.enveloppe.attack
		// );
		this.sources.forEach(source => source.attack(this.enveloppe.attack));
		//sustain

		//decay
	}

	stop() {
		//linear ramp para release
		// this.gainSource?.offset.linearRampToValueAtTime(
		// 	0,
		// 	this.context.currentTime + this.enveloppe.release
		// );
		// setTimeout(
		// 	() => {
		// 		this.#deleteSources();
		// 	},
		// 	this.enveloppe.release * 1000 + 2
		// );
		this.sources.forEach(source => {
			source.release(this.enveloppe.release);
		});
		// this.#deleteSources();
	}

	/**
	 * For every synth source currently playing, we invoke its delete method effectively disconnecting every osc, gain and constant source and eliminating any reference to them
	 */
	#deleteSources() {
		console.log("deleting");
		for (const source of this.sources) {
			source.delete();
		}

		this.gainSource?.disconnect();

		this.sources = [];
	}

	#createSources(note: Note) {
		this.gainSource = new ConstantSourceNode(this.context, {
			offset: 0,
		});
		this.gainSource.start();

		this.sources = this.#createSynthSources(this.audioCluster);
		this.sources.forEach(source => {
			source.setDetune(note.detune);
		});
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
