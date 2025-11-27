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
					v-model="chorus.feedback"
					:min="MIN_GAIN"
					:max="MAX_GAIN"
					:step="0.1"
				></CircleSlider>
				<VsChip>feedback</VsChip>

				<CircleSlider
					v-model="chorus.voices"
					:min="0"
					:max="MAX_VOICES"
				></CircleSlider>
				<VsChip>voices</VsChip>

				<CircleSlider
					v-model="chorus.spread"
					:min="MIN_SPREAD"
					:max="MAX_SPREAD"
				></CircleSlider>
				<VsChip>Spread</VsChip>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import type ChorusEffect from "@/models/effects/ChorusEffect";
import {
	MAX_AMOUNT,
	MAX_GAIN,
	MAX_RATE,
	MAX_SPREAD,
	MAX_VOICES,
	MIN_AMOUNT,
	MIN_GAIN,
	MIN_RATE,
	MIN_SPREAD,
} from "@/models/effects/ChorusEffect";
import EffectCard from "./EffectCard.vue";

const chorus = defineModel<ChorusEffect>({ required: true });
</script>

<style lang="scss" scoped>
.ChorusEffect {
	&__body {
		display: flex;
	}
}
</style>
