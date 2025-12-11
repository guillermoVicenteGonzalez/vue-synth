<template>
	<EffectCard v-model="wah.disabled" title="WAH" class="WahEffect">
		<template #body>
			<div class="WahEffect__body">
				<div class="WahEffect__controls">
					<VsSelector
						:items="Object.values(WahTypes)"
						v-model="wah.type"
					></VsSelector>
					<div class="WahEffect__control">
						<VsChip>Speed</VsChip>
						<CircleSlider
							v-model="wah.speed"
							:min="MIN_WAH_SPEED"
							:max="MAX_WAH_SPEED"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip>Depth</VsChip>
						<CircleSlider
							v-model="wah.depth"
							:min="MIN_WAH_DEPTH"
							:max="MAX_WAH_DEPTH"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip>Cutoff</VsChip>
						<CircleSlider
							v-model="wah.cutoff"
							:min="MIN_WAH_CUTOFF"
							:max="MAX_WAH_CUTOFF"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip>Delay</VsChip>
						<CircleSlider
							v-model="wah.delay"
							:min="MIN_WAH_DELAY"
							:max="MAX_WAH_DELAY"
							:step="0.01"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip>Mix</VsChip>
						<CircleSlider
							v-model="wah.mix"
							:min="MIN_WAH_MIX"
							:max="MAX_WAH_MIX"
						></CircleSlider>
					</div>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script lang="ts" setup>
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import WahEffect, {
	MAX_WAH_CUTOFF,
	MAX_WAH_DELAY,
	MAX_WAH_DEPTH,
	MAX_WAH_MIX,
	MAX_WAH_SPEED,
	MIN_WAH_CUTOFF,
	MIN_WAH_DELAY,
	MIN_WAH_DEPTH,
	MIN_WAH_MIX,
	MIN_WAH_SPEED,
	WahTypes,
} from "@/models/effects/WahEffect";

import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import EffectCard from "./EffectCard.vue";

const wah = defineModel<WahEffect>({ required: true });
</script>

<style lang="scss" scoped>
.WahEffect {
	&__body {
		display: flex;
	}

	&__controls {
		display: flex;
	}

	&__control {
		display: flex;
		flex-direction: column;

		align-items: center;
	}
}
</style>
