<template>
	<EffectCard v-model="reverb.disabled" title="Reverb" class="ReverbEffect">
		<template #body>
			<div class="ReverbEffect__body">
				<div class="ReverbEffect__control">
					<VsChip>Room size</VsChip>
					<CircleSlider
						v-model="reverb.roomSize"
						:min="0"
						:max="1"
						:step="0.001"
						s
					></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip>Dampening</VsChip>
					<CircleSlider
						v-model="reverb.dampening"
						:min="0"
						:max="MAX_REVERB_DAMPENING"
					></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip>Pre Delay</VsChip>
					<CircleSlider
						v-model="reverb.preDelay"
						:min="0"
						:max="MAX_REVERB_PRE_DELAY"
					></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip>Pre High Cut</VsChip>
					<CircleSlider v-model="reverb.preHighCut" :max="10000"></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip>Pre Low Cut</VsChip>
					<CircleSlider v-model="reverb.preLowCut" :max="10000"></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip>Mix</VsChip>
					<CircleSlider v-model="reverb.mix" :min="0" :max="100"></CircleSlider>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import {
	MAX_REVERB_DAMPENING,
	MAX_REVERB_PRE_DELAY,
	ReverbEffect,
} from "@/models/effects/ReverbEffect";
import EffectCard from "./EffectCard.vue";
const reverb = defineModel<ReverbEffect>({ required: true });
</script>

<style scoped lang="scss">
.ReverbEffect {
	&__body {
		display: flex;
		flex-wrap: wrap;
	}

	&__control {
		display: flex;
		flex-direction: column;
	}
}
</style>
