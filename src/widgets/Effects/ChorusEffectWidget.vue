<template>
	<EffectCard v-model="chorus.disabled" class="ChorusEffect">
		<template #body>
			<div class="ChorusEffect__body">
				<CircleSlider
					v-model="chorus.amount"
					:min="0.001"
					:max="0.01"
					:step="0.001"
				></CircleSlider>
				<CircleSlider v-model="chorus.rate"></CircleSlider>
				<CircleSlider></CircleSlider>
				<CircleSlider></CircleSlider>
				<CircleSlider></CircleSlider>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import type ChorusEffect from "@/models/effects/ChorusEffect";
import EffectCard from "./EffectCard.vue";

const chorus = defineModel<ChorusEffect>({ required: true });
</script>
