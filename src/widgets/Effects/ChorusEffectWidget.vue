<template>
	<EffectCard v-model="chorus.disabled" class="ChorusEffect" title="Chorus">
		<template #body>
			<div class="ChorusEffect__body">
				<div class="ChorusEffect__controls">
					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">amount</VsChip>
						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.amount"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_AMOUNT"
							:max="MAX_AMOUNT"
							:step="0.001"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">rate</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.rate"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_RATE"
							:max="MAX_RATE"
							:step="0.001"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">Delay 1</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.delay1"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_DELAY"
							:max="MAX_DELAY"
							:step="0.001"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">Delay 2</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.delay2"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_DELAY"
							:max="MAX_DELAY"
							:step="0.001"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">MIX</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.mix"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_MIX"
							:max="MAX_MIX"
							:step="0.1"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">voices</VsChip>
						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.voices"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="0"
							:max="MAX_VOICES"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">Feedback delay</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.feedbackDelay"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_FEEDBACK_DELAY"
							:max="MAX_FEEDBACK_DELAY"
							:step="0.001"
						></CircleSlider>
					</div>

					<div class="ChorusEffect__control">
						<VsChip class="ChorusEffect__chip">Feedback</VsChip>

						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.feedback"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="MIN_FEEDBACK"
							:max="MAX_FEEDBACK"
							:step="0.01"
						></CircleSlider>
					</div>
				</div>
				<div class="ChorusEffect__filter-controls">
					<VsChip class="ChorusEffect__chip">Filter controls</VsChip>

					<div class="ChorusEffect__filter-controls__body">
						<VsSelector
							v-model="chorus.filterType"
							:items="filterTypes"
						></VsSelector>
						<CircleSlider
							:disabled="chorus.disabled"
							v-model="chorus.filterCuttof"
							class="ChorusEffect__circle-slider"
							:fill-color="primaryColor"
							:min="0"
							:max="10000"
						></CircleSlider>
					</div>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import type ChorusEffect from "@/models/effects/ChorusEffect";
import {
	MAX_AMOUNT,
	MAX_DELAY,
	MAX_FEEDBACK,
	MAX_FEEDBACK_DELAY,
	MAX_MIX,
	MAX_RATE,
	MAX_VOICES,
	MIN_AMOUNT,
	MIN_DELAY,
	MIN_FEEDBACK,
	MIN_FEEDBACK_DELAY,
	MIN_MIX,
	MIN_RATE,
} from "@/models/effects/ChorusEffect";
import EffectCard from "./EffectCard.vue";

const primaryColor = "#42d392";

const filterTypes = ["lowpass", "highpass", "allpass", "bandpass"];
const chorus = defineModel<ChorusEffect>({ required: true });
</script>

<style lang="scss" scoped>
.ChorusEffect {
	&__body {
		display: flex;
		height: 100%;
		gap: $gap-df;
	}

	&__filter-controls {
		height: 100%;
		flex: 1 0 10rem;

		display: flex;
		flex-direction: column;
		gap: $gap-df;

		&__body {
			display: flex;
			align-items: center;
			gap: $gap-df;
		}
	}

	&__controls {
		gap: $gap-df;

		// width: 100%;
		flex: 1 1 45rem;
		height: 100%;
		display: grid;
		// grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 2fr;
		grid-template-columns: repeat(4, 1fr);

		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	&__control {
		display: flex;
		flex-direction: column;
		gap: $gap-df;
		align-items: center;
	}

	&__chip {
		width: 100%;
		font-size: 1.6rem;
		text-align: center;
	}

	&__circle-slider {
		color: $text-color;
	}
}
</style>
