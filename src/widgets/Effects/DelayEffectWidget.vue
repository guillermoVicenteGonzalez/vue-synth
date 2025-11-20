<template>
	<EffectCard v-model="delayEffect.disabled" title="DELAY" class="DelayEffect">
		<template #body>
			<div class="DelayEffect__body">
				<div class="DelayEffect__body__controls">
					<div class="DelayEffect__control">
						<VsChip class="DelayEffect__chip">Rate</VsChip>
						<CircleSlider
							v-model="delayEffect.rate"
							:disabled="delayEffect.disabled"
							class="DelayEffect__circle-slider"
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
						></CircleSlider>
					</div>
					<div class="DelayEffect__control">
						<VsChip class="DelayEffect__chip">Feedback</VsChip>
						<CircleSlider
							v-model="delayEffect.feedback"
							:disabled="delayEffect.disabled"
							class="DelayEffect__circle-slider"
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
						></CircleSlider>
					</div>
					<div class="DelayEffect__control">
						<VsChip class="DelayEffect__chip">Gain</VsChip>
						<CircleSlider
							v-model="delayEffect.gain"
							:disabled="delayEffect.disabled"
							class="DelayEffect__circle-slider"
							:fill-color="primaryColor"
							:min="0"
							:max="1"
							:step="0.01"
						></CircleSlider>
					</div>
				</div>

				<div class="DelayEffect__body__visualization"></div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import DelayEffect from "@/models/effects/DelayEffect";
import EffectCard from "./EffectCard.vue";

const primaryColor = "#42d392";

const delayEffect = defineModel<DelayEffect>({ required: true });
</script>

<style lang="scss" scoped>
.DelayEffect {
	&__body {
		display: flex;
		width: 100%;
		height: 100%;
		gap: $gap-df;

		&__controls {
			flex: 0 0 30rem;
			display: flex;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);

			align-items: center;
			height: 100%;
			justify-content: space-between;

			gap: $gap-df;
		}

		&__visualization {
			flex: 1 1 100%;
			background-color: red;
		}
	}

	&__control {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		gap: $gap-df;
	}

	&__circle-slider {
		color: $text-color;
	}

	&__chip {
		width: 100%;
		font-size: 1.6rem;
		text-align: center;
	}
}
</style>
