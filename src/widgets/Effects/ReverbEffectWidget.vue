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
					<VsChip>Delay</VsChip>
					<CircleSlider v-model="reverb.delay" :min="0" :max="1"></CircleSlider>
				</div>
				<div class="ReverbEffect__control">
					<VsChip></VsChip>
					<CircleSlider></CircleSlider>
				</div>
				<div class="ReverbEffect__control"></div>
				<div class="ReverbEffect__control"></div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import {
	MAX_REVERB_DAMPENING,
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
