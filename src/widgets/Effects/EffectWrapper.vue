<template>
	<div v-if="effect">
		<!-- <component v-if="effect" v-model="effect" :is="componentType"></component> -->
		<CompressionEffectWidget
			v-if="effectType == 'CompressionEffect'"
			v-model="effect.inputNode as DynamicsCompressorNode"
			class="EffectModule"
		></CompressionEffectWidget>

		<FilterEffectWidget
			v-if="effectType == 'FilterEffect'"
			v-model="effect.inputNode as BiquadFilterNode"
			class="EffectModule"
		>
		</FilterEffectWidget>
	</div>
</template>

<script setup lang="ts">
import {
	AudioEffect,
	CompressionEffect,
	FilterEffect,
} from "@/models/effects/AudioEffect";
import { computed } from "vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";
import FilterEffectWidget from "./FilterEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof CompressionEffect) return "CompressionEffect";

	if (effect.value instanceof FilterEffect) return "FilterEffect";
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

.EffectModule {
	width: 100%;
	height: $module-height;
}
</style>
