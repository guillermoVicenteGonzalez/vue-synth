<template>
	<div v-if="effects" class="VsEffectsWidget">
		<EffectWrapper
			v-for="(_effect, index) in effectsArray"
			v-model="effectsArray[index]"
			:key="index"
		></EffectWrapper>
	</div>
</template>

<script setup lang="ts">
import type { AudioEffect } from "@/models/AudioModule";
import { EffectChain } from "@/models/LinkedList";
import { computed } from "vue";
import EffectWrapper from "./EffectWrapper.vue";

const effects = defineModel<EffectChain>();
const effectsArray = computed<AudioEffect[]>(() => {
	if (!effects.value) return [];
	return effects.value.toArray();
});
</script>

<style lang="scss" scoped>
.VsEffectsWidget {
	display: flex;
	width: 100%;

	padding: $gap-df;
}
</style>
