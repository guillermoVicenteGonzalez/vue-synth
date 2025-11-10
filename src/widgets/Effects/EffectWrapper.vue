<template>
	<!-- <component v-if="effect" v-model="effect" :is="componentType"></component> -->
	<CompressionEffectWidget
		v-if="effectType == 'DynamicsCompressorNode'"
		v-model="effect as DynamicsCompressorNode"
		class="EffectModule"
	></CompressionEffectWidget>

	<FilterEffectWidget
		v-if="effectType == 'BiquadFilterNode'"
		v-model="effect as BiquadFilterNode"
		class="EffectModule"
	>
	</FilterEffectWidget>
</template>

<script setup lang="ts">
import type { AudioEffect } from "@/models/AudioModule";
import { computed } from "vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";
import FilterEffectWidget from "./FilterEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof DynamicsCompressorNode)
		return "DynamicsCompressorNode";

	if (effect.value instanceof BiquadFilterNode) return "BiquadFilterNode";
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
