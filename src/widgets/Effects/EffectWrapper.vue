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
			v-model="effect as ReverbEffect"
			v-if="effectType == 'ReverbEffect'"
		></ReverbEffectWidget>
	</div>
</template>

<script setup lang="ts">
import { AudioEffect } from "@/models/effects/AudioEffect";
import ChorusEffect from "@/models/effects/ChorusEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import { computed } from "vue";
import ChorusEffectWidget from "./ChorusEffectWidget.vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";
import DelayEffectWidget from "./DelayEffectWidget.vue";
import FilterEffectWidget from "./FilterEffectWidget.vue";
import FlangerEffectWidget from "./FlangerEffectWidget.vue";
import ReverbEffectWidget from "./ReverbEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof CompressionEffect) return "CompressionEffect";

	if (effect.value instanceof FilterEffect) return "FilterEffect";

	if (effect.value instanceof FlangerEffect) return "FlangerEffect";

	if (effect.value instanceof DelayEffect) return "DelayEffect";

	if (effect.value instanceof ChorusEffect) return "ChorusEffect";

	if (effect.value instanceof ReverbEffect) return "ReverbEffect";
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
