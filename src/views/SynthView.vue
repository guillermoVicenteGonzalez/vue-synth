<template>
	<component :is="currentLayout">
		<template #header>
			<HeaderWidgetWidget>
				<template #controls>
					<HeaderControlsWidget v-model="currentTab"></HeaderControlsWidget>
				</template>
				<template #visualizer>
					<WaveAnalyser
						class="main-analyser"
						:line-color="primaryColor"
						:source="merger"
						:canvas-width="3080"
						:canvas-height="200"
						:brush-size="7"
					></WaveAnalyser>
				</template>
			</HeaderWidgetWidget>
		</template>

		<template v-if="currentTab === 'Voice'" #waves>
			<ModuleCardListWidget v-model="MainAudioCluster"></ModuleCardListWidget>
			<button @click="test">Test</button>
			<button @click="test2">Test2</button>
		</template>
		<template v-if="currentTab === 'Voice'" #filters>
			<EffectListWidget
				v-if="MainAudioCluster"
				v-model="filters as FilterHandler[]"
				:context="mainContext"
				:sources="MainAudioCluster"
			></EffectListWidget>
		</template>

		<template v-if="currentTab === 'Effects'" #effects>
			<VsEffectsWidget
				v-if="currentTab === 'Effects'"
				v-model="MainAudioCluster.effects"
				class="effects"
			></VsEffectsWidget>
		</template>

		<template #actions>
			<ActionsWidget
				v-model:transpose="transposeAmount"
				v-model:volume="MainAudioCluster.volume"
				:source="MainAudioCluster"
				:orientation="ActionsWidgetOrientation"
				@create-wave="createNewModule"
				@create-filter="createFilter"
				@delete-all="deleteAll"
			></ActionsWidget>
		</template>
		<template #envelope>
			<EnvelopeControlWidget v-model="envelope" />
		</template>
		<template #lfo>
			<LfoWidgetListWidget
				:widget-variant="LFOlWidgetVariant"
				:variant="lfoListVariant"
				:context="mainContext"
				:sources="lfoSources"
			></LfoWidgetListWidget>
		</template>
		<template #piano>
			<KeyboardWidget
				v-model="transposeAmount"
				:envelope="envelope"
				:context="mainContext"
				:source-cluster="MainAudioCluster"
			></KeyboardWidget>
		</template>

		<template #footer>
			<VSFooter></VSFooter>
		</template>
	</component>
</template>

<script setup lang="ts">
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import { useMonitorSize } from "@/composables/useMonitorSize";
import { loadSynthPreset, saveSynthPreset } from "@/composables/usePresets";
import MobileSynthLayout from "@/layouts/synth/MobileSynthLayout.vue";
import PortraitSynthLayout from "@/layouts/synth/PortraitSynthLayout.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import AudioModule from "@/models/AudioModule";
import ChorusEffect from "@/models/effects/ChorusEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import DistortionEffect from "@/models/effects/DistortionEffect";
import Equalizer from "@/models/effects/EqualizerEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import WahEffect from "@/models/effects/WahEffect";
import FilterHandler from "@/models/FilterHandler";
import ActionsWidget, {
	type ActionsWidgetOrientation,
} from "@/widgets/ActionsWidget/ActionsWidget.vue";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import VsEffectsWidget from "@/widgets/Effects/VsEffectsWidget.vue";
import EnvelopeControlWidget from "@/widgets/EnvelopeControl/EnvelopeControlWidget.vue";
import VSFooter from "@/widgets/Footer/VSFooter.vue";
import HeaderControlsWidget, {
	type TabItem,
} from "@/widgets/HeaderControls/HeaderControlsWidget.vue";
import HeaderWidgetWidget from "@/widgets/HeaderWidget/HeaderWidgetWidget.vue";
import KeyboardWidget from "@/widgets/Keyboard/KeyboardWidget.vue";
import {
	type LfoSource,
	type LFOWidgetVariants,
} from "@/widgets/LfoWdidget/LfoWdidgetWidget.vue";
import LfoWidgetListWidget from "@/widgets/LfoWidgetList/LfoWidgetListWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { computed, onMounted, provide, ref, type Ref } from "vue";

const { browserHeight, browserWidth } = useMonitorSize();
const primaryColor = "#42d392";

const transposeAmount = ref<number>(0);
const currentTab = ref<TabItem>("Voice");

const currentLayout = computed(() => {
	if (browserWidth.value <= 600) return MobileSynthLayout;

	if (browserWidth.value <= 1380 && browserHeight.value > 600) {
		return MobileSynthLayout;
	}

	if (browserHeight.value < 600) {
		return PortraitSynthLayout;
	}

	return SynthLayout;
});

