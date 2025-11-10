<template>
	<!-- <component v-if="effect" v-model="effect" :is="componentType"></component> -->
	<CompressionEffectWidget
		v-if="effectType == 'DynamicsCompressorNode'"
		v-model="effect as DynamicsCompressorNode"
		class="EffectModule"
	></CompressionEffectWidget>
</template>

<script setup lang="ts">
import type { AudioEffect } from "@/models/AudioModule";
import { computed } from "vue";
import CompressionEffectWidget from "./CompressionEffectWidget.vue";

const effect = defineModel<AudioEffect>();

const effectType = computed(() => {
	if (effect.value instanceof DynamicsCompressorNode)
		return "DynamicsCompressorNode";
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
