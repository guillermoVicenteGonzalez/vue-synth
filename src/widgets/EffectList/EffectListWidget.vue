<template>
	<div class="effectList">
		<FilterWidget
			v-for="(_effect, index) in effects"
			:key="index"
			v-model:filter="effects[index] as BiquadFilterNode"
			:context="context"
			:sources="sources"
		></FilterWidget>
	</div>
</template>

<script setup lang="ts">
import type AudioModule from "@/models/AudioModule";
import type { AudioEffect } from "@/models/AudioModule";
import FilterWidget from "../Filter/FilterWidget.vue";

interface EffectListWidgetProps {
	sources: AudioModule[];
	context: AudioContext;
}

const { sources, context } = defineProps<EffectListWidgetProps>();
const effects = defineModel<AudioEffect[]>({ default: [] });
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
