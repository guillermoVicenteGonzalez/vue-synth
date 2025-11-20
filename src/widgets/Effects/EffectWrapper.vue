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
	</div>
</template>

<script setup lang="ts">
import { AudioEffect } from "@/models/effects/AudioEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { computed } from "vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";
import DelayEffectWidget from "./DelayEffectWidget.vue";
import FilterEffectWidget from "./FilterEffectWidget.vue";
import FlangerEffectWidget from "./FlangerEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof CompressionEffect) return "CompressionEffect";

	if (effect.value instanceof FilterEffect) return "FilterEffect";

	if (effect.value instanceof FlangerEffect) return "FlangerEffect";

	if (effect.value instanceof DelayEffect) return "DelayEffect";
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
