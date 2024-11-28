<template>
	<VsCard max-height="15rem" height="100%">
		<h1>Hola</h1>
		<VsSlider></VsSlider>
		<VsSlider
			v-if="filter"
			v-model="filterHandler.cutoffFrequency"
			:min="0"
			:max="1000"
			label="cuttof freq"
		></VsSlider>
		<VsSelector
			v-if="filter"
			v-model="filterHandler.type"
			:items="Object.keys(filterTypes)"
		></VsSelector>
		<VsSelector
			:items="sources.map(m => m.name)"
			@change="handleSelectModule"
		></VsSelector>
		<WaveAnalyser
			v-if="source"
			:source="source.exit"
			:canvas-width="zoom"
		></WaveAnalyser>
	</VsCard>
</template>

<script setup lang="ts">
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import type AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { onMounted, ref } from "vue";
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
	zoom?: number;
	sources: AudioModule[];
	context: AudioContext;
}
const { zoom, sources, context } = defineProps<FilterWidgetProps>();

// const source = defineModel<AudioModule>("source", {});
// const filter = defineModel<FilterHandler>("filter", {});
const filter = defineModel<BiquadFilterNode>("filter");
const filterHandler = ref<FilterHandler>(new FilterHandler("lowpass", 100));
const source = ref<AudioModule>();

function handleSelectModule(moduleName: string | undefined) {
	if (!moduleName) return;
	// emit("select", moduleName);
	const newModule = sources.find(module => {
		return module.name == moduleName;
	});

	if (!newModule) return;

	//si tenía source antes y el filtro no es null => "desenchufo el efecto"
	if (source.value != undefined && filter.value != undefined) {
		source.value.detachEffect(filter.value as AudioNode);
	}
	if (filter.value != undefined)
		newModule.attachEffect(filter.value as AudioNode);
	source.value = newModule;
}

onMounted(() => {
	console.log(filter.value);
	if (context != null && filter.value != undefined) {
		filterHandler.value.setNode(filter.value);
		alert("mounting correctly");
	}
});
</script>

<style lang="scss" scoped></style>
