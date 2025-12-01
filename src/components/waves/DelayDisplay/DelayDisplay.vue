<template>
	<div class="DelayDisplay">
		<canvas
			ref="waveCanvas"
			class="DelayDisplay__wave-canvas"
			:width="canvasWidth"
			:height="canvasHeight"
		></canvas>
		<canvas
			ref="delayCanvas"
			class="DelayDisplay__delay-canvas"
			:width="canvasWidth"
			:height="canvasHeight"
		></canvas>
	</div>
</template>

<script lang="ts" setup>
import type DelayEffect from "@/models/effects/DelayEffect";
import Wave, { waveForms } from "@/models/wave";
import { onMounted, ref, watchEffect } from "vue";

interface DelayDisplayProps {
	canvasWidth?: number;
	canvasHeight?: number;
	delayEffect: DelayEffect;
	filled?: boolean;
	sourceColor?: string;
	delayedWaveColor?: string;
}

const primaryColor = "#42d392";
const tertiaryColor = "#E681E2";

const {
	canvasWidth = 1000,
	canvasHeight = 400,
	delayEffect,
	filled = true,
	delayedWaveColor = tertiaryColor,
	sourceColor = primaryColor,
} = defineProps<DelayDisplayProps>();

const waveCanvas = ref<HTMLCanvasElement>();
const delayCanvas = ref<HTMLCanvasElement>();

const wave = ref(new Wave(canvasHeight / 2, 6, 0));
wave.value.form = waveForms.sine;

function paintWave() {
	if (!waveCanvas.value || !wave.value) return;

	const ctx: CanvasRenderingContext2D = waveCanvas.value.getContext(
		"2d"
	) as CanvasRenderingContext2D;

	const cWidth: number = ctx.canvas.width;
	const cHeight: number = ctx.canvas.height;
	const middle: number = cHeight / 2;

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.beginPath();

	const points = wave.value.calculatePoints(cWidth, 0);
	const firstPeriodTime = cWidth / wave.value.frequency;
	for (let x = 0; x < firstPeriodTime; x++) {
		ctx.lineTo(x, middle + points[x]);
	}

	ctx.lineTo(firstPeriodTime, cHeight);
	ctx.lineTo(0, cHeight);
	ctx.strokeStyle = sourceColor;

	if (filled) {
		// ctx.closePath();
		const fillStyleColor = ctx.strokeStyle + "40";
		ctx.fillStyle = fillStyleColor;
		ctx.fill();
	}

	ctx.stroke();
}

function paintDelayedWave() {
	if (!delayCanvas.value || !wave.value) return;

	const ctx: CanvasRenderingContext2D = delayCanvas.value.getContext(
		"2d"
	) as CanvasRenderingContext2D;

	const cWidth: number = ctx.canvas.width;
	const cHeight: number = ctx.canvas.height;
	const middle: number = cHeight / 2;

	const delayedWave = new Wave(
		cHeight / 2,
		wave.value.frequency / delayEffect.rate
	);
	delayedWave.form = wave.value.form;

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.beginPath();

	const delayTime = delayEffect.rate * cWidth;
	const period = cWidth / delayedWave.frequency + delayTime;

	ctx.lineTo(delayTime, cHeight);

	const points = delayedWave.calculatePoints(cWidth, delayTime);
	for (let x = delayTime; x < cWidth; x++) {
		const point = Math.floor(x);

		const currentPeriod = x / period + 1;
		const gainReduction = delayEffect.gain;

		const feedbackReduction =
			delayEffect.feedback == 1 ? 1 : delayEffect.feedback / currentPeriod;
		const reduction = feedbackReduction * gainReduction;

		ctx.lineTo(point, middle + points[point] * reduction);
	}

	ctx.strokeStyle = delayedWaveColor;
	ctx.lineTo(cWidth, cHeight);
	ctx.lineTo(delayTime, cHeight);

	if (filled) {
		// ctx.closePath();
		const fillStyleColor = ctx.strokeStyle + "40";
		ctx.fillStyle = fillStyleColor;
		ctx.fill();
	}
	ctx.stroke();
}

watchEffect(() => {
	paintDelayedWave();
});

onMounted(() => {
	paintWave();
	paintDelayedWave();
});
</script>

<style scoped lang="scss">
.DelayDisplay {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;

	&__delay-canvas,
	&__wave-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&__delay-canvas {
		z-index: 1;
	}

	&__wave-canvas {
		z-index: 2;
	}
}
</style>
