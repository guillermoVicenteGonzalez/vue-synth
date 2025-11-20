<template>
	<EffectCard v-model="delayEffect.disabled" title="DELAY" class="DelayEffect">
		<template #body>
			<div class="DelayEffect__body">
				<div class="DelayEffect__body__controls">
					<div class="DelayEffect__control">
						<VsChip class="DelayEffect__chip">Rate</VsChip>
						<CircleSlider
							:disabled="delayEffect.disabled"
							v-model="delayEffect.rate"
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
							:disabled="delayEffect.disabled"
							v-model="delayEffect.feedback"
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
			flex: 0 0 15rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			justify-content: space-between;
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
		width: 70%;
		font-size: 1.6rem;
		text-align: center;
	}
}
</style>
