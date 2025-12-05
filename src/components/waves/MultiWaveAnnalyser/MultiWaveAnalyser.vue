<template>
	<div class="MultiWaveAnalyser">
		<template v-for="(source, index) in sources" :key="index">
			<WaveAnalyser
				v-if="!source.disabled"
				:canvas-height="canvasHeight"
				:canvas-width="canvasWidth"
				:source="source.node"
				:line-color="source.color"
				class="MultiWaveAnalyser__analyser"
			></WaveAnalyser
		></template>
	</div>
</template>

<script setup lang="ts">
import WaveAnalyser from "../WaveAnalyser/WaveAnalyser.vue";

export interface analyserSource {
	node: AudioNode;
	color?: string;
	disabled?: boolean;
}

interface MultiWaveAnalyserProps {
	sources: analyserSource[];
	canvasWidth?: number;
	canvasHeight?: number;
}

const {
	sources = [],
	canvasHeight,
	canvasWidth,
} = defineProps<MultiWaveAnalyserProps>();
</script>

<style scoped lang="scss">
.MultiWaveAnalyser {
	width: 100%;
	height: 100%;
	position: relative;

	&__analyser {
		position: absolute;
		top: 0;
		left: 0;
		background-color: transparent;
	}
}
</style>
