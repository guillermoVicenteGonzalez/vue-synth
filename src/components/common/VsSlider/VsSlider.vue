<template>
	<div :class="sliderClass">
		<input
			v-model="model"
			:disabled="disabled"
			type="range"
			:min="min"
			:max="max"
			class="slider__input"
			@input="emit('change', model)"
		/>
		<label v-if="label" class="slider__label">{{ label }}</label>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
type VSSliderVariants = "default";
type VSSliderOrientation = "horizontal" | "vertical";

interface VsSliderProps {
	disabled?: boolean;
	variant?: VSSliderVariants;
	orientation?: VSSliderOrientation;
	label?: string | number;
	max?: number;
	min?: number;
}

const {
	variant,
	orientation = "horizontal",
	label,
	max,
	min,
	disabled = false,
} = defineProps<VsSliderProps>();

const model = defineModel<number>({
	default: 10,
	set(value) {
		return Number(value);
	},
	type: Number,
});

const emit = defineEmits<{
	(e: "change", value?: number): void;
}>();

const sliderClass = computed(() => {
	return `slider ${variant ? `slider--${variant}` : ""} ${orientation == "vertical" ? "slider--vertical" : ""}`;
});
</script>

<style lang="scss" scoped>
$slider-width: 1.5rem;

.slider {
	box-sizing: border-box;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	&__input {
		box-sizing: inherit;

		// webkit overrides
		-webkit-appearance: none; /* Override default CSS styles */
		appearance: none;

		width: 100%; /* Full-width */
		height: $slider-width; /* Specified height */

		background: $bg-color-black; /* Grey background */
		outline: none; /* Remove outline */

		overflow: hidden;
		border-radius: $border-radius-df;

		// opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
		-webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
		transition: opacity 0.2s;

		&::-moz-range-track,
		&::-webkit-slider-runnable-track {
			height: $slider-width;
			background: $bg-color-black;
			border-radius: $border-radius-df;
		}

		&::-webkit-slider-thumb {
			-webkit-appearance: none; /* Override default look */
			appearance: none;

			width: $slider-width; /* Set a specific slider handle width */
			height: $slider-width; /* Slider handle height */
			background: $primary-color; /* Green background */
			border-radius: 50%;
			cursor: pointer; /* Cursor on hover */
			box-shadow: -407px 0 0 400px $primary-color;
		}

		&::-moz-range-thumb {
			width: 25px; /* Set a specific slider handle width */
			height: 25px; /* Slider handle height */
			background: $primary-color; /* Green background */
			cursor: pointer; /* Cursor on hover */
			box-shadow: -407px 0 0 400px $primary-color;
		}
	}

	&__label {
		font-size: 1.6rem;
		// color: v-bind(labelColor);
		color: $text-color;
		text-align: center;
	}

	&--vertical {
		flex-direction: column;
		height: 100%;
		width: $slider-width;

		.slider__input {
			max-height: 100%;
			height: 100%;
			writing-mode: vertical-lr;
			direction: rtl;

			&::-moz-range-track,
			&::-webkit-slider-runnable-track {
				height: 100%;
				width: $slider-width;
			}

			&::-webkit-slider-thumb {
				box-shadow: 0 407px 0 400px $primary-color;
			}
		}
	}
}
</style>
