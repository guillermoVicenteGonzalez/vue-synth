<template>
	<div class="circle-slider">
		<div
			ref="knob"
			class="circle-slider__knob"
			@mousemove="handleProgress"
			@mousedown="isRotating = true"
			@mouseup="isRotating = false"
		></div>

		<svg width="300" height="300" :style="cssVars">
			<circle class="circle circle--inner" cx="150" cy="150" r="140"></circle>
			<circle class="circle circle--outer" cx="150" cy="150" r="140"></circle>
		</svg>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

interface CircleSliderProps {
	fillColor: string;
	underColor: string;
}

const { fillColor = "#ff0000", underColor = "#000" } =
	defineProps<CircleSliderProps>();

const progress = defineModel<number>({
	default: 50,
});

const isRotating = ref();
const knob = useTemplateRef("knob");
const radius = 140;
const circunferenceLength = computed(() => 2 * Math.PI * radius);
const strokeDasharray = computed(() => circunferenceLength.value * 0.75);
const dashOffset = computed(
	() => circunferenceLength.value - strokeDasharray.value * progress.value
);
const cssVars = computed(() => ({
	"--circle-radius": radius,
	"--under-color": underColor,
	"--fill-color": fillColor,
	"--stroke-dash": strokeDasharray.value,
	"--stroke-offset": dashOffset.value,
	"--circ-length": circunferenceLength.value,
}));

function handleProgress(e: MouseEvent) {
	if (!isRotating.value || !knob.value) return;

	//center position
	const posX =
		knob.value.getBoundingClientRect().left + knob.value.clientWidth / 2;
	const posY =
		knob.value.getBoundingClientRect().top + knob.value.clientHeight / 2;

	console.log(`element center=> x:${posX} y:${posY}`);

	console.log(`mouse position=> x:${e.clientX} y:${e.clientY}`);

	const deltaX = e.clientX - posX;
	const deltaY = e.clientY - posY;

	// console.log(deltaX, deltaY);
	console.log(`difference with center=> x:${deltaX} y:${deltaY}`);

	const angle = Math.atan2(deltaY, deltaX);
	const angleDegs = (angle * 180) / Math.PI;
	const rotationAngle = (angleDegs - 135 + 160) % 360;

	progress.value = rotationAngle / 270;
	console.log("\n");
	// console.log(progress.value);
}
</script>

<style lang="scss" scoped>
.circle-slider {
	width: 300px;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&__knob {
		z-index: 1;
		width: 300px;
		height: 300px;
		background-color: transparent;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;

		&::before {
			content: "";

			background-color: transparent;
			width: 100%;
			height: 100%;
			z-index: -100;
		}
	}
}

.circle {
	z-index: 3;
	fill: none;
	stroke-width: 15px;
	transform-origin: center;
	transform: rotate(135deg);
	stroke-linecap: round;

	&--inner {
		stroke: var(--under-color);
		stroke-dasharray: var(--stroke-dash);
	}

	&--outer {
		stroke: var(--fill-color);
		stroke-dasharray: var(--circ-length);
		stroke-dashoffset: var(--stroke-offset);
	}
}
</style>
