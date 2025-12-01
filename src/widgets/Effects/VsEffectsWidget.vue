<template>
	<div v-if="effects" class="VsEffectsWidget">
		<EffectWrapper
			v-for="(_effect, index) in effectsArray"
			:key="index"
			v-model="effectsArray[index]"
		></EffectWrapper>
	</div>
</template>

<script setup lang="ts">
import { AudioEffect } from "@/models/effects/AudioEffect";
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
	flex-direction: column;
	width: 100%;
	height: 100%;

	padding: $gap-df;
	gap: $gap-df;

	overflow-y: auto;
}
</style>
