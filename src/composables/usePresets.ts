import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import type FilterHandler from "@/models/FilterHandler";
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
	module: string; //?
}

interface SynthPreset {
	name: string;
	modules: ModulePreset[];
	envelope?: EnvelopePreset;
	filters?: FilterPreset[];
	lfos?: LFOPreset[];
}

interface PresetInput {
	cluster: AudioCluster;
	envelope: AudioEnvelope;
	filters: FilterHandler[];
	lfos?: LFO[];
}

//We define the function redundantly and scale it later if necessary.
function getEnvelopePreset(envelope: AudioEnvelope): EnvelopePreset {
	return envelope;
}

// function loadEnvelopePreset(envPreset: EnvelopePreset): AudioEnvelope {
// 	return envPreset;
// }

function getClusterPreset(cluster: AudioCluster): ModulePreset[] {
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

	presets.forEach(({ name, detune, voices, wave }) => {
		const m = c.createModule(name, wave.form);
		if (m) {
			m.voices = voices;
			m.voicesDetune = detune;
		}
	});

	return c;
}

function getFiltersPreset(
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

function getSynthPreset(
	name: string,
	{ cluster, envelope, filters }: PresetInput
): SynthPreset {
	return {
		name,
		envelope: getEnvelopePreset(envelope),
		modules: getClusterPreset(cluster),
		filters: getFiltersPreset(filters, cluster),
	};
}

export function saveSynthPreset(name: string, input: PresetInput) {
	//check existing presets and change name?
	const preset = getSynthPreset(name, input);
	const presetString = JSON.stringify(preset);
	localStorage.setItem(name, presetString);
}

export function loadSynthPreset(
	name: string,
	ctx: AudioContext,
	output: AudioNode
) {
	const preset = localStorage.getItem(name);
	if (!preset) return;

	//TODO: Validation
	const serializedPreset: SynthPreset = JSON.parse(preset);
	console.warn(serializedPreset);

	return {
		cluster: loadClusterPreset(serializedPreset.modules, ctx, output),
	};
}
