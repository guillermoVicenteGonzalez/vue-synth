<template>
	<VsCard
		max-height="20rem"
		max-width="50rem"
		min-height="17rem"
		:class="filterCardStyles"
	>
		<div class="filterCard__handle">
			<ToggleButton v-model="disabled"></ToggleButton>
		</div>

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
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import type AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { computed, onMounted, ref, watch } from "vue";

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
	/**All the waves we can apply filters to*/
	sources: AudioModule[];
	context: AudioContext;
}
const { sources, context } = defineProps<FilterWidgetProps>();

/**The filter node attached as model to the card.
 * It is created by the parent component (main view tipically)
 */
const filter = defineModel<BiquadFilterNode>("filter");
/**A helper for filter parameter reactive handling */
const filterHandler = ref<FilterHandler>(new FilterHandler("lowpass", 400));
/**Current audioModule connected to the filter */
const source = ref<AudioModule>();
const zoom = ref<number>();
const disabled = ref<boolean>(false);

const filterCardStyles = computed(() => {
	return `filterCard ${disabled.value ? "filterCard--disabled" : null}`;
});

watch(disabled, () => {
	if (!source.value || !filter.value) return;
	if (disabled.value) source.value.detachEffect(filter.value);
	else source.value.attachEffect(filter.value);
});

function handleSelectModule(moduleName: string | undefined) {
	//we detach the current module
	if (!moduleName || moduleName == "") {
		if (!source.value) return;
		console.log("detaching");
		source.value.detachEffect(filter.value);
		source.value = undefined;
	}

	const newModule = sources.find(module => {
		return module.name == moduleName;
	});

	if (!newModule) return;

	if (source.value != undefined && filter.value != undefined) {
		source.value.detachEffect(filter.value);
	}

	if (filter.value != undefined) newModule.attachEffect(filter.value);
	source.value = newModule;
}

onMounted(() => {
	if (context != null && filter.value != undefined) {
		filterHandler.value.setNode(filter.value);
	}
});
</script>

<style lang="scss" scoped>
$handle-padding: 1rem;
$disabled-color: gray;

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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: $handle-padding 0 $handle-padding 0;
		z-index: 2;
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

	&--disabled {
		position: relative;

		&::after {
			content: "";
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: rgba($disabled-color, 0.1);
			backdrop-filter: blur(1px);
		}
	}
}
</style>
