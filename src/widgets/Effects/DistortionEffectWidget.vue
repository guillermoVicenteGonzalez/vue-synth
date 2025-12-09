<template>
	<EffectCard
		v-model="distortion.disabled"
		title="Distortion"
		class="DistortionEffect"
	>
		<template #body>
			<div class="DistortionEffect__body">
				<VsSelector
					v-model="distortion.filterPosition"
					:items="Object.values(DistortionFilterPositions)"
				></VsSelector>
				<VsSelector
					v-model.number="distortion.distortionType"
					:items="Object.values(DistortionTypes)"
				></VsSelector>

				<CircleSlider
					v-model="distortion.cutoff"
					:max="MAX_DISTORTION_CUTOFF"
					:min="MIN_DISTORTION_CUTOFF"
				></CircleSlider>

				<div class="DistortionEffect__control">
					<VsChip>Threshold</VsChip>
					<CircleSlider
						v-model="distortion.threshold"
						:min="MIN_DISTORTION_THRESHOLD"
						:max="MAX_DISTORTION_THRESHOLD"
					></CircleSlider>
				</div>

				<div class="DistortionEffect__control">
					<VsChip>nBits</VsChip>
					<CircleSlider
						v-model="distortion.nBits"
						:min="MIN_DISTORTION_NBITS"
						:max="MAX_DISTORTION_NBITS"
					></CircleSlider>
				</div>

				<CircleSlider v-model="distortion.mix"></CircleSlider>
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
	DistortionTypes,
	MAX_DISTORTION_CUTOFF,
	MAX_DISTORTION_NBITS,
	MAX_DISTORTION_THRESHOLD,
	MIN_DISTORTION_CUTOFF,
	MIN_DISTORTION_NBITS,
	MIN_DISTORTION_THRESHOLD,
} from "@/models/effects/DistortionEffect";
import EffectCard from "./EffectCard.vue";

const distortion = defineModel<DistortionEffect>({ required: true });
</script>

<style lang="scss" scoped>
.DistortionEffect {
	&__body {
		display: flex;
	}

	&__control {
		display: flex;
		flex-direction: column;
		color: $text-color;
	}
}
</style>
