<template>
	<EffectCard v-model="wah.disabled" title="WAH" class="WahEffect">
		<template #body>
			<div class="WahEffect__body">
				<div class="WahEffect__left">
					<div class="WahEffect__control">
						<VsChip class="WahEffect__chip">Speed</VsChip>
						<CircleSlider
							class="WahEffect__slider"
							:disabled="isSpeedDisabled"
							v-model="wah.speed"
							:step="0.1"
							:min="MIN_WAH_SPEED"
							:max="MAX_WAH_SPEED"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip class="WahEffect__chip">Depth</VsChip>
						<CircleSlider
							class="WahEffect__slider"
							:disabled="isDepthDisabled"
							v-model="wah.depth"
							:min="MIN_WAH_DEPTH"
							:max="MAX_WAH_DEPTH"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip class="WahEffect__chip">Cutoff</VsChip>
						<CircleSlider
							class="WahEffect__slider"
							v-model="wah.cutoff"
							:min="MIN_WAH_CUTOFF"
							:max="MAX_WAH_CUTOFF"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip class="WahEffect__chip">Delay</VsChip>
						<CircleSlider
							class="WahEffect__slider"
							v-model="wah.delay"
							:min="MIN_WAH_DELAY"
							:max="MAX_WAH_DELAY"
							:step="0.01"
						></CircleSlider>
					</div>
					<div class="WahEffect__control">
						<VsChip class="WahEffect__chip">Mix</VsChip>
						<CircleSlider
							class="WahEffect__slider"
							v-model="wah.mix"
							:min="MIN_WAH_MIX"
							:max="MAX_WAH_MIX"
						></CircleSlider>
					</div>
				</div>

				<div class="WahEffect__right">
					<div class="WahEffect__selectors">
						<VsSelector
							v-model="wah.type"
							:items="Object.values(WahTypes)"
						></VsSelector>
						<VsSelector
							:items="Object.values(waveForms)"
							v-model="wah.lfoForm"
						></VsSelector>
					</div>

					<div class="WahEffect__visualization">
						<WaveCanvas
							:line-color="lineColor"
							:line-width="10"
							:wave="wah.lfoWave"
							:canvas-height="3000"
							:canvas-width="4000"
						></WaveCanvas>
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
import WaveCanvas from "@/components/waves/WaveCanvas/WaveCanvas.vue";
import { waveForms } from "@/models/wave";
import { computed } from "vue";
import EffectCard from "./EffectCard.vue";

const lineColor = "#F20BC6";

const wah = defineModel<WahEffect>({ required: true });
const isDepthDisabled = computed(
	() => wah.value.disabled || wah.value.type == WahTypes.tremolo
);
const isSpeedDisabled = computed(
	() => wah.value.disabled || wah.value.type == WahTypes.tremolo
);
</script>

<style lang="scss" scoped>
.WahEffect {
	&__body {
		display: flex;
		width: 100%;
		height: 100%;
		gap: $gap-df;
	}

	&__left {
		align-self: center;
		justify-self: center;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: $gap-df;

		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
		flex: 0 0 35rem;
	}

	&__control {
		display: flex;
		flex-direction: column;
		gap: $gap-df;
		align-items: center;
	}

	&__selectors {
		display: flex;
		gap: $gap-df;
	}

	&__right {
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		gap: $gap-df;
	}

	&__visualization {
		flex: 1 1 100%;
		background-color: $bg-color-1;
		gap: $gap-df;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	&__chip {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
	}

	&__slider {
		color: $text-color;
	}
}
</style>
