<template>
	<EffectCard v-model="disabled" title="Filter">
		<template #body>
			<div v-if="filter" class="Filter">
				<div class="Filter__controls">
					<VsSlider
						v-model="filter.frequency.value"
						:min="0"
						:max="10000"
						class="Filter__controls__slider"
						orientation="vertical"
					>
						<template #label>
							<VsChip class="Filter__controls__chip">Cutoff</VsChip>
						</template>
					</VsSlider>
				</div>
				<div class="Filter__body">
					<VsSelector
						v-model="filter.type"
						class="Filter__body__selector"
						:items="Object.keys(FilterTypes)"
					></VsSelector>
					<WaveAnalyser
						:line-color="primaryColor"
						class="Filter__analyser"
						:source="filter"
						:canvas-width="canvasZoom"
					></WaveAnalyser>
					<VsSlider v-model="canvasZoom"></VsSlider>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import { FilterTypes } from "@/models/FilterHandler";
import { ref } from "vue";
import EffectCard from "./EffectCard.vue";

const primaryColor = "#42d392";

const disabled = ref<boolean>(false);
const filter = defineModel<BiquadFilterNode>();
const canvasZoom = ref<number>(600);
</script>

<style scoped lang="scss">
$min-controls-w: 15rem;

.Filter {
	width: 100%;
	height: 100%;
	padding: $gap-df;

	display: grid;
	grid-template-columns:
		[controls-start] minmax($min-controls-w, 1fr)
		[controls-end body-start] minmax(200px, 8fr);

	grid-template-rows: minmax(10px, 1fr);

	&__body {
		display: flex;
		flex-direction: column;

		gap: $gap-df;
		width: 100%;
		height: 100%;

		&__selector {
			flex: 0 0 3rem;
		}
	}

	&__controls {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;

		&__slider {
			flex: 0 0 100%;
			flex-direction: column-reverse;
		}

		&__chip {
			font-size: 1.6rem;
			width: 100%;
			text-align: center;
		}
	}

	&__analyser {
		background-color: $bg-color-1;
		border-radius: 0.5rem;
	}
}
</style>
