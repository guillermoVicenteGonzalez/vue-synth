<template>
	<canvas ref="canvasRef"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";

interface DistortionPlotterProps {
	curve?: Float32Array | null;
	lineColor?: string;
	lineWidth?: number;
	filled?: boolean;
}

const {
	curve,
	lineWidth = 2,
	lineColor = "red",
	filled = true,
} = defineProps<DistortionPlotterProps>();
const canvasRef = ref<HTMLCanvasElement>();

watchEffect(() => {
	paintCurve();
});

function paintCurve() {
	if (!curve) return;
	if (!canvasRef.value) return;

	const cWidth = canvasRef.value.width;
	const cHeight = canvasRef.value.height;
	const middle: number = cHeight / 2;

	const ctx = canvasRef.value.getContext("2d");
	if (!ctx) return;

	const xProportion = cWidth / curve.length;
	const yProportion = cHeight / 2; //goes from -1 to 1

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.beginPath();

	curve.forEach((y, x) => {
		ctx.lineTo(x * xProportion, y * yProportion + middle);
	});

	if (lineColor) ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;

	if (filled) {
		const fillStyleColor = ctx.strokeStyle + "40";
		ctx.fillStyle = fillStyleColor;
		ctx.fill();
	}

	ctx.stroke();
}

onMounted(() => {
	paintCurve();
});
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
