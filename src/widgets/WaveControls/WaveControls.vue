<template>
	<div class="wave-controls">
		<ModuleCardListWidget v-model="cluster"></ModuleCardListWidget>
		<EffectListWidget
			v-if="cluster"
			v-model="effects"
			:context="context"
			:sources="cluster"
		></EffectListWidget>
		<div class="wave-controls__actions">
			<slot name="actions"></slot>
		</div>
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
.wave-controls {
	width: 100%;
	height: 100%;
	background-color: red;
	display: grid;
	grid-template-columns: 4fr 3fr;
	grid-template-rows: minmax(75%, 10fr) minmax(3.5rem, 1fr);
	gap: 0.5rem;

	&__actions {
		grid-column: 1/-1;
		// background-color: transparent;
		// position: relative;
		// bottom: 0;
		// height: fit-content;
		// padding: 1rem;
		gap: 1rem;
	}
}
</style>
