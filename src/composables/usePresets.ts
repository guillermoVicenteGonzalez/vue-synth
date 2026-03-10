import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import AudioModule from "@/models/AudioModule";
import ChorusEffect from "@/models/effects/ChorusEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import DistortionEffect, {
	DistortionFilterPositions,
	DistortionFilterTypes,
	DistortionTypes,
} from "@/models/effects/DistortionEffect";
import Equalizer from "@/models/effects/EqualizerEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import WahEffect, { WahTypes } from "@/models/effects/WahEffect";
import FilterHandler from "@/models/FilterHandler";
import { LFO } from "@/models/LFO";
import type LFOHandler from "@/models/LFOHandler";
import { waveForms } from "@/models/wave";
import { ref } from "vue";
import useSynth, { type SynthEffects } from "./useSynth";

//TODO!: This would benefit a lot from UID use

/******************************************************************
 * CORE SYNTH PRESET DEFINITIONS
 ******************************************************************/

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EnvelopePreset extends AudioEnvelope {}
interface FilterPreset {
	frequency: number;
	type: BiquadFilterType;
	moduleIndex: number;
	disabled: boolean;
}

interface WavePreset {
	amplitude: number;
	frequency: number;
	form: waveForms;
}

interface ModulePreset {
	name: string;
	wave: WavePreset;
	disabled: boolean;
	voices: number;
	detune: number;
}

interface LFOPreset {
	wave: WavePreset;
	inputType: "module" | "filter" | "general" | null;
	inputIndex: number;
	propertyName: string | null;
	disabled: boolean;
}

export interface SynthPreset {
	name: string;
	modules: ModulePreset[];
	envelope: EnvelopePreset;
	filters: FilterPreset[];
	lfos: LFOPreset[];
	effects: SynthEffectsPreset;
}

interface PresetInput {
	cluster: AudioCluster;
	envelope: AudioEnvelope;
	filters: FilterHandler[];
	lfos: LFOHandler[];
	effects: SynthEffects;
}

/******************************************************************
 * EFFECTS PRESET DEFINITIONS
 ******************************************************************/

interface BaseEffectPreset {
	disabled: boolean;
}

interface CompressionEffectPreset extends BaseEffectPreset {
	attack: number;
	threshold: number;
	ratio: number;
	knee: number;
}

interface FilterEffectPreset extends BaseEffectPreset {
	frequency: number;
	type: BiquadFilterType;
}

interface DistortionEffectPreset extends BaseEffectPreset {
	mix: number;
	cuttoff: number;
	filterType: DistortionFilterTypes;
	filterPosition: DistortionFilterPositions;
	threshold: number;
	nBits: number;
	distortionType: DistortionTypes;
	drive: number;
}

interface DelayEffectPreset extends BaseEffectPreset {
	rate: number;
	feedback: number;
	gain: number;
}

interface FlangerEffectPreset extends BaseEffectPreset {
	depth: number;
	delay: number;
	feedback: number;
	speed: number;
}

interface ChorusEffectPreset extends BaseEffectPreset {
	amount: number;
	rate: number;
	delay1: number;
	delay2: number;
	filterType: BiquadFilterType;
	filterCuttof: number;
	mix: number;
	voices: number;
	feedbackDelay: number;
	feedback: number;
}

interface ReverbEffectPreset extends BaseEffectPreset {
	roomSize: number;
	dampening: number;
	preDelay: number;
	preHighCut: number;
	preLowCut: number;
	mix: number;
}

interface WahEffectPreset extends BaseEffectPreset {
	type: WahTypes;
	cutoff: number;
	speed: number;
	depth: number;
	delay: number;
	mix: number;
	lfoForm: waveForms;
}

interface EqualizerEffectPreset extends BaseEffectPreset {
	lowGain: number;
	midLowGain: number;
	midGain: number;
	midHighGain: number;
	highGain: number;
}

