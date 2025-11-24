<template>
	<div class="CompressionAnalyser">
		<WaveAnalyser
			:canvas-height="canvasHeight"
			:canvasWidth="canvasWidth"
			v-if="source"
			:line-color="secondaryColor"
			:source="source"
			class="CompressionAnalyser__source-analyser"
		></WaveAnalyser>
		<WaveAnalyser
			:canvasWidth="canvasWidth"
			:canvas-height="canvasHeight"
			v-if="compressedSource"
			:line-color="primaryColor"
			:source="compressedSource"
			class="CompressionAnalyser__compressed-source-analyser"
		></WaveAnalyser>
	</div>
</template>

<script setup lang="ts">
import WaveAnalyser from "../WaveAnalyser/WaveAnalyser.vue";

interface CompressionAnalyserProps {
	source?: AudioNode;
	sourceColor?: string;
	compressedSource: AudioNode;
	compressedSourceColor?: string;
	lineSize?: number;
	canvasWidth?: number;
	canvasHeight?: number;
}

const {
	source,
	compressedSource = null,
	canvasHeight = 200,
	canvasWidth = 1000,
} = defineProps<CompressionAnalyserProps>();

const primaryColor = "#42d392";
const secondaryColor = "#9242d3";
</script>

<style lang="scss" scoped>
.CompressionAnalyser {
	width: 100%;
	height: 100%;
	position: relative;

	&__source-analyser {
		background-color: transparent;
	}

	&__compressed-source-analyser {
		position: absolute;
		top: 0;
		left: 0;
		background-color: transparent;
	}
}
</style>
