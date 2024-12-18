import type Wave from "./wave";

//for future scalability
export type AudioEffect = AudioNode | BiquadFilterNode;

//Remember it goes osc(maybe end) -> effects(end) -> gain -> exit

export default class AudioModule {
	name: string;
	wave: Wave;
	context: AudioContext;
	gainNode: GainNode; //should always be the last one before exit
	effects: AudioNode[];
	oscillator: OscillatorNode;
	exit: AudioNode; //redundant?
	disabled: boolean;
	end: AudioNode; //* The last node in the "improvised" linked list. Always before gain

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

		this.effects = [];
		this.disabled = false;

		if (exit != null) this.exit = exit;
		else this.exit = this.context.destination;

		this.oscillator = this.context.createOscillator();
		this.gainNode = this.context.createGain();
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.exit);
		this.updateOscillator();
		this.oscillator.start();

		/**
			The oscillator is
		*/
		this.end = this.oscillator;
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
		console.log("\nattach");
		console.log("new effect");
		console.log(nEffect);
		console.log("current end");
		console.log(this.end);

		this.end.disconnect(this.gainNode);
		const previous = this.end;
		this.end.connect(nEffect);
		this.end = nEffect;

		console.log("previous end");
		console.log(previous);
		console.log("new end");
		console.log(this.end);

		this.end.connect(this.gainNode);
		this.effects.push(nEffect);
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
		console.log("\ndetach");
		console.log("current end");
		console.log(this.end);

		//if no effects => error
		if (this.effects.length == 0) {
			console.log("effects are empty");
			return;
		}

		//we get the index of the effect
		let index = this.effects.length - 1;
		if (effect != null) {
			index = this.effects.indexOf(effect);
			if (index == -1) {
				console.log("unable to find effect");
				console.log(this.effects);
				return;
			}
		}

		//if the effect is the last one or no parameter was passed
		if (index == this.effects.length - 1 || effect == null) {
			const detached = this.effects.pop();
			if (!detached) {
				console.log("unable to detach effect");
				return;
			}
			detached.disconnect(this.gainNode);

			//if there are effects remaining i connect the chain
			if (this.effects.length > 0) {
				this.end = this.effects[this.effects.length - 1];
				this.end.disconnect(detached);
				this.end.connect(this.gainNode);
				return;
			}

			//if it was the last effect => we connect the oscillator
			if (this.effects.length == 0) {
				this.end = this.oscillator;
				this.end.disconnect(detached);
				this.end.connect(this.gainNode);
				return;
			}
		}

		//if there is only one effect
		if (this.effects.length == 1) {
			const detached: AudioNode = this.effects.splice(index, 1)[0];
			this.end = this.oscillator;
			this.end.disconnect(detached);
			detached.disconnect(this.gainNode);
			this.end.connect(this.gainNode);
		}

		//if the effect was not the last one and there are more
		if (index != this.effects.length - 1 && effect != null) {
			this.effects[index].disconnect(this.effects[index + 1]);
			this.effects[index - 1].connect(this.effects[index + 1]);
			this.effects.splice(index, 1);
		}

		// //if no parameter or the effect passed is the last one.
		// if (effect == null || index >= this.effects.length - 1) {
		// 	const detached = this.effects.pop();
		// 	console.log("detached effect");
		// 	console.log(detached);
		// 	detached?.disconnect(this.gainNode);
		// 	//if no effects => the end node is the oscillator
		// 	if (this.effects.length > 0)
		// 		this.end = this.effects[this.effects.length - 1];
		// 	else {
		// 		console.log("no effects. The end is the osc");
		// 		this.end = this.oscillator;
		// 		this.end.connect(this.gainNode);
		// 	}
		// } else {
		// 	console.log("aqui no entro");
		// 	this.effects[index].disconnect(this.effects[index + 1]);
		// 	this.effects[index - 1].connect(this.effects[index + 1]);
		// 	this.effects.splice(index, 1);
		// }

		console.log("current end");
		console.log(this.end);
	}

	/**
	 *
	 * @param nExit - Audio node to become the new exit
	 * Sets a new exit node
	 */
	connectExit(nExit: AudioNode) {
		this.end.disconnect(this.exit);
		this.end.connect(nExit);
		this.exit = nExit;
	}

	/**
	 * disconnects the end node from the exit node
	 * Meant to work just like plugging or unplugging a cable from a speaker
	 */
	unplugExit() {
		this.end.disconnect(this.exit);
	}

	/**
	 * Connects again the end node of the module to the exit
	 * Meant to work just like plugging or unplugging a cable from a speaker
	 */
	//error handling?: If it is alredy connected????
	plugExit() {
		this.end.connect(this.exit);
	}

	/**
	 * Connects again the oscillator(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	unplugOscillator() {
		// this.oscillator.disconnect(this.end);
		this.end.disconnect(this.gainNode);
	}

	/**
	 * Connects again the oscillator(start) node of the module to the exit
	 * Meant to work just like plugging or unplugging the source from the amp/speaker
	 */
	plugOscillator() {
		// this.oscillator.connect(this.end);
		this.end.connect(this.gainNode);
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
