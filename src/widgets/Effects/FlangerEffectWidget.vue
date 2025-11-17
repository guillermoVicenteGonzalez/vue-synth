<template>
	<EffectCard class="FlangerEffect" v-model="flanger.disabled">
		<template #body>
			<div class="FlangerEffect__body">
				<div class="FlangerEffect__body__controls">
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Delay</VsChip>
						<CircleSlider
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
							class="FlangerEffect__circle-slider"
							v-model="flanger.delay"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Depth</VsChip>
						<CircleSlider
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
							class="FlangerEffect__circle-slider"
							v-model="flanger.depth"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Feedback</VsChip>
						<CircleSlider
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
							class="FlangerEffect__circle-slider"
							v-model="flanger.feedback"
						></CircleSlider>
					</div>
					<div class="FlangerEffect__control">
						<VsChip class="FlangerEffect__chip">Speed</VsChip>
						<CircleSlider
							:fill-color="primaryColor"
							:min="0"
							:max="100"
							:step="1"
							class="FlangerEffect__circle-slider"
							v-model="flanger.speed"
						></CircleSlider>
					</div>
				</div>

				<div class="FlangerEffect__body__display"></div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import type { FlangerEffect } from "@/models/effects/FlangerEffect";
import EffectCard from "./EffectCard.vue";

const flanger = defineModel<FlangerEffect>({ required: true });
const primaryColor = "#42d392";
</script>

<style lang="scss" scoped>
$max-controls-width: 22rem;
$control-width: 40%;

.FlangerEffect {
	&__body {
		display: flex;
		height: 100%;

		&__controls {
			display: flex;
			height: 100%;
			flex: 0 0 $max-controls-width;
			flex-wrap: wrap;
			gap: $gap-df;
		}
	}

	&__control {
		width: $control-width;
		display: flex;
		gap: $gap-df;
		flex-direction: column;
	}

	&__chip {
		font-size: 1.6rem;
		width: 100%;
		text-align: center;
	}
}
</style>
