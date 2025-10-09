<template>
	<VsCard max-height="20rem" min-height="20rem" :class="filterCardStyles">
		<div class="filterCard__handle">
			<ToggleButton v-model="disabled" :color="primaryColor"></ToggleButton>

			<VsButton variant="round" class="delete-btn" @click="deleteFilter"
				>X</VsButton
			>
		</div>

		<div class="filterCard__body">
			<div class="filterCard__controls">
				<VsSlider
					v-if="filter"
					v-model="filterHandler.cutoffFrequency"
					orientation="vertical"
					:min="0"
					:max="10000"
					label="cuttof"
					:disabled="disabled"
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
						clearable
						:items="sources.modules.map(m => m.name)"
						@change="handleSelectModule"
					></VsSelector>
				</div>
				<WaveAnalyser
					v-if="source"
					:line-color="primaryColor"
					class="filterCard__analyser"
					:source="source.gainNode"
					:canvas-width="zoom"
				></WaveAnalyser>

				<VsSlider
					v-if="source"
					v-model="zoom"
					:disabled="disabled"
					:min="400"
					:max="1000"
					:label="zoom"
				></VsSlider>
			</div>
		</div>
	</VsCard>
</template>

<script setup lang="ts">
import ToggleButton from "@/components/common/ToggleButton/ToggleButton.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import type AudioCluster from "@/models/AudioCluster";
import AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

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
	sources: AudioCluster;
	context: AudioContext;
}
const { sources, context } = defineProps<FilterWidgetProps>();
const primaryColor = "#42d392";

/**The filter node attached as model to the card.
 * It is created by the parent component (main view tipically)
 */
const filter = defineModel<BiquadFilterNode>("filter");
/**A helper for filter parameter reactive handling */
const filterHandler = ref<FilterHandler>(new FilterHandler("lowpass", 400));
/**Current audioModule connected to the filter */
const source = ref<AudioModule>();
const zoom = ref<number>(400);
const disabled = ref<boolean>(false);

const filterCardStyles = computed(() => {
	return `filterCard ${disabled.value ? "filterCard--disabled" : null}`;
});

watch(disabled, () => {
	if (!source.value || !filter.value) return;
	if (disabled.value) source.value.detachEffect(filter.value);
	else source.value.attachEffect(filter.value);
});

/**
 * Every time sources change (additions or deletion of modules)
 * We check that our current source still exist.
 * If it does not exist => we reset the source to undefined-
 * This covers the scenario where a module that had this filter attached is deleted
 */
watch(sources.modules, () => {
	if (source.value) {
		const exists = sources.modules.includes(source.value);
		if (!exists) source.value = undefined;
	}
});

const emit = defineEmits<{
	(e: "delete", value: BiquadFilterNode | undefined): void;
}>();

/**
 * Given a module name, searches sources.modules for it and assigns it to source
 * If no module name is provided => detachment, we detach the filter from the previous source and assign source = undefined
 * @param moduleName
 */
function handleSelectModule(moduleName: string | undefined = undefined) {
	//we detach the current module from the in	ternal component filter
	if (!moduleName || moduleName == "") {
		if (!source.value) return;
		source.value.detachEffect(filter.value);
		source.value = undefined;
	}

	const newModule = sources.modules.find(module => {
		return module.name == moduleName;
	});

	if (!newModule) return;

	if (source.value != undefined && filter.value != undefined) {
		source.value.detachEffect(filter.value);
	}

	if (filter.value != undefined) newModule.attachEffect(filter.value);
	source.value = newModule;
}

function deleteFilter() {
	handleSelectModule(undefined);
	emit("delete", filter.value);
}

onMounted(() => {
	if (context != null && filter.value != undefined) {
		filterHandler.value.setNode(filter.value);
	}
});

onUnmounted(() => {
	//si hay source => detach
	if (source.value) {
		handleSelectModule();
	}
	//filter = null;
	// filter.value = undefined;
});
</script>

<style lang="scss" scoped>
$handle-padding: 1rem;
$disabled-color: gray;

.filterCard {
	background-color: $bg-color-2;
	display: flex;

	&__handle {
		flex: 0 0 3rem;

		width: 100%;
		height: 100%;
		background-color: black;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding: $handle-padding 0 $handle-padding 0;
		z-index: 2;
	}

	&__body {
		padding: $gap-df;
		width: 100%;
		display: grid;
		grid-template-columns:
			[handle-end controls-start] minmax(50px, 2fr)
			[controls-end main-start] minmax(200px, 8fr);

		grid-template-rows: minmax(10px, 1fr);
		gap: $gap-sm;
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

	&__analyser {
		background-color: $bg-color-1;
		border-radius: 0.5rem;
		margin-top: $gap-df;
		margin-bottom: $gap-df;

		flex-grow: 0;
		flex-shrink: 1;
		max-height: 100%;
	}

	&__selectors {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: $gap-df;
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

	.delete-btn {
	}
}

.black-box {
	// width: 100%;
	// height: 100%;
	// background-color: red;
}
</style>
