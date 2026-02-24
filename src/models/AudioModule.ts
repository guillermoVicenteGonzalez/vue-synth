import { FilterChain } from "./LinkedList";
import Wave from "./wave";

//for future scalability

//Remember it goes osc(maybe end) -> effects(end) -> gain -> exit

/**
 * Represents a basic audio source.
 * It has a wave that serves as its model
 * Then it has an input and exit nodes what will be attached at first
 * Effects will be attacked between input and exit.
 * SynthSource nodes (oscilladors) will be attached to input
 */
export default class AudioModule {
	name: string;
	wave: Wave;
	context: AudioContext;
	gainNode: GainNode; //should always be the last one before exit
	filters: FilterChain;
	input: AudioNode;
	exit: AudioNode; // Should be the merger or the ctx destination
	private _voices: number = 1;
	private _voicesDetune: number = 0;
	private max_voices: number = 20;
	private _disabled: boolean = false;

	/**
	 *
	 * @param {string} n: - name of the module
	 * @param {Wave} w - associated wave of the module ?
	 * @param {AudioContext} ctx - asociated context of the module
	 * @param {AudioNode} exit - Not the exit of the module but where the exit of the module goes
	 * * The gain node should always be the penultimate. This way effects are also affected by the gain
	 */
	constructor(
		name: string = "default",
		w: Wave,
		ctx: AudioContext,
		exit?: AudioNode
	) {
		this.name = name;
		this.wave = w;
		this.context = ctx;

		if (exit != null) this.exit = exit;
		else this.exit = this.context.destination;

		this.input = this.context.createWaveShaper();
		this.gainNode = this.context.createGain();
		this.input.connect(this.gainNode);
		this.gainNode.connect(this.exit);
		this.updateModule();

		this.filters = new FilterChain(this.input, this.gainNode);
		/**
			The input is
		*/
	}

	set voices(voicesNumber: number) {
		if (voicesNumber > this.max_voices) {
			this._voices = this.max_voices;
		}

		if (voicesNumber < 0) {
			this._voices = 0;
		}

		this._voices = voicesNumber;
	}

	get voices(): number {
		return this._voices;
	}

	set voicesDetune(detunePercentage: number) {
		if (detunePercentage > 100) this._voicesDetune = 100;
		if (detunePercentage < 0) this._voicesDetune = 0;
		this._voicesDetune = detunePercentage;
	}

	get voicesDetune(): number {
		return this._voicesDetune;
	}

	set disabled(d: boolean) {
		if (d === this.disabled) return;
		this._disabled = d;

		if (this.disabled) this.unplugModule();
		else this.plugModule();
	}

	get disabled() {
		return this._disabled;
	}

	/**
	takes the changes present in the wave model and updates the audio nodes accordingly
	*/
	updateModule() {
		this.gainNode.gain.setTargetAtTime(
			this.wave.getAmplitude() / 50,
			this.context.currentTime,
			0
		);
	}

	/**
	 * @param {BiquadFilterNode} nEffect
	 * Attaches an Audio effect node to the last effect of the chain
	 */
	attachEffect(nEffect: BiquadFilterNode) {
		return this.filters.append(nEffect);
	}

	/**
	 *
	 * @param effect - (optional) the specific effect to detach
	 * Detaches the specified effect from the effect chain.
	 * If the effect is the last one in the chain, the gain node becomes the end node
	 * If no effect is specified, the last one in the chain is detached
	 */
	detachEffect(effect?: BiquadFilterNode) {
		if (effect) return this.filters.detachNodeByValue(effect);
		else return this.filters.pop();
	}

	/**
	 * Connects again the input(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	unplugModule() {
		// this.input.disconnect(this.end);
		console.error("unpluging");
		try {
			this.gainNode.disconnect(this.exit);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Connects again the input(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	plugModule() {
		// this.input.connect(this.end);
		console.error("pluging");

		try {
			this.gainNode.connect(this.exit);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * @deprecated
	 * @param flag - defines wether the module is muted or unmuted
	 * Mutes the module by setting the gain to 0.
	 * When unmuting the module, the volume (gain) will just be set to half its max value
	 */
	toggleMute(flag?: boolean) {
		if (flag) this.gainNode.gain.value = 0;
		else this.gainNode.gain.value = this.wave.getAmplitude() / 50;
	}

	/**
	 * Handles the destruction of the module so no trash remains afterwards
	 */
	destroyModule() {
		//First we make sure everything is connected as its supposed
		if (!this.disabled) this.unplugModule();
		this.filters.clean();
	}

	/**
	 * @deprecated
	 * @param flag - decides if the module is activated or deactivated.
	 * "Disables" the module by disconnecting its source (input), so no audio related to this module is emitted
	 */
	toggleModule(flag: boolean) {
		if (this.disabled == flag) return;

		this.disabled = !flag;
		if (this.disabled) this.unplugModule();
		else this.plugModule();
	}

	/**
	 * This is used to quickly clone dispensable inputs taking the module's as a blueprint.
	 * It could be interesting to also return (or ask) for a constant source node so both are linked
	 * @param context - if not specified, the context of this module will be used
	 * @returns - OscillatorNode with the same properties as the one this module has
	 */
	cloneOscillator(context: AudioContext = this.context) {
		const nOsc = context.createOscillator();
		nOsc.frequency.setValueAtTime(this.wave.frequency, context.currentTime);
		nOsc.type = this.wave.form;

		nOsc.connect(this.input);
		nOsc.start();
		return nOsc;
	}

	resetModule() {
		this.wave = new Wave();
		this.updateModule();
	}
}
