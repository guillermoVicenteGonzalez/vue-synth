import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { LFO } from "@/models/LFO";
import type LFOHandler from "@/models/LFOHandler";
import type Wave from "@/models/wave";
import { ref } from "vue";
import useSynth from "./useSynth";

//TODO!: This would benefit a lot from UID use

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
}

interface PresetInput {
	cluster: AudioCluster;
	envelope: AudioEnvelope;
	filters: FilterHandler[];
	lfos: LFOHandler[];
}

export type PresetList = Record<string, SynthPreset>;

const STORE_NAME = "presetList";
const MAX_PRESETS = 20;

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
	{ cluster, envelope, filters, lfos }: PresetInput
): SynthPreset {
	return {
		name,
		envelope: generateEnvelopePreset(envelope),
		modules: generateClusterPreset(cluster),
		filters: generateFiltersPreset(filters, cluster),
		lfos: generateLFOPreset(lfos, cluster, filters),
	};
}

function saveSynthPreset(name: string, input: PresetInput) {
	//check if presetList exists

	const presetList: PresetList = getPresetList();
	const preset = generateSynthPreset(name, input);
	//check existing presets and change name?
	presetList[name] = preset;

	savePresetList(presetList);
}

function loadSynthPreset(name: string, ctx: AudioContext, output: AudioNode) {
	const presetList: PresetList = getPresetList();
	const preset = presetList[name];
	if (!preset) throw new Error("No preset");

	//TODO: Validation
	const { modules, envelope, filters, lfos }: SynthPreset = preset;
	const cluster = loadClusterPreset(modules, ctx, output);
	const filterHandlers = loadFiltersPreset(filters, cluster);

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

export default function usePresets() {
	const presets = ref<PresetList>(getPresetList());

	function savePreset(name: string) {
		const { cluster, lfos, envelope, filters } = useSynth();

		if (Object.entries(presets.value).length >= MAX_PRESETS) {
			throw new Error("Max number of presets reached");
		}

		saveSynthPreset(name, {
			cluster: cluster.value,
			envelope: envelope.value,
			lfos: lfos.value,
			filters: filters.value,
		});

		presets.value = getPresetList();
	}

	function loadPreset(name: string) {
		const { cluster, lfos, envelope, filters } = useSynth();

		const preset = loadSynthPreset(
			name,
			cluster.value.context,
			cluster.value.exit
		);

		// MainAudioCluster.value = null;
		if (preset.cluster == cluster.value) {
			console.error("IGUALES");
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

	function uploadPreset() {}

	return {
		presetList: presets,
		savePreset,
		loadPreset,
		uploadPreset,
		deletePreset,
		clearPresets,
	};
}
