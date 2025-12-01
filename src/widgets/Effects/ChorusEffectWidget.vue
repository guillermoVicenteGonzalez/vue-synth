<template>
	<EffectCard v-model="chorus.disabled" class="ChorusEffect">
		<template #body>
			<div class="ChorusEffect__body">
				<CircleSlider
					v-model="chorus.amount"
					:min="MIN_AMOUNT"
					:max="MAX_AMOUNT"
					:step="0.001"
				></CircleSlider>
				<VsChip :min="0.01" :max="1" :step="0.01">amount</VsChip>
				<CircleSlider
					v-model="chorus.rate"
					:min="MIN_RATE"
					:max="MAX_RATE"
					:step="0.001"
				></CircleSlider>
				<VsChip>rate</VsChip>

				<CircleSlider
					v-model="chorus.delay1"
					:min="MIN_DELAY"
					:max="MAX_DELAY"
					:step="0.001"
				></CircleSlider>
				<VsChip>Delay 1</VsChip>
				<CircleSlider
					v-model="chorus.delay2"
					:min="MIN_DELAY"
					:max="MAX_DELAY"
					:step="0.001"
				></CircleSlider>
				<VsChip>Delay 2</VsChip>

				<CircleSlider
					v-model="chorus.mix"
					:min="MIN_MIX"
					:max="MAX_MIX"
					:step="0.1"
				></CircleSlider>
				<VsChip>MIX</VsChip>

				<CircleSlider
					v-model="chorus.voices"
					:min="0"
					:max="MAX_VOICES"
				></CircleSlider>
				<VsChip>voices</VsChip>

				<VsSelector
					v-model="chorus.filterType"
					:items="filterTypes"
				></VsSelector>
				<CircleSlider
					v-model="chorus.filterCuttof"
					:min="0"
					:max="10000"
				></CircleSlider>
				<VsChip>Filter cutoff</VsChip>

				<CircleSlider
					v-model="chorus.feedback"
					:min="MIN_FEEDBACK"
					:max="MAX_FEEDBACK"
					:step="0.01"
				></CircleSlider>

				<VsChip>Feedback</VsChip>

				<CircleSlider
					v-model="chorus.feedbackDelay"
					:min="0.1"
					:max="0.5"
					:step="0.001"
				></CircleSlider>

				<VsChip>Feedback delay</VsChip>
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
	MAX_MIX,
	MAX_RATE,
	MAX_VOICES,
	MIN_AMOUNT,
	MIN_DELAY,
	MIN_FEEDBACK,
	MIN_MIX,
	MIN_RATE,
} from "@/models/effects/ChorusEffect";
import EffectCard from "./EffectCard.vue";

const filterTypes = ["lowpass", "highpass", "allpass", "bandpass"];
const chorus = defineModel<ChorusEffect>({ required: true });
</script>

<style lang="scss" scoped>
.ChorusEffect {
	&__body {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