interface SynthEffectsPreset {
	compression: CompressionEffectPreset;
	filter: FilterEffectPreset;
	distortion: DistortionEffectPreset;
	delay: DelayEffectPreset;
	flanger: FlangerEffectPreset;
	chorus: ChorusEffectPreset;
	reverb: ReverbEffectPreset;
	wah: WahEffectPreset;
	equalizer: EqualizerEffectPreset;
}

export type PresetList = Record<string, SynthPreset>;

const STORE_NAME = "presetList";
const MAX_PRESETS = 20;
const MAX_PRESET_FILE_SIZE = 10000; //10kbytes

const DEFAULT_PRESET: SynthPreset = {
	name: "default",
	envelope: {
		attack: 0.2,
		decay: 0.4,
		sustain: 0.5,
		release: 0.2,
	},
	modules: [
		{
			name: "wave 0",
			wave: {
				amplitude: 10,
				frequency: 440,
				form: waveForms.sine,
			},
			disabled: false,
			detune: 0,
			voices: 1,
		},
	],
	filters: [
		{
			frequency: 200,
			type: "lowpass",
			moduleIndex: -1,
			disabled: false,
		},
	],
	lfos: [
		{
			wave: {
				amplitude: 1,
				frequency: 1,
				form: waveForms.sine,
			},
			disabled: false,
			inputType: null,
			inputIndex: -1,
			propertyName: null,
		},
		{
			wave: {
				amplitude: 1,
				frequency: 1,
				form: waveForms.sine,
			},
			disabled: false,
			inputType: null,
			inputIndex: -1,
			propertyName: null,
		},
		{
			wave: {
				amplitude: 1,
				frequency: 1,
				form: waveForms.sine,
			},
			disabled: false,
			inputType: null,
			inputIndex: -1,
			propertyName: null,
		},
		{
			wave: {
				amplitude: 1,
				frequency: 1,
				form: waveForms.sine,
			},
			disabled: false,
			inputType: null,
			inputIndex: -1,
			propertyName: null,
		},
	],
	effects: {
		chorus: {
			amount: 0.008,
			rate: 0.014,
			delay1: 0.003,
			delay2: 0.013,
			filterCuttof: 350,
			filterType: "allpass",
			mix: 50,
			disabled: true,
			voices: 6,
			feedback: 0.05000000074505806,
			feedbackDelay: 0.25,
		},
		compression: {
			attack: 0.003000000026077032,
			threshold: -24,
			disabled: false,
			knee: 30,
			ratio: 12,
		},
		delay: {
			disabled: true,
			feedback: 0.4000000059604645,
			gain: 1,
			rate: 0.30000001192092896,
		},
		distortion: {
			cuttoff: 350,
			disabled: true,
			distortionType: DistortionTypes.hardClip,
			drive: 1,
			filterPosition: DistortionFilterPositions.none,
			filterType: DistortionFilterTypes.highpass,
			mix: 50,
			nBits: 8,
			threshold: 0.1,
		},
		equalizer: {
			disabled: true,
			lowGain: 0,
			midGain: 0,
			midLowGain: 0,
			midHighGain: 0,
			highGain: 0,
		},
		filter: {
			disabled: true,
			frequency: 350,
			type: "lowpass",
		},
		flanger: {
			delay: 0.004999999888241291,
			depth: 0.002,
			feedback: 0.5,
			speed: 0.25,
			disabled: true,
		},
		reverb: {
			dampening: 350,
			disabled: true,
			preDelay: 0,
			preHighCut: 0,
			preLowCut: 10000,
			mix: 50,
			roomSize: 0.699999988079071,
		},
		wah: {
			type: WahTypes.auto,
			cutoff: 2000,
			disabled: true,
			speed: 1,
			delay: 0,
			depth: 2500,
			lfoForm: waveForms.sine,
			mix: 50,
		},
	},
} as const;

/******************************************************************
 * PRESET MODULE GENERATION
 ******************************************************************/

//We define the function redundantly and scale it later if necessary.
function generateEnvelopePreset(envelope: AudioEnvelope): EnvelopePreset {
	return envelope;
}

function loadEnvelopePreset(preset: EnvelopePreset): AudioEnvelope {
	return preset;
}

