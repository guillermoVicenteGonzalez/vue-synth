<template>
	<EffectCard
		v-model="distortion.disabled"
		title="Distortion"
		class="DistortionEffect"
	>
		<template #body>
			<div class="DistortionEffect__body">
				<div class="DistortionEffect__body__controls">
					<div class="DistortionEffect__selectors">
						<VsChip class="DistortionEffect__chip">Filter Position</VsChip>

						<VsSelector
							v-model="distortion.filterPosition"
							class="DistortionEffect__selector"
							:items="Object.values(DistortionFilterPositions)"
						></VsSelector>
						<VsChip class="DistortionEffect__chip">Filter type</VsChip>

						<VsSelector
							v-model.number="distortion.filterType"
							class="DistortionEffect__selector"
							:items="Object.values(DistortionFilterTypes)"
						></VsSelector>

						<VsChip class="DistortionEffect__chip">Distortion type</VsChip>

						<VsSelector
							v-model.number="distortion.distortionType"
							class="DistortionEffect__selector"
							:items="Object.values(DistortionTypes)"
						></VsSelector>
					</div>

					<div class="DistortionEffect__sliders">
						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Cutoff</VsChip>

							<CircleSlider
								v-model="distortion.cutoff"
								:size="circleSliderSize"
								:disabled="distortion.disabled"
								:max="MAX_DISTORTION_CUTOFF"
								:min="MIN_DISTORTION_CUTOFF"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Threshold</VsChip>
							<CircleSlider
								v-model="distortion.threshold"
								:size="circleSliderSize"
								:disabled="!thresholdEnabled"
								:step="0.01"
								:min="MIN_DISTORTION_THRESHOLD"
								:max="MAX_DISTORTION_THRESHOLD"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">nBits</VsChip>
							<CircleSlider
								v-model="distortion.nBits"
								:size="circleSliderSize"
								:disabled="!nBitsEnabled"
								:min="MIN_DISTORTION_NBITS"
								:max="MAX_DISTORTION_NBITS"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Drive</VsChip>
							<CircleSlider
								v-model="distortion.drive"
								:size="circleSliderSize"
								:disabled="!driveEnabled"
								:step="0.1"
								:min="0"
								:max="5"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Mix</VsChip>
							<CircleSlider
								v-model="distortion.mix"
								:size="circleSliderSize"
								:disabled="distortion.disabled"
							></CircleSlider>
						</div>
					</div>
				</div>

				<div class="DistortionEffect__body__visualization">
					<DistortionPlotter
						:curve="distortion.distortionCurve"
					></DistortionPlotter>
				</div>
			</div>
		</template>

		<template #context-menu>
			<div class="DistortionEffect__context-menu">
				<ul>
					<li @click="distortion.resetEffect()">Reset effect</li>
				</ul>
			</div>
		</template>
	</EffectCard>
</template>

<script lang="ts" setup>
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import useCircleSliderSize from "@/composables/useCircleSliderSize";
import DistortionEffect, {
	DistortionFilterPositions,
	DistortionFilterTypes,
	DistortionTypes,
	MAX_DISTORTION_CUTOFF,
	MAX_DISTORTION_NBITS,
	MAX_DISTORTION_THRESHOLD,
	MIN_DISTORTION_CUTOFF,
	MIN_DISTORTION_NBITS,
	MIN_DISTORTION_THRESHOLD,
} from "@/models/effects/DistortionEffect";
import { computed } from "vue";
import EffectCard from "../EffectCard.vue";
import DistortionPlotter from "./DistortionPlotter.vue";

const distortion = defineModel<DistortionEffect>({ required: true });
const nBitsEnabled = computed<boolean>(
	() =>
		distortion.value.distortionType == DistortionTypes.bitcrush &&
		!distortion.value.disabled
);
const driveEnabled = computed<boolean>(
	() =>
		distortion.value.distortionType == DistortionTypes.softClip &&
		!distortion.value.disabled
);
const thresholdEnabled = computed<boolean>(
	() =>
		distortion.value.distortionType == DistortionTypes.hardClip &&
		!distortion.value.disabled
);

const circleSliderSize = useCircleSliderSize();
</script>

<style lang="scss" scoped>
$responsive-font-size: 1.3rem;
$responsive-selector-height: 2rem;

.DistortionEffect {
	&__body {
		display: flex;
		gap: $gap-bg;
		height: 100%;

		&__controls {
			width: 100%;
			height: 100%;
			// background-color: red;
			display: flex;
			gap: $gap-bg;
			flex: 1 0 50rem;
		}

		&__visualization {
			background-color: $bg-color-1;
			border-radius: 0.5rem;
			flex: 1 1 100%;
		}
	}

	&__selectors {
		flex: 1 0 15rem;
		display: flex;
		gap: $gap-df;
		flex-direction: column;
		justify-content: space-around;

		@include respond(tab-port) {
			.DistortionEffect__chip .DistortionEffect__selector {
				font-size: $responsive-font-size;
				height: $responsive-selector-height;
			}

			.DistortionEffect__selector > * {
				font-size: $responsive-font-size;
			}
		}
	}

	&__sliders {
		flex: 1 1 100%;
		height: 100%;
		display: grid;
		gap: $gap-df;

		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr 1fr;
		// align-items: center;
		// justify-items: baseline;
		// align-content: space-around;
		@include respond(tab-port) {
			gap: $gap-sm $gap-df;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		color: $text-color;
		gap: $gap-df;
		justify-content: center;
		align-items: center;

		@include respond(tab-port) {
			gap: $gap-sm;
		}
	}

	&__chip {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
	}

	&__circle-slider {
	}

	&__context-menu {
		@include contextMenu;
	}
}
</style>
