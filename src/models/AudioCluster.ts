import AudioModule from "./AudioModule";
import { EffectChain } from "./LinkedList";
import type { waveForms } from "./wave";
import Wave from "./wave";

const MAX_MODULES = 5;
/**
 * The main module of the synth app. Contains a series of audio modules
 */
export default class AudioCluster {
	modules: AudioModule[];
	exit: AudioNode;
	compressor: DynamicsCompressorNode; //links all the audio modules. Is connected to global effects
	gain: GainNode; //the gain of the module is connected to the global exit
	context: AudioContext;
	effects: EffectChain;

	constructor(context: AudioContext, exit: AudioNode) {
		this.context = context;
		this.gain = this.context.createGain();
		this.compressor = this.context.createDynamicsCompressor();

		this.modules = [];
		this.exit = exit;

		//compressor and gain are linked here
		this.effects = new EffectChain(this.compressor, this.gain);
		this.gain.connect(this.exit);
	}

	setExit(nExit: AudioNode) {
		this.gain.disconnect(this.exit);
		this.exit = nExit;
		this.gain.connect(this.exit);
	}

	createModule(name: string, waveForm: keyof typeof waveForms) {
		if (this.modules.length >= MAX_MODULES) return null;
		const nWave = new Wave(10, 440, 0);
		nWave.setForm(waveForm);
		const nModule = new AudioModule(name, nWave, this.context, this.compressor);
		this.modules.push(nModule);
		return nModule;
	}

	deleteModuleByIndex(index: number) {
		const deleted = this.modules.splice(index, 1)[0];
		deleted.destroyModule();
		return deleted;
	}

	deleteModule(module: AudioModule) {
		const moduleIndex = this.modules.indexOf(module);
		return this.deleteModuleByIndex(moduleIndex);
	}
}