function generateClusterPreset(cluster: AudioCluster): ModulePreset[] {
	const modules: ModulePreset[] = cluster.modules.map(module => {
		return {
			name: module.name,
			wave: module.wave,
			disabled: false,
			detune: module.voicesDetune,
			voices: module.voices,
		};
	});

	//check duplicate names
	// const duplicateNames = modules
	// 	.map(module => module.name)
	// 	.filter((name, index, arr) => {
	// 		return arr.indexOf(name) != index;
	// 	});

	const names: string[] = [];
	for (let i = 0; i < modules.length; i++) {
		const name = modules[i].name;
		if (names.includes(name)) {
			const nameCount = names.reduce((acum, value) => {
				if (value == name) return acum + 1;
				else return acum;
			}, 0);
			modules[i].name = `${name} (${nameCount})`;
			names.push(name);
		} else {
			names.push(name);
		}
	}

	console.log(modules);
	return modules;
}

function loadClusterPreset(
	presets: ModulePreset[],
	ctx: AudioContext,
	output: AudioNode
): AudioCluster {
	const c = new AudioCluster(ctx, output);

	presets.forEach(({ name, detune, voices, wave }) => {
		const m = c.createModule(name, wave.form);
		if (m) {
			m.voices = voices;
			m.voicesDetune = detune;
			m.wave.frequency = wave.frequency;
			m.wave.amplitude = wave.amplitude;
		}
	});

	return c;
}

function generateFiltersPreset(
	filters: FilterHandler[],
	cluster: AudioCluster
): FilterPreset[] {
	return filters.map(filter => {
		const moduleIndex = filter.module
			? cluster.modules.indexOf(filter.module)
			: -1;

		return {
			frequency: filter.cuttofFrequency,
			type: filter.type,
			moduleIndex,
			disabled: false,
		};
	});
}

function loadFiltersPreset(
	preset: FilterPreset[],
	cluster: AudioCluster
): FilterHandler[] {
	return preset.map(({ type, disabled, frequency, moduleIndex }) => {
		const module =
			moduleIndex < cluster.modules.length
				? cluster.modules[moduleIndex]
				: null;

		const f = new FilterHandler(cluster.context);
		f.type = type;
		f.cuttofFrequency = frequency;
		f.disabled = disabled;
		if (module) f.attachModule(module);
		return f;
	});
}

//TODO: Module connection
//!!!! This is highly un-scalable. Heavy refactoring will be needed
function generateLFOPreset(
	lfos: LFOHandler[],
	cluster: AudioCluster,
	filters: FilterHandler[]
): LFOPreset[] {
	return lfos.map(handler => {
		const inputType: LFOPreset["inputType"] = ((
			module: LFOHandler["inputModule"]
		) => {
			if (module instanceof AudioModule) return "module";
			else if (module instanceof BiquadFilterNode) return "filter";
			else if (module instanceof AudioCluster) return "general";
			return null;
		})(handler.inputModule);

		const inputIndex = (() => {
			if (inputType == "module") {
				return cluster.modules.indexOf(handler.inputModule as AudioModule);
			}

			if (inputType == "filter")
				return filters
					.map(f => f.filter)
					.indexOf(handler.inputModule as BiquadFilterNode);

			return -1;
		})();

		return {
			wave: handler.lfo.wave,
			disabled: handler.lfo.disabled,
			inputType,
			inputIndex,
			propertyName: handler.propertyName,
		};
	});
}

