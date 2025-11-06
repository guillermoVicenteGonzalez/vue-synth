<template>
	<!-- <component v-if="effect" v-model="effect" :is="componentType"></component> -->
	<template v-if="effectType == 'DynamicsCompressorNode'">
		<CompressionEffectWidget
			v-model="effect as DynamicsCompressorNode"
		></CompressionEffectWidget>
	</template>
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
