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
						:source="MainAudioCluster.exit"
						:canvas-width="3080"
						:canvas-height="200"
						:brush-size="7"
					></WaveAnalyser>
				</template>
			</HeaderWidgetWidget>
		</template>

		<template v-if="currentTab === 'Voice'" #waves>
			<ModuleCardListWidget v-model="MainAudioCluster"></ModuleCardListWidget>
		</template>
		<template v-if="currentTab === 'Voice'" #filters>
			<EffectListWidget
				v-if="MainAudioCluster"
				v-model="filters"
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

		<template #actions="{ variant }">
			<ActionsWidget
				v-model:transpose="transposeAmount"
				v-model:volume="MainAudioCluster.volume"
				:source="MainAudioCluster"
				orientation="horizontal"
				:variant="variant"
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
				v-model="lfos"
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
import useSynth from "@/composables/useSynth";
import MobileSynthLayout from "@/layouts/synth/MobileSynthLayout.vue";
import PortraitSynthLayout from "@/layouts/synth/PortraitSynthLayout.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioCluster from "@/models/AudioCluster";
import AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { type LfoSource } from "@/models/LFOHandler";
import ActionsWidget from "@/widgets/ActionsWidget/ActionsWidget.vue";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import VsEffectsWidget from "@/widgets/Effects/VsEffectsWidget.vue";
import EnvelopeControlWidget from "@/widgets/EnvelopeControl/EnvelopeControlWidget.vue";
import VSFooter from "@/widgets/Footer/VSFooter.vue";
import HeaderControlsWidget, {
	type TabItem,
} from "@/widgets/HeaderControls/HeaderControlsWidget.vue";
import HeaderWidgetWidget from "@/widgets/HeaderWidget/HeaderWidgetWidget.vue";
import KeyboardWidget from "@/widgets/Keyboard/KeyboardWidget.vue";
import { type LFOWidgetVariants } from "@/widgets/LfoWdidget/LfoWdidgetWidget.vue";
import LfoWidgetListWidget from "@/widgets/LfoWidgetList/LfoWidgetListWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { computed, onMounted, ref } from "vue";

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

const MAX_FILTERS = 5;

const { cluster: MainAudioCluster, envelope, lfos, filters } = useSynth();
const mainContext = computed(() => MainAudioCluster.value.context);

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

onMounted(() => {
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
