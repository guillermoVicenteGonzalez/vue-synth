<template>
	<VsCard
		:max-height="MAX_CARD_HEIGHT"
		:min-height="MIN_CARD_HEIGHT"
		:class="filterCardStyles"
	>
		<div class="filterCard__handle">
			<ToggleButton v-model="disabled" :color="primaryColor"></ToggleButton>

			<VsButton variant="round" class="delete-btn" @click="deleteFilter">
				<VsTooltip
					class="delete-btn__tooltip"
					delay="2s"
					orientation="right"
					text="delete filter"
				>
					<X class="delete-btn__icon"></X> </VsTooltip
			></VsButton>
		</div>

		<div class="filterCard__body">
			<div class="filterCard__controls">
				<VsSlider
					v-if="filter"
					v-model="filter.cuttofFrequency"
					class="filterCard__controls__slider"
					orientation="vertical"
					:min="0"
					:max="10000"
					:disabled="disabled"
				>
					<template #label>
						<VsChip class="filterCard__controls__chip">Cutoff</VsChip>
					</template>
				</VsSlider>
			</div>

			<div class="filterCard__main">
				<div class="filterCard__selectors">
					<VsSelector
						v-if="filter"
						v-model="filter.type"
						:items="Object.keys(FilterTypes)"
					></VsSelector>
					<VsSelector
						v-model="selectedModule"
						clearable
						:items="sources.modules.map(m => m.name)"
					></VsSelector>
				</div>
				<WaveAnalyser
					v-if="filter"
					:line-color="primaryColor"
					class="filterCard__analyser"
					:source="filter.filter"
					:canvas-width="zoom"
				></WaveAnalyser>

				<VsSlider
					v-if="filter"
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
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import type AudioCluster from "@/models/AudioCluster";
import FilterHandler, { FilterTypes } from "@/models/FilterHandler";
import { X } from "lucide-vue-next";
import { computed, ref } from "vue";

interface FilterWidgetProps {
	/**All the waves we can apply filters to*/
	sources: AudioCluster;
	context: AudioContext;
}
const { sources } = defineProps<FilterWidgetProps>();
const primaryColor = "#42d392";
const MAX_CARD_HEIGHT = "17rem";
const MIN_CARD_HEIGHT = "17rem";

/**The filter node attached as model to the card.
 * It is created by the parent component (main view tipically)
 */

const filterCardStyles = computed(() => {
	return `filterCard ${disabled.value ? "filterCard--disabled" : null}`;
});

const zoom = ref<number>(400);
const disabled = ref<boolean>(false);

const filter = defineModel<FilterHandler>({ required: true });
const selectedModule = computed({
	get() {
		return filter.value.module == null ? "no value" : filter.value.module.name;
	},

	set(name: string) {
		handleSelectModule(name);
	},
});

function handleSelectModule(moduleName: string | undefined) {
	if (!moduleName || moduleName == "") {
		filter.value.detachModule();
		return;
	}

	const newModule = sources.modules.find(module => {
		return module.name == moduleName;
	});

	if (!newModule) return;

	filter.value.attachModule(newModule);
}

function deleteFilter() {
	filter.value.detachModule();
	emit("delete", filter.value);
}

const emit = defineEmits<{
	(e: "delete", value: FilterHandler | undefined): void;
}>();
</script>

<style lang="scss" scoped>
$handle-padding: 1rem;
$disabled-color: gray;

.filterCard {
	background-color: $bg-color-2;
	display: flex;
	width: 100%;
	height: 100%;

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
		max-height: v-bind(MAX_CARD_HEIGHT);

		padding: $gap-df;
		width: 100%;
		display: grid;
		grid-template-columns:
			[handle-end controls-start] minmax(50px, 1fr)
			[controls-end main-start] minmax(200px, 8fr);

		grid-template-rows: minmax(10px, 1fr);
		gap: $gap-bg;

		@include respond(tab-port) {
			gap: $gap-sm;
		}
	}

	.delete-btn {
		&__icon {
			padding: 0.2rem;
			@include iconButton;
		}
	}

	&__controls {
		// width: 100%;
		// height: 100%;
		// flex: 1;

		// max-height: 100%;
		// display: flex;
		// justify-content: center;
		// align-items: center;

		// flex-direction: column;

		height: 100%;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: space-between;

		&__slider {
			flex-direction: column-reverse;
		}

		&__chip {
			font-size: 1.2rem;
			flex-flow: 0;
		}
	}

	&__analyser {
		background-color: $bg-color-1;
		border-radius: 0.5rem;
		margin-top: $gap-df;
		margin-bottom: $gap-df;

		max-height: 60%;
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
}
</style>
