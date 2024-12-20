import { EffectChain } from "./LinkedList";
import type Wave from "./wave";

//for future scalability
export type AudioEffect = AudioNode | BiquadFilterNode;

//Remember it goes osc(maybe end) -> effects(end) -> gain -> exit

export default class AudioModule {
	name: string;
	wave: Wave;
	context: AudioContext;
	gainNode: GainNode; //should always be the last one before exit
	effects: EffectChain;
	oscillator: OscillatorNode;
	exit: AudioNode; //redundant?
	disabled: boolean;

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

		this.disabled = false;

		if (exit != null) this.exit = exit;
		else this.exit = this.context.destination;

		this.oscillator = this.context.createOscillator();
		this.gainNode = this.context.createGain();
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.exit);
		this.updateOscillator();
		this.oscillator.start();

		this.effects = new EffectChain(this.oscillator, this.gainNode);
		/**
			The oscillator is
		*/
	}

	/**
	takes the changes present in the wave model and updates the audio nodes accordingly
	*/
	updateOscillator() {
		this.oscillator.frequency.value = this.wave.getFrequency();
		this.oscillator.type = this.wave.getForm();
		this.gainNode.gain.setTargetAtTime(
			this.wave.getAmplitude() / 50,
			this.context.currentTime,
			0
		);
	}

	/**
	 * @param {AudioEffect} nEffect
	 * Attaches an Audio effect node to the last effect of the chain
	 */
	attachEffect(nEffect: AudioEffect) {
		return this.effects.append(nEffect);
	}

	/**
	 *
	 * @param effect - (optional) the specific effect to detach
	 * Detaches the specified effect from the effect chain.
	 * If the effect is the last one in the chain, the gain node becomes the end node
	 * If no effect is specified, the last one in the chain is detached
	 */
	//Ideally this would be a linked list.
	detachEffect(effect?: AudioEffect) {
		if (effect) return this.effects.detachNodeByValue(effect);
		else return this.effects.pop();
	}

	/**
	 *
	 * @param nExit - Audio node to become the new exit
	 * Sets a new exit node
	 */
	connectExit(nExit: AudioNode) {
		this.gainNode.disconnect(this.exit);
		this.gainNode.connect(nExit);
		this.exit = nExit;
	}

	/**
	 * disconnects the end node from the exit node
	 * Meant to work just like plugging or unplugging a cable from a speaker
	 */
	unplugExit() {
		this.gainNode.disconnect(this.exit);
	}

	/**
	 * Connects again the end node of the module to the exit
	 * Meant to work just like plugging or unplugging a cable from a speaker
	 */
	//error handling?: If it is alredy connected????
	plugExit() {
		this.gainNode.connect(this.exit);
	}

	/**
	 * Connects again the oscillator(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	unplugOscillator() {
		// this.oscillator.disconnect(this.end);
		this.gainNode.disconnect(this.gainNode);
	}

	/**
	 * Connects again the oscillator(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	plugOscillator() {
		// this.oscillator.connect(this.end);
		this.gainNode.connect(this.gainNode);
	}

	/**
	 *
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
		this.oscillator.stop();
		this.gainNode.disconnect(this.exit);
	}

	/**
	 *
	 * @param flag - decides if the module is activated or deactivated.
	 * "Disables" the module by disconnecting its source (oscillator), so no audio related to this module is emitted
	 */
	toggleModule(flag: boolean) {
		this.disabled = !flag;
		if (this.disabled) this.unplugOscillator();
		else this.plugOscillator();
	}
}
