<template>
	<ModuleCardListWidget v-model="cluster"></ModuleCardListWidget>
	<EffectListWidget
		v-if="cluster"
		v-model="effects"
		:context="context"
		:sources="cluster"
	></EffectListWidget>
	<div class="wave-controls--actions">
		<slot name="actions"></slot>
	</div>
</template>

<script setup lang="ts">
import AudioCluster from "@/models/AudioCluster";
import type { AudioEffect } from "@/models/AudioModule";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import EffectListWidget from "../EffectList/EffectListWidget.vue";

interface WaveControlsProps {
	context: AudioContext;
}

const cluster = defineModel<AudioCluster | undefined>("cluster", {});

const effects = defineModel<(AudioEffect | undefined)[]>("effects", {
	default: [],
});

const { context } = defineProps<WaveControlsProps>();
</script>

<style lang="scss" scoped>
.wave-control {
	&--actions {
		grid-column: 1/-1;
		background-color: transparent;
		position: relative;
		bottom: 0;
		height: fit-content;
		padding: 1rem;
		gap: 1rem;
	}
}
</style>