//!! This was born deprecated. Heavy refactoring will be needed in the future.
function loadLFOPreset(
	preset: LFOPreset[],
	cluster: AudioCluster,
	filters: FilterHandler[]
): LFOHandler[] {
	return preset.map(
		({ disabled, inputIndex, inputType, propertyName, wave }) => {
			const lfo = new LFO(cluster.context);

			const inputModule: LFOHandler["inputModule"] = (() => {
				if (inputType == "filter") {
					if (inputIndex < filters.length) return filters[inputIndex].filter;
				}

				if (inputType == "module") {
					if (inputIndex < cluster.modules.length)
						return cluster.modules[inputIndex];
				}

				if (inputType == "general") {
					return cluster;
				}

				return null;
			})();

			if (inputModule instanceof AudioCluster) {
				lfo.connect(cluster.gain.gain);
			}

			if (inputModule instanceof BiquadFilterNode) {
				lfo.connect(inputModule.frequency);
			}

			if (inputModule instanceof AudioModule) {
				lfo.connect(inputModule.gainNode.gain);
			}

			lfo.frequency = wave.frequency;
			lfo.amplitude = wave.amplitude;
			lfo.waveform = wave.form;
			lfo.disabled = disabled;

			const lfoHandler: LFOHandler = {
				inputModule,
				propertyName: propertyName,
				lfo,
			};

			return lfoHandler;
		}
	);
}

function generateSynthPreset(
	name: string,
	{ cluster, envelope, filters, lfos, effects }: PresetInput
): SynthPreset {
	return {
		name,
		envelope: generateEnvelopePreset(envelope),
		modules: generateClusterPreset(cluster),
		filters: generateFiltersPreset(filters, cluster),
		lfos: generateLFOPreset(lfos, cluster, filters),
		effects: generateEffectsPreset(effects),
	};
}

/******************************************************************
 * EFFECTS PRESET GENERATION
 ******************************************************************/

function generateCompressionPreset(
	compression: CompressionEffect
): CompressionEffectPreset {
	return {
		attack: compression.attack,
		threshold: compression.threshold,
		disabled: compression.disabled,
		knee: compression.knee,
		ratio: compression.ratio,
	};
}

function loadCompressionPreset(
	preset: CompressionEffectPreset,
	ctx: AudioContext
): CompressionEffect {
	const compression = new CompressionEffect(ctx);
	compression.attack = preset.attack;
	compression.threshold = preset.threshold;
	compression.knee = preset.knee;
	compression.ratio = preset.ratio;
	compression.disabled = preset.disabled;

	return compression;
}

function generateFilterEffectPreset(filter: FilterEffect): FilterEffectPreset {
	return {
		disabled: filter.disabled,
		frequency: filter.frequency,
		type: filter.type,
	};
}

function loadFilterEffectPreset(
	preset: FilterEffectPreset,
	ctx: AudioContext
): FilterEffect {
	const filter = new FilterEffect(ctx);
	filter.frequency = preset.frequency;
	filter.type = preset.type;
	filter.disabled = preset.disabled;
	return filter;
}

function generateDistortionPreset(
	distortion: DistortionEffect
): DistortionEffectPreset {
	return {
		cuttoff: distortion.cutoff,
		disabled: distortion.disabled,
		distortionType: distortion.distortionType,
		drive: distortion.drive,
		filterPosition: distortion.filterPosition,
		filterType: distortion.filterType as DistortionFilterTypes,
		mix: distortion.mix,
		nBits: distortion.nBits,
		threshold: distortion.threshold,
	};
}

function loadDistortionPreset(
	preset: DistortionEffectPreset,
	ctx: AudioContext
): DistortionEffect {
	const distortion = new DistortionEffect(ctx);
	distortion.cutoff = preset.cuttoff;
	distortion.drive = preset.drive;
	distortion.threshold = preset.threshold;
	distortion.mix = preset.mix;
	distortion.filterType = preset.filterType;
	distortion.filterPosition = preset.filterPosition;
	distortion.disabled = preset.disabled;

	return distortion;
}

function generateDelayPreset(delay: DelayEffect): DelayEffectPreset {
	return {
		disabled: delay.disabled,
		feedback: delay.feedback,
		gain: delay.gain,
		rate: delay.rate,
	};
}

function loadDelayPreset(
	preset: DelayEffectPreset,
	ctx: AudioContext
): DelayEffect {
	const delay = new DelayEffect(ctx);
	delay.feedback = preset.feedback;
	delay.rate = preset.rate;
	delay.gain = preset.gain;
	delay.disabled = preset.disabled;

	return delay;
}

function generateFlangerPreset(flanger: FlangerEffect): FlangerEffectPreset {
	const { delay, depth, feedback, speed, disabled } = flanger;
	return {
		delay,
		depth,
		feedback,
		speed,
		disabled,
	};
}

