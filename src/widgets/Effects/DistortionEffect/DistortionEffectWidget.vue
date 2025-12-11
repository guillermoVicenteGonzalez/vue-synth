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
							:items="Object.values(DistortionFilterPositions)"
						></VsSelector>
						<VsChip class="DistortionEffect__chip">Filter type</VsChip>

						<VsSelector
							v-model.number="distortion.filterType"
							:items="Object.values(DistortionFilterTypes)"
						></VsSelector>

						<VsChip class="DistortionEffect__chip">Distortion type</VsChip>

						<VsSelector
							v-model.number="distortion.distortionType"
							:items="Object.values(DistortionTypes)"
						></VsSelector>
					</div>

					<div class="DistortionEffect__sliders">
						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Cutoff</VsChip>

							<CircleSlider
								v-model="distortion.cutoff"
								:max="MAX_DISTORTION_CUTOFF"
								:min="MIN_DISTORTION_CUTOFF"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Threshold</VsChip>
							<CircleSlider
								v-model="distortion.threshold"
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
								:disabled="!nBitsEnabled"
								:min="MIN_DISTORTION_NBITS"
								:max="MAX_DISTORTION_NBITS"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Drive</VsChip>
							<CircleSlider
								v-model="distortion.drive"
								:disabled="!driveEnabled"
								:step="0.1"
								:min="0"
								:max="5"
							></CircleSlider>
						</div>

						<div class="DistortionEffect__control">
							<VsChip class="DistortionEffect__chip">Mix</VsChip>
							<CircleSlider v-model="distortion.mix"></CircleSlider>
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
	</EffectCard>
</template>

<script lang="ts" setup>
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
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
		distortion.value.distortionType != DistortionTypes.bitcrush &&
		!distortion.value.disabled
);
</script>

<style lang="scss" scoped>
.DistortionEffect {
	&__body {
		display: flex;
		gap: $gap-bg;

		&__controls {
			width: 100%;
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
	}

	&__control {
		display: flex;
		flex-direction: column;
		color: $text-color;
		gap: $gap-df;
		justify-content: center;
		align-items: center;
	}

	&__chip {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
	}

	&__circle-slider {
	}
}
</style>
