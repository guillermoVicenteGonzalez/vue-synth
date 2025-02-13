<template>
	<canvas
		ref="envelopeCanvas"
		class="envelope-canvas"
		:class="classObject"
		:height="canvasHeight"
		:width="canvasWidth"
	></canvas>
</template>

<script setup lang="ts">
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import { computed, onMounted, useTemplateRef, watchEffect } from "vue";

interface EnvelopeDisplayProps {
	envelope: AudioEnvelope;
	canvasWidth?: number;
	canvasHeight?: number;
	lineWidth?: number;
	lineColor?: string;
}

const {
	envelope,
	canvasHeight,
	canvasWidth = 1000,
	lineWidth = 2,
	lineColor = "red",
} = defineProps<EnvelopeDisplayProps>();

const classObject = computed(() => ({}));

const canvas = useTemplateRef("envelopeCanvas");

watchEffect(() => {
	paintEnvelope(envelope, canvas.value, lineWidth, lineColor);
});

function paintEnvelope(
	env: AudioEnvelope,
	canvas: HTMLCanvasElement | null,
	lineWidth: number = 2,
	lineColor: string = "red"
) {
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	//how long the total envelope can be
	const envelopeSize = 30;
	const envelopeHeight = 1;

	const cWidth = ctx.canvas.width;
	const cHeight = ctx.canvas.height;

	ctx.clearRect(0, 0, cWidth, cHeight);

	const sustainPos = cHeight * (envelopeHeight - env.sustain);
	let currentStep = 0;

	ctx.beginPath();
	ctx.moveTo(0, cHeight);

	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;

	currentStep += (env.attack * cWidth) / envelopeSize;
	ctx.lineTo(currentStep, 0);

	currentStep += (env.decay * cWidth) / envelopeSize;
	ctx.lineTo(currentStep, sustainPos);

	//the "sustain line" goes on for as much remaining space there is
	const remainingSpace =
		cWidth - currentStep - (env.release * cWidth) / envelopeSize;
	currentStep += remainingSpace;

	ctx.lineTo(currentStep, sustainPos);
	currentStep += (env.release * cWidth) / envelopeSize;
	ctx.lineTo(currentStep, cHeight);

	ctx.stroke();
}

onMounted(() => {
	paintEnvelope(envelope, canvas.value);
});
</script>

<style lang="scss" scoped>
.envelope-canvas {
	width: 100%;
	height: 100%;
	// object-fit: cover;
}
</style>
