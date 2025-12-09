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

				<CircleSlider v-model="distortion.mix"></CircleSlider>
			</div>
		</template>
	</EffectCard>
</template>

<script lang="ts" setup>
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import DistortionEffect, {
	DistortionFilterPositions,
	DistortionTypes,
	MAX_DISTORTION_CUTOFF,
	MIN_DISTORTION_CUTOFF,
} from "@/models/effects/DistortionEffect";
import EffectCard from "./EffectCard.vue";

const distortion = defineModel<DistortionEffect>({ required: true });
</script>
