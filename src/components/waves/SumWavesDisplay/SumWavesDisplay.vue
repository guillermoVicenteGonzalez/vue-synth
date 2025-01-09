<template>
	<canvas ref="myCanvas" width="1080" height="200"></canvas>
</template>

<script setup lang="ts">
import Wave from "@/models/wave";
import { onMounted, ref } from "vue";

interface SumWavesDisplayProps {
	waves: Wave[];
}

const { waves } = defineProps<SumWavesDisplayProps>();

const myCanvas = ref();
let frames = 0;
let context: CanvasRenderingContext2D;

function paintMainWave(waves: Wave[], ctx: CanvasRenderingContext2D, step = 0) {
	if (!Array.isArray(waves) || waves.length == 0) {
		return false;
	}

	const height = ctx.canvas.height;
	const length = ctx.canvas.width;
	const middle = height / 2;
	ctx.clearRect(0, 0, length, height);
	ctx.beginPath();

	const wavePoints = Wave.addWaves(waves, length, step);
	wavePoints.forEach((y, x) => {
		ctx.lineTo(x, middle + y);
	});

	ctx.stroke();
}

function animateWave() {
	if (!myCanvas.value) return;
	const ctx = myCanvas.value.getContext("2d");
	if (!ctx) return;
	frames += 0.1;
	paintMainWave(waves, ctx, frames);
	if (frames > 10000000) {
		frames = 0;
	}

	window.requestAnimationFrame(animateWave);
}

onMounted(() => {
	context = myCanvas.value.getContext("2d");
	paintMainWave(waves, context);
	window.requestAnimationFrame(animateWave);
});
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
	padding: 4px;
}
</style>