const LFOlWidgetVariant = computed<LFOWidgetVariants>(() =>
	currentLayout.value == PortraitSynthLayout ? "minimal" : "default"
);

const lfoListVariant = computed(() => {
	return browserWidth.value < 800 ? "horizontal" : "vertical";
});

const ActionsWidgetOrientation = computed<ActionsWidgetOrientation>(() =>
	currentLayout.value == PortraitSynthLayout ? "vertical" : "horizontal"
);

const MAX_FILTERS = 5;

// const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger(1));
const MainAudioCluster: Ref<AudioCluster, AudioCluster> = ref<AudioCluster>(
	new AudioCluster(mainContext.value, merger.value)
) as Ref<AudioCluster, AudioCluster>;
provide("mainCluster", MainAudioCluster);
const envelope = ref<AudioEnvelope>({
	attack: 0.2,
	decay: 0.4,
	sustain: 0.5,
	release: 0.2,
});

const filters = ref<FilterHandler[]>([]);

// const lfoSources = computed<AudioModule[]>(() => new AudioCluster(mainContext.value, merger.value).modules);
const lfoSources = computed<LfoSource[]>(() => {
	const modules: AudioModule[] = MainAudioCluster.value
		.modules as AudioModule[];
	const fils: AudioNode[] = filters.value.map(f => f.filter);
	const sources: LfoSource[] = [];
	return sources
		.concat(...fils, ...modules)
		.concat(MainAudioCluster.value as AudioCluster);
});

function createNewModule() {
	const waveName = `wave ${MainAudioCluster.value.modules.length}`;
	MainAudioCluster.value.createModule(waveName, "sine");
}

function createFilter() {
	if (filters.value.length >= MAX_FILTERS) return;
	const newFilter = new FilterHandler(MainAudioCluster.value.context);
	filters.value.push(newFilter);
	return newFilter;
}

function deleteAll() {
	MainAudioCluster.value.modules.forEach(module => {
		module.destroyModule();
	});
	filters.value.forEach(filter => {
		filter.detachModule();
	});
	filters.value = [];
	MainAudioCluster.value.modules = [];
}

function initializeEffects() {
	const compression = new CompressionEffect(MainAudioCluster.value.context);
	const filter = new FilterEffect(MainAudioCluster.value.context);
	const distortion = new DistortionEffect(MainAudioCluster.value.context);
	const delay = new DelayEffect(MainAudioCluster.value.context);
	const flanger = new FlangerEffect(MainAudioCluster.value.context);
	const chorus = new ChorusEffect(MainAudioCluster.value.context);
	const reverb = new ReverbEffect(MainAudioCluster.value.context);
	const wah = new WahEffect(MainAudioCluster.value.context);
	const equalizer = new Equalizer(MainAudioCluster.value.context);

	flanger.disabled = true;
	filter.disabled = true;
	delay.disabled = true;
	chorus.disabled = true;
	reverb.disabled = true;
	distortion.disabled = true;
	wah.disabled = true;

	MainAudioCluster.value.effects.append(wah);
	MainAudioCluster.value.effects.append(distortion);
	MainAudioCluster.value.effects.append(flanger);
	MainAudioCluster.value.effects.append(chorus);
	MainAudioCluster.value.effects.append(delay);
	MainAudioCluster.value.effects.append(reverb);
	MainAudioCluster.value.effects.append(filter);
	MainAudioCluster.value.effects.append(equalizer);
	MainAudioCluster.value.effects.append(compression);
}

function test() {
	saveSynthPreset("test", {
		cluster: MainAudioCluster.value,
		envelope: envelope.value,
		filters: filters.value as FilterHandler[],
	});
}

function test2() {
	const result = loadSynthPreset("test", mainContext.value, merger.value);
	console.warn(result);
	// MainAudioCluster.value = result?.cluster;
}

onMounted(() => {
	merger.value.connect(mainContext.value.destination);
	initializeEffects();
	createNewModule();
	createFilter();
});
</script>

<style scoped lang="scss">
.components {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 4fr 3fr;
	grid-template-rows: minmax(80%, 10fr) minmax(10%, 1fr);
	gap: 0.5rem;

	&__controls {
		grid-column: 1/-1;
		background-color: transparent;
		position: relative;
		bottom: 0;
		height: fit-content;
		padding: 1rem;
		gap: 1rem;
	}

	@include respond(tab-port) {
		display: grid;
	}

	@include respond(phone) {
		// display:;
	}
}

.testContainer {
	background-color: red;
	height: 20px;
	width: 100px;
}

.main-analyser {
	background-color: $bg-color-1;
}
</style>
