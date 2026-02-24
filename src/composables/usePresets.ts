import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import FilterHandler from "@/models/FilterHandler";
import type { LFO } from "@/models/LFO";
import type Wave from "@/models/wave";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EnvelopePreset extends AudioEnvelope {}
interface FilterPreset {
	frequency: number;
	type: BiquadFilterType;
	moduleIndex: number;
	disabled: boolean;
}

interface ModulePreset {
	name: string;
	wave: Wave;
	disabled: boolean;
	voices: number;
	detune: number;
}

interface LFOPreset {
	wave: Wave;
	module?: string; //?
	property?: string;
}

interface SynthPreset {
	name: string;
	modules: ModulePreset[];
	envelope: EnvelopePreset;
	filters: FilterPreset[];
	lfos: LFOPreset[];
}

interface PresetInput {
	cluster: AudioCluster;
	envelope: AudioEnvelope;
	filters: FilterHandler[];
	lfos: LFO[];
}

//We define the function redundantly and scale it later if necessary.
function generateEnvelopePreset(envelope: AudioEnvelope): EnvelopePreset {
	return envelope;
}

function loadEnvelopePreset(preset: EnvelopePreset): AudioEnvelope {
	return preset;
}

// function loadEnvelopePreset(envPreset: EnvelopePreset): AudioEnvelope {
// 	return envPreset;
// }

function generateClusterPreset(cluster: AudioCluster): ModulePreset[] {
	console.warn("Saving cluster");

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

	return modules;
}

function loadClusterPreset(
	presets: ModulePreset[],
	ctx: AudioContext,
	output: AudioNode
): AudioCluster {
	const c = new AudioCluster(ctx, output);

	presets.forEach(({ name, detune, voices }) => {
		const m = c.createModule(name, "sawtooth");
		if (m) {
			m.voices = voices;
			m.voicesDetune = detune;
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
function generateLFOPreset(lfos: LFO[]): LFOPreset[] {
	return lfos.map(lfo => {
		return {
			wave: lfo.wave,
		};
	});
}

function generateSynthPreset(
	name: string,
	{ cluster, envelope, filters, lfos }: PresetInput
): SynthPreset {
	return {
		name,
		envelope: generateEnvelopePreset(envelope),
		modules: generateClusterPreset(cluster),
		filters: generateFiltersPreset(filters, cluster),
		lfos: generateLFOPreset(lfos),
	};
}

export function saveSynthPreset(name: string, input: PresetInput) {
	//check existing presets and change name?
	const preset = generateSynthPreset(name, input);
	const presetString = JSON.stringify(preset);
	localStorage.setItem(name, presetString);
}

export function loadSynthPreset(
	name: string,
	ctx: AudioContext,
	output: AudioNode
) {
	const preset = localStorage.getItem(name);
	if (!preset) throw new Error("No preset");

	//TODO: Validation
	const { modules, envelope, filters }: SynthPreset = JSON.parse(preset);
	const cluster = loadClusterPreset(modules, ctx, output);

	return {
		cluster,
		envelope: loadEnvelopePreset(envelope),
		filters: loadFiltersPreset(filters, cluster),
	};
}
