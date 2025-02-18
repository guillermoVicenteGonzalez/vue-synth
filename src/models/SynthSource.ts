import type AudioCluster from "./AudioCluster";
import type { AudioEnvelope } from "./AudioEnvelope";
import type Note from "./note";
import type Wave from "./wave";

/**
 * Represents the source of sound for a synthesiser.
 * It is composed of an oscillator and a gain node.
 */
export class SynthSource {
	gain: GainNode;
	osc: OscillatorNode;
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

	delete() {
		this.osc.stop();
		this.osc.disconnect(this.gain);
		this.gain.disconnect(this.outputNode);
	}

	/**
	 * Plays a note and handles its envelope (attack, decay, sustain)
	 * @param attack - The time it take the note to ramp up to 1 gain
	 * @param decay - The time it takes the note to ramp down to sustain
	 * @param sustain - The value to sustain after the decay
	 */
	play(attack: number, decay: number, sustain: number) {
		//attack
		this.gain.gain.linearRampToValueAtTime(
			1,
			attack + this.context.currentTime
		);

		//decay
		this.gain.gain.linearRampToValueAtTime(
			sustain,
			attack + this.context.currentTime + decay
		);
	}

	/**
	 * Handles the release and posterior deletion of the synthSource.
	 * A timeout is created so that first, the note linearly reaches 0 gain and then, after release + 1 sec the delete method of this source is invoked.
	 * @param release - The time it takes the note to reach a gain (volume) of 0
	 */
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
	audioCluster: AudioCluster;
	envelope: AudioEnvelope = {
		attack: 0.2,
		decay: 0.4,
		sustain: 0.1,
		release: 1,
	};

	constructor(cluster: AudioCluster, envelope: AudioEnvelope | null = null) {
		this.sources = [];
		this.context = cluster.context;
		this.audioCluster = cluster;
		if (envelope) this.envelope = envelope;
	}

	/**
	 * Plays a note on the synth by creating a synth source for every audio module in the cluster and detuning it by the correct amount
	 * @param note - The note to be played
	 */
	play(note: Note) {
		this.sources = this.#createSynthSources(this.audioCluster, note);
		this.sources.forEach(source =>
			source.play(
				this.envelope.attack,
				this.envelope.decay,
				this.envelope.sustain
			)
		);
	}

	/**
	 * To be invoked when we want to stop playing a note
	 * invokes the release method of the synth source (handles release + disconnection) and resets the sources array so there are no references to the previous synth sources and they can be deleted by the garbage handler
	 */
	stop() {
		this.sources.forEach(source => {
			source.release(this.envelope.release);
		});
		this.sources = [];
	}

	/**
	 * Creates a synth source for every module in the passed cluster and tells it the note it has to play (in relation to each modules freq)
	 * @param cluster - The audio cluster containing the audio modules
	 * @param note - The note to play
	 * @returns sources - An array of SynthSource
	 */
	#createSynthSources(cluster: AudioCluster, note: Note) {
		const sources: SynthSource[] = [];
		for (const module of cluster.modules) {
			const synthSource = new SynthSource(
				module.wave,
				this.context,
				module.input
			);
			synthSource.setDetune(note.detune);
			sources.push(synthSource);
		}

		return sources;
	}
}
