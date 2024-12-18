<template>
	<VsCard
		max-height="20rem"
		max-width="50rem"
		min-height="17rem"
		:child-class="filterCardStyles"
	>
		<div class="filterCard__handle"></div>

		<div class="filterCard__controls">
			<VsSlider
				v-if="filter"
				v-model="filterHandler.cutoffFrequency"
				orientation="vertical"
				:min="0"
				:max="10000"
				label="cuttof"
			></VsSlider>
		</div>

		<div class="filterCard__main">
			<div class="filterCard__selectors">
				<VsSelector
					v-if="filter"
					v-model="filterHandler.type"
					:items="Object.keys(filterTypes)"
				></VsSelector>
				<VsSelector
					:items="sources.map(m => m.name)"
					@change="handleSelectModule"
				></VsSelector>
			</div>
			<WaveAnalyser
				v-if="source"
				:source="source.gainNode"
				:canvas-width="zoom"
			></WaveAnalyser>

			<VsSlider
				v-if="source"
				v-model="zoom"
				:min="400"
				:max="1000"
				:label="zoom"
			></VsSlider>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import type AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { computed, onMounted, ref } from "vue";
/**
 * el efecto deberia ser un estado del componente
 * Si ha de estar asociado a a un contexto entonces almacenamos solo sus datos
 * On attach un audioModule, creamos el filtro y lo añadimos como el ultimo effecto
 * onChange de cualquier cosa hacemos updateOscillator (o lo que toque)
 */

/**
 * Nuevo enfoque. Mas de un VModel.
 */
enum filterTypes {
	lowpass = "lowpass",
	highpass = "highpass",
	bandpass = "bandpass",
	lowshelf = "lowshelf",
	highself = "highself",
	peaking = "peaking",
	notch = "notch",
	allpass = "allpass",
}

interface FilterWidgetProps {
	sources: AudioModule[];
	context: AudioContext;
}
const { sources, context } = defineProps<FilterWidgetProps>();

const filter = defineModel<BiquadFilterNode>("filter");
const filterHandler = ref<FilterHandler>(new FilterHandler("lowpass", 400));
const source = ref<AudioModule>();
const zoom = ref<number>();

function handleSelectModule(moduleName: string | undefined) {
	if (!moduleName) return;
	const newModule = sources.find(module => {
		return module.name == moduleName;
	});

	if (!newModule) return;

	console.log(newModule.name);
	console.log(source.value?.name);

	if (source.value != undefined && filter.value != undefined) {
		source.value.detachEffect(filter.value as AudioNode);
	}

	if (filter.value != undefined)
		newModule.attachEffect(filter.value as AudioNode);
	source.value = newModule;
}

const filterCardStyles = computed(() => {
	return `filterCard`;
});

onMounted(() => {
	if (context != null && filter.value != undefined) {
		filterHandler.value.setNode(filter.value);
	}
});
</script>

<style lang="scss" scoped>
.filterCard {
	display: grid;
	grid-template-columns:
		[handle-start] minmax(30px, 1fr)
		[handle-end controls-start] minmax(50px, 2fr)
		[controls-end main-start] minmax(200px, 8fr);

	grid-template-rows: minmax(10px, 1fr);

	&__handle {
		width: 100%;
		height: 100%;
		background-color: black;
	}

	&__controls {
		width: 100%;
		height: 100%;
		flex: 1;

		max-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__selectors {
		display: flex;
		justify-content: center;
		align-items: center;

		> * {
			flex: 1;
		}
	}

	&__main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
}
</style>
