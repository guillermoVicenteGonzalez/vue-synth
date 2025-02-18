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
	labelColor?: string;
	max?: number;
	min?: number;
}

const {
	variant,
	orientation = "horizontal",
	label,
	labelColor = "#000",
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
.slider {
	box-sizing: border-box;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 0.5rem;

	&__input {
		box-sizing: inherit;
	}

	&__label {
		font-size: 1.6rem;
		color: v-bind(labelColor);
		text-align: center;
	}

	&--vertical {
		flex-direction: column;
		height: 100%;
		.slider__input {
			max-height: 100%;
			height: 100%;
			writing-mode: vertical-lr;
			direction: rtl;
		}
	}
}
</style>
