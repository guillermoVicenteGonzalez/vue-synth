<template>
	<div v-if="effect">
		<!-- <component v-if="effect" v-model="effect" :is="componentType"></component> -->
		<CompressionEffectWidget
			v-if="effectType == 'CompressionEffect'"
			v-model="effect as CompressionEffect"
		></CompressionEffectWidget>

		<FilterEffectWidget
			v-if="effectType == 'FilterEffect'"
			v-model="effect as FilterEffect"
		>
		</FilterEffectWidget>

		<FlangerEffectWidget
			v-if="effectType == 'FlangerEffect'"
			v-model="effect as FlangerEffect"
		></FlangerEffectWidget>

		<DelayEffectWidget
			v-if="effectType == 'DelayEffect'"
			v-model="effect as DelayEffect"
		>
		</DelayEffectWidget>

		<ChorusEffectWidget
			v-if="effectType == 'ChorusEffect'"
			v-model="effect as ChorusEffect"
		></ChorusEffectWidget>

		<ReverbEffectWidget
			v-if="effectType == 'ReverbEffect'"
			v-model="effect as ReverbEffect"
		></ReverbEffectWidget>

		<DistortionEffectWidget
			v-if="effectType == 'DistortionEffect'"
			v-model="effect as DistortionEffect"
		></DistortionEffectWidget>

		<WahEffectWidget
			v-if="effectType == 'WahEffect'"
			v-model="effect as WahEffect"
		></WahEffectWidget>
	</div>
</template>

<script setup lang="ts">
import { AudioEffect } from "@/models/effects/AudioEffect";
import ChorusEffect from "@/models/effects/ChorusEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import DistortionEffect from "@/models/effects/DistortionEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import WahEffect from "@/models/effects/WahEffect";
import { computed } from "vue";
import ChorusEffectWidget from "./ChorusEffectWidget.vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";
import DelayEffectWidget from "./DelayEffectWidget.vue";
import DistortionEffectWidget from "./DistortionEffect/DistortionEffectWidget.vue";
import FilterEffectWidget from "./FilterEffectWidget.vue";
import FlangerEffectWidget from "./FlangerEffectWidget.vue";
import ReverbEffectWidget from "./ReverbEffectWidget.vue";
import WahEffectWidget from "./WahEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof CompressionEffect) return "CompressionEffect";

	if (effect.value instanceof FilterEffect) return "FilterEffect";

	if (effect.value instanceof FlangerEffect) return "FlangerEffect";

	if (effect.value instanceof DelayEffect) return "DelayEffect";

	if (effect.value instanceof ChorusEffect) return "ChorusEffect";

	if (effect.value instanceof ReverbEffect) return "ReverbEffect";

	if (effect.value instanceof DistortionEffect) return "DistortionEffect";

	if (effect.value instanceof WahEffect) return "WahEffect";
	return "unknown";
});

// const componentType = computed(() => {
// 	if (effect.value instanceof DynamicsCompressorNode)
// 		return CompressionEffectWidget;
// 	if (effect.value instanceof BiquadFilterNode) return FilterWidget;
// });
</script>

<style scoped lang="scss">
$module-height: 25rem;
</style>
