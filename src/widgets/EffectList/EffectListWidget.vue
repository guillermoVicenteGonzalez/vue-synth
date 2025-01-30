<template>
	<div v-if="sources" class="effectList">
		<FilterWidget
			v-for="(_effect, index) in effects"
			:key="index"
			v-model:filter="effects[index] as BiquadFilterNode"
			:context="context"
			:sources="sources"
			@delete="deleteEffect(index)"
		></FilterWidget>
	</div>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import type { AudioEffect } from "@/models/AudioModule";
import FilterWidget from "../Filter/FilterWidget.vue";

interface EffectListWidgetProps {
	sources: AudioCluster;
	context: AudioContext;
}

const { sources, context } = defineProps<EffectListWidgetProps>();
const effects = defineModel<(AudioEffect | undefined)[]>({ default: [] });

function deleteEffect(index: number) {
	const deletedEffects = effects.value.splice(index, 1);
	deletedEffects[0] = undefined; //for garbage collection
}
</script>

<style lang="scss" scoped>
.effectList {
	height: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 1rem;
	padding: 1rem;
}
</style>
