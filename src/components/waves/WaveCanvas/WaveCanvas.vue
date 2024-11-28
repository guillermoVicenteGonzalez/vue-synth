<template>
	<canvas
		ref="myCanvas"
		:width="canvasWidth"
		:height="canvasHeight"
		:class="childClass"
	></canvas>
</template>

<script setup lang="ts">
import Wave from "@/models/wave";
import { onMounted, ref } from "vue";

interface WaveCanvasProps {
	paused?: boolean;
	wave: Wave;
	borderColor?: string;
	canvasWidth?: number;
	canvasHeight?: number;
	lineColor?: string;
	filled?: boolean;
	childClass?: string;
}

const myCanvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D;
let frames: number = 0;

const {
	paused = false,
	wave = new Wave(2, 2, 2),
	borderColor = "black",
	canvasHeight,
	canvasWidth,
	lineColor,
} = defineProps<WaveCanvasProps>();

function paintWave(
	w: Wave,
	ctx: CanvasRenderingContext2D = context,
	step = 0
): boolean {
	if (w == undefined) {
		return false;
	}

	const cWidth: number = ctx.canvas.width;
	const cHeight: number = ctx.canvas.height;
	const middle: number = cHeight / 2;

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.beginPath();

	const points = w.calculatePoints(cWidth, step * w.frequency);
	for (let x = 0; x < cWidth; x++) {
		ctx.lineTo(x, middle + points[x]);
	}

	if (lineColor) ctx.strokeStyle = lineColor;
	ctx.stroke();
	return true;
}

function animateWave(): boolean {
	if (paused) {
		window.requestAnimationFrame(animateWave);
		return false;
	}

	if (myCanvas.value == undefined) {
		return false;
	}

	frames += 0.1;

	const ctx: CanvasRenderingContext2D = myCanvas.value.getContext(
		"2d"
	) as CanvasRenderingContext2D;
	paintWave(wave, ctx, frames);

	window.requestAnimationFrame(animateWave);
	return true;
}

onMounted(() => {
	// myCanvas.value.getContext("2d");
	window.requestAnimationFrame(animateWave);
	if (myCanvas.value != undefined) {
		// myCanvas.value.width = 1920;
		// myCanvas.value.height = 1080;
	}
});
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border: solid 1px v-bind(borderColor);
}
</style>
