<template>
	<canvas
		ref="envelopeCanvas"
		class="envelope-canvas"
		:class="classObject"
		:height="canvasHeight"
		:width="canvasWidth"
	></canvas>
	<h1>{{ envelope }}</h1>
</template>

<script setup lang="ts">
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import { computed, onMounted, useTemplateRef, watchEffect } from "vue";

interface EnvelopeDisplayProps {
	envelope: AudioEnvelope;
	canvasWidth?: number;
	canvasHeight?: number;
}

const {
	envelope,
	canvasHeight,
	canvasWidth = 300,
} = defineProps<EnvelopeDisplayProps>();

const classObject = computed(() => ({}));

const canvas = useTemplateRef("envelopeCanvas");

watchEffect(() => {
	paintEnvelope(envelope, canvas.value);
});

function paintEnvelope(env: AudioEnvelope, canvas: HTMLCanvasElement | null) {
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	//how long the total envelope can be
	const envelopeSize = 50;

	const cWidth = ctx.canvas.width;
	const cHeight = ctx.canvas.height;

	ctx.clearRect(0, 0, cWidth, cHeight);

	let currentStep = 0;

	ctx.beginPath();
	ctx.moveTo(0, cHeight);
	currentStep += env.attack * cWidth;
	ctx.lineTo(currentStep / envelopeSize, 0);
	currentStep += env.decay * cWidth;
	ctx.lineTo(currentStep / envelopeSize, cHeight);

	ctx.stroke();
}

onMounted(() => {
	paintEnvelope(envelope, canvas.value);
});
</script>

<style lang="scss" scoped>
.envelope-canvas {
	// width: 100%;
	// height: 100%;
	object-fit: cover;
	background-color: green;
}
</style>
