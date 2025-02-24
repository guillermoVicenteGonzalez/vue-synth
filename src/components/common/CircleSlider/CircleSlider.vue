<template>
	<div
		class="circle-slider"
		:class="cssClasses"
		@contextmenu="handleRightClick"
	>
		<div
			ref="knob"
			class="circle-slider__knob"
			@click="handleClick"
			@mouseleave="isRotating = false"
			@mousemove="e => handleProgress(e, min, max)"
			@mousedown="isRotating = true"
			@mouseup="isRotating = false"
		>
			<span class="circle-slider__text">{{ progress.toFixed(0) }}</span>
		</div>

		<svg width="100%" height="100%" :style="cssVars">
			<circle
				class="circle-slider__circle circle-slider__circle--inner"
				cx="50%"
				cy="50%"
				:r="radius"
			></circle>
			<circle
				class="circle-slider__circle circle-slider__circle--outer"
				cx="50%"
				cy="50%"
				:r="radius"
			></circle>
		</svg>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

type circleSliderVariants = "default" | "elevated";

interface CircleSliderProps {
	fillColor?: string;
	underColor?: string;
	min?: number;
	max?: number;
	strokeWidth?: string;
	disabled?: boolean;
	size?: number;
	variant?: circleSliderVariants;
}

const {
	fillColor = "#ff0000",
	underColor = "#000",
	min = 0,
	max = 100,
	size = 80,
	strokeWidth = ".8rem",
	disabled = true,
	variant,
} = defineProps<CircleSliderProps>();

const progress = defineModel<number>({
	default: 0,
});

// const size = 70;
const isRotating = ref();
const knob = useTemplateRef("knob");
const radius = computed(() => size / 2 - 10);
const circunferenceLength = computed(() => 2 * Math.PI * radius.value);
const strokeDasharray = computed(() => circunferenceLength.value * 0.75);
const dashOffset = computed(
	() =>
		circunferenceLength.value -
		strokeDasharray.value * valueToPercentage(progress.value, min, max)
);

const cssClasses = computed(() => ({
	"circle-slider--disabled": disabled,
	[`circle-slider--${variant}`]: variant != null,
}));

const cssVars = computed(() => ({
	"--circle-radius": `${radius.value}px`,
	"--under-color": underColor,
	"--fill-color": fillColor,
	"--stroke-dash": strokeDasharray.value,
	"--stroke-offset": dashOffset.value,
	"--circ-length": circunferenceLength.value,
	"--stroke-width": strokeWidth,
	"--slider-size": `${size / 10}rem`,
}));

/**
 * Calculates the position of the mouse inside the element and its angle to obtain the progress of the slider
 * @param e the event object
 * @param minVal minmum value the model can take
 * @param maxVal maximum value the model can take
 */
function handleProgress(e: MouseEvent, minVal: number = 0, maxVal: number = 1) {
	if (!isRotating.value || !knob.value || disabled) return;

	const progressPercent = calculateProgressPercent(
		knob.value,
		e.clientX,
		e.clientY
	);

	progress.value = percentageToValue(progressPercent, minVal, maxVal);

	// console.log(progress.value);
}

function handleClick(e: MouseEvent) {
	isRotating.value = true;
	handleProgress(e, min, max);
	isRotating.value = false;
}

/**
 * Calculates the position of the mouse inside the element and its angle to obtain the progress of the slider
 * @param element The html element reference to calculate its position
 * @param cursorX The X component of the cursor position
 * @param cursorY The Y component of the cursor position
 */
function calculateProgressPercent(
	element: HTMLElement,
	cursorX: number,
	cursorY: number
) {
	//center position
	const centerX =
		element.getBoundingClientRect().left + element.clientWidth / 2;
	const centerY =
		element.getBoundingClientRect().top + element.clientHeight / 2;

	const deltaX = cursorX - centerX;
	const deltaY = cursorY - centerY;

	// console.log(deltaX, deltaY);
	console.log(`difference with center=> x:${deltaX} y:${deltaY}`);

	//angle in radians
	const angle = Math.atan2(deltaY, deltaX);
	const angleDegs = (angle * 180) / Math.PI;

	//135 is how much the circle is rotated
	// const pointerAngle = angleDegs - 135 - 45;
	// const rotationAngle = (angleDegs + 230) % 360;
	const rotationAngle = (angleDegs - 135 + 360) % 360;

	//if we get to the top we stop
	if (rotationAngle > 320) return 0;
	if (rotationAngle > 270) return 1;

	const progressPercent = rotationAngle / 270;

	return progressPercent;
	// console.log(progress.value);
}

/**
 * Transforms a percentage into its corresponding value between min and max
 * @param percentage Progress of the slider in percentage
 * @param min minimum value the model of the component can take
 * @param max maximum value the model of the component can take
 */
function percentageToValue(
	percentage: number,
	min: number = 0,
	max: number = 1
) {
	return percentage * (max - min) + min;
}

/**
 * Turns a value into a percentage to fill the slider with
 * @param value Current value of the component's model
 * @param min minimum value the model of the component can take
 * @param max maximum value the model of the component can take
 */
function valueToPercentage(value: number, min: number = 0, max: number = 1) {
	return (value - min) / (max - min);
}

function handleRightClick(e: MouseEvent) {
	e.preventDefault();
}

// function calculateDimensions() {}
</script>

<style lang="scss" scoped>
.circle-slider {
	--slider-size: 7rem;

	width: var(--slider-size);
	height: var(--slider-size);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&__knob {
		cursor: pointer;
		z-index: 1;
		width: var(--slider-size);
		height: var(--slider-size);
		background-color: transparent;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__text {
		user-select: none;
		-webkit-user-drag: none;
		font-size: 1.4rem;
	}

	&__circle {
		cursor: pointer;
		z-index: 3;
		fill: none;
		stroke-width: var(--stroke-width);
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

	&--disabled {
		cursor: progress;
		.circle-slider {
			&__knob {
				cursor: not-allowed;
			}

			&__circle {
				&--inner {
					stroke: rgb(100, 100, 100);
				}
				&--outer {
					stroke: rgb(180, 180, 180);
				}
			}
		}
	}
}
</style>