function loadFlangerPreset(
	preset: FlangerEffectPreset,
	ctx: AudioContext
): FlangerEffect {
	const flanger = new FlangerEffect(ctx);

	flanger.depth = preset.depth;
	flanger.delay = preset.delay;
	flanger.feedback = preset.feedback;
	flanger.speed = preset.speed;

	return flanger;
}

function generateChorusPreset(chorus: ChorusEffect): ChorusEffectPreset {
	const {
		amount,
		rate,
		delay1,
		delay2,
		filterCuttof,
		filterType,
		mix,
		voices,
		feedback,
		feedbackDelay,
		disabled,
	} = chorus;

	return {
		amount,
		rate,
		delay1,
		delay2,
		filterCuttof,
		filterType,
		mix,
		disabled,
		voices,
		feedback,
		feedbackDelay,
	};
}

function loadChorusPreset(
	preset: ChorusEffectPreset,
	ctx: AudioContext
): ChorusEffect {
	const chorus = new ChorusEffect(ctx);
	chorus.amount = preset.amount;
	chorus.rate = preset.rate;
	chorus.delay1 = preset.delay1;
	chorus.delay2 = preset.delay2;
	chorus.filterCuttof = preset.filterCuttof;
	chorus.mix = preset.mix;
	chorus.voices = preset.voices;
	chorus.feedback = preset.feedback;
	chorus.feedbackDelay = preset.feedbackDelay;
	chorus.disabled = preset.disabled;

	return chorus;
}

function generateReverbPreset(reverb: ReverbEffect): ReverbEffectPreset {
	const {
		dampening,
		disabled,
		preDelay,
		preHighCut,
		preLowCut,
		mix,
		roomSize,
	} = reverb;

	return {
		dampening,
		disabled,
		preDelay,
		preHighCut,
		preLowCut,
		mix,
		roomSize,
	};
}

function loadReverbPreset(
	preset: ReverbEffectPreset,
	ctx: AudioContext
): ReverbEffect {
	const reverb = new ReverbEffect(ctx);

	reverb.roomSize = preset.roomSize;
	reverb.dampening = preset.dampening;
	reverb.preDelay = preset.preDelay;
	reverb.preHighCut = preset.preHighCut;
	reverb.preLowCut = preset.preLowCut;
	reverb.mix = preset.mix;

	return reverb;
}

function generateWahPreset(wah: WahEffect): WahEffectPreset {
	const { type, cutoff, speed, depth, delay, disabled, lfoForm, mix } = wah;

	return {
		type,
		cutoff,
		disabled,
		speed,
		delay,
		depth,
		lfoForm,
		mix,
	};
}

function loadWahPreset(preset: WahEffectPreset, ctx: AudioContext): WahEffect {
	const wah = new WahEffect(ctx);

	wah.cutoff = preset.cutoff;
	wah.type = preset.type;
	wah.lfoForm = preset.lfoForm;
	wah.mix = preset.mix;
	wah.delay = preset.delay;
	wah.depth = preset.depth;
	wah.speed = preset.speed;
	wah.disabled = preset.disabled;

	return wah;
}

function generateEqualizerPreset(equalizer: Equalizer): EqualizerEffectPreset {
	const { disabled, lowGain, midGain, midLowGain, midHighGain, highGain } =
		equalizer;

	return {
		disabled,
		lowGain,
		midGain,
		midLowGain,
		midHighGain,
		highGain,
	};
}

function loadEqualizerPreset(
	preset: EqualizerEffectPreset,
	ctx: AudioContext
): Equalizer {
	const equalizer = new Equalizer(ctx);

	equalizer.lowGain = preset.lowGain;
	equalizer.midLowGain = preset.midLowGain;
	equalizer.midGain = preset.midGain;
	equalizer.midHighGain = preset.midHighGain;
	equalizer.highGain = preset.highGain;
	equalizer.disabled = preset.disabled;

	return equalizer;
}

