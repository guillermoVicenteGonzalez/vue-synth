<template>
	<canvas ref="c"></canvas>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface DistortionPlotterProps {
	curve?: Float32Array | null;
	lineColor?: string;
	lineWidth?: number;
}

const {
	curve,
	lineWidth = 2,
	lineColor = "red",
} = defineProps<DistortionPlotterProps>();
const c = ref<HTMLCanvasElement>();

function paintCurve() {
	if (!curve) return;
	console.log(c.value);
	if (!c.value) return;

	const cWidth = c.value.width;
	const cHeight = c.value.height;
	const ctx = c.value.getContext("2d");
	if (!ctx) return;

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.beginPath();

	curve.forEach((y, x) => {
		console.log("painting curve");
		ctx.lineTo(x * cWidth, y * cHeight);
	});

	if (lineColor) ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;

	ctx.stroke();
}

paintCurve();
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