function generateEffectsPreset({
	chorus,
	compression,
	delay,
	distortion,
	equalizer,
	filter,
	flanger,
	reverb,
	wah,
}: SynthEffects): SynthEffectsPreset {
	return {
		chorus: generateChorusPreset(chorus),
		compression: generateCompressionPreset(compression),
		delay: generateDelayPreset(delay),
		distortion: generateDistortionPreset(distortion),
		equalizer: generateEqualizerPreset(equalizer),
		filter: generateFilterEffectPreset(filter),
		flanger: generateFlangerPreset(flanger),
		reverb: generateReverbPreset(reverb),
		wah: generateWahPreset(wah),
	};
}

function loadEffectsPreset(preset: SynthEffectsPreset, cluster: AudioCluster) {
	const compression = loadCompressionPreset(
		preset.compression,
		cluster.context
	);
	const chorus = loadChorusPreset(preset.chorus, cluster.context);
	const filter = loadFilterEffectPreset(preset.filter, cluster.context);
	const distortion = loadDistortionPreset(preset.distortion, cluster.context);
	const delay = loadDelayPreset(preset.delay, cluster.context);
	const flanger = loadFlangerPreset(preset.flanger, cluster.context);
	const reverb = loadReverbPreset(preset.reverb, cluster.context);
	const wah = loadWahPreset(preset.wah, cluster.context);
	const equalizer = loadEqualizerPreset(preset.equalizer, cluster.context);

	cluster.effects.append(wah);
	cluster.effects.append(distortion);
	cluster.effects.append(flanger);
	cluster.effects.append(chorus);
	cluster.effects.append(delay);
	cluster.effects.append(reverb);
	cluster.effects.append(filter);
	cluster.effects.append(equalizer);
	cluster.effects.append(compression);
}

/******************************************************************
 * PERSISTENCE API
 ******************************************************************/

/**
 * Searches the preset list for a preset with the provided name
 * If it isn't found it throws an error.
 * TODO: Should maybe just return null?
 * @param name
 * @returns
 */
function getPreset(name: string): SynthPreset {
	const presetList = getPresetList();
	const p = presetList[name];
	if (!p) throw new Error(`There is no preset with name ${name}`);
	return p;
}

/**
 * Adds a preset to the preset list.
 * If a preset with the same name already existed, it is overwriten
 * @param preset
 */
function addPreset(preset: SynthPreset) {
	const presetList = getPresetList();
	presetList[preset.name] = preset;
	savePresetList(presetList);
}

/******************************************************************
 * PRESET PERSISTENCE
 ******************************************************************/

/**
 * Checks that the provided object is a SynthParam by comparing its content with DEFAULT_PRESET
 * @param preset - the raw preset object whose type is yet unknown
 * @returns - boolean
 */
function validatePresetObject(preset: Record<string, unknown>): boolean {
	for (const [key, value] of Object.entries(DEFAULT_PRESET)) {
		if (!preset.hasOwnProperty(key)) {
			console.warn(`No key ${key} on preset`);
			return false;
		}

		if (typeof value != typeof preset[key]) {
			console.warn(
				`type of key ${key} with value ${value} is ${typeof value}, which is different from ${preset[key]} ${typeof preset[key]}`
			);
			return false;
		}
	}

	return true;
}

/**
 * returns a initialized Synth as a result of loading the preset with the specified name
 * @param name - The name of the preset to be loaded
 * @param ctx - The audio context that wraps everything
 * @param output - The audio node that is directly connected to the ctx oputput
 * @returns
 */
function loadSynthPreset(name: string, ctx: AudioContext, output: AudioNode) {
	const preset = getPreset(name);
	if (!preset) return null;

	//TODO: Validation
	const { modules, envelope, filters, lfos, effects }: SynthPreset = preset;
	const cluster = loadClusterPreset(modules, ctx, output);
	const filterHandlers = loadFiltersPreset(filters, cluster);
	loadEffectsPreset(effects, cluster);

	return {
		cluster,
		envelope: loadEnvelopePreset(envelope),
		filters: filterHandlers,
		lfos: loadLFOPreset(lfos, cluster, filterHandlers),
	};
}

function getPresetList(): PresetList {
	const rawPresetList = localStorage.getItem(STORE_NAME);
	if (!rawPresetList) {
		localStorage.setItem(STORE_NAME, "{}");
		return {};
	}

	const presetList: PresetList = JSON.parse(rawPresetList);
	return presetList;
}

function savePresetList(presetList: PresetList) {
	const rawPreset = JSON.stringify(presetList);

	localStorage.setItem(STORE_NAME, rawPreset);
}

function deletePresetFromList(name: string) {
	const presetList = getPresetList();
	delete presetList[name];
	savePresetList(presetList);
}

function clearPresetList() {
	savePresetList({});
}

function updatePresetName(oldName: string, newName: string) {
	const presetList = getPresetList();
	const preset = presetList[oldName];

	if (!preset) {
		throw new Error(`No preset found with name ${oldName}`);
	}

	preset.name = newName;
	delete presetList[oldName];
	presetList[newName] = preset;
	savePresetList(presetList);
}

function createPresetFile(preset: SynthPreset) {
	const blob = new Blob([JSON.stringify(preset, null, 2)], {
		type: "application/json",
	});
	return blob;
}

/******************************************************************
 * COMPOSABLE
 ******************************************************************/

export default function usePresets() {
	const presets = ref<PresetList>(getPresetList());

	function savePreset(name: string) {
		const { cluster, lfos, envelope, filters, effects } = useSynth();

		if (Object.entries(presets.value).length >= MAX_PRESETS) {
			throw new Error("Max number of presets reached");
		}

		const preset = generateSynthPreset(name, {
			cluster: cluster.value,
			envelope: envelope.value,
			lfos: lfos.value,
			filters: filters.value,
			effects: effects.value,
		});
		addPreset(preset);

		presets.value = getPresetList();
	}

	function loadPreset(name: string) {
		const { cluster, lfos, envelope, filters } = useSynth();

		const preset = loadSynthPreset(
			name,
			cluster.value.context,
			cluster.value.exit
		);

		if (preset == null) return;

		if (preset.cluster == cluster.value) {
			return;
		}

		cluster.value = preset.cluster;
		envelope.value = preset.envelope;
		filters.value = preset.filters;
		lfos.value = preset.lfos;
	}

	function deletePreset(name: string) {
		deletePresetFromList(name);
		presets.value = getPresetList();
	}

	function clearPresets() {
		clearPresetList();
		presets.value = getPresetList();
	}

	function updateName(oldName: string, newName: string) {
		updatePresetName(oldName, newName);
		presets.value = getPresetList();
	}

	function downloadPreset(name: string) {
		const preset: SynthPreset = presets.value[name];
		if (!preset) {
			throw new Error(`No preset found with value ${name}`);
		}

		const presetFile = createPresetFile(preset);
		const presetUrl = window.URL.createObjectURL(presetFile);
		const a: HTMLAnchorElement = document.createElement("a");

		a.href = presetUrl;
		a.download = `${preset.name}.json`;
		a.click();
		URL.revokeObjectURL(presetUrl);
	}

	async function uploadPreset(file: File) {
		if (file.type != "application/json")
			throw new Error("The provided preset is not a JSON file");

		if (file.size > MAX_PRESET_FILE_SIZE)
			throw new Error("The provided preset file is too big");

		const fr = new FileReader();
		const preset = await new Promise<SynthPreset>((resolve, reject) => {
			fr.onloadend = () => {
				const rawObject = JSON.parse(fr.result as string);
				if (!validatePresetObject(rawObject)) {
					console.warn("Rejecting");
					reject();
					return;
				}
				resolve(rawObject as SynthPreset);
			};
			fr.readAsText(file, "UTF-8");
		}).catch(() => {
			return null;
		});

		//Add error handling
		if (!preset) return null;
		addPreset(preset);
		presets.value = getPresetList();
	}

	return {
		presetList: presets,
		savePreset,
		loadPreset,
		uploadPreset,
		deletePreset,
		clearPresets,
		updateName,
		downloadPreset,
	};
}
