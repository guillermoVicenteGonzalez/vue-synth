<template>
	<div class="RadioButton" :class="classObject">
		<input
			v-model="model"
			type="checkbox"
			class="RadioButton__input"
			:name="name"
		/>
		<div class="RadioButton__fill"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
type RadioButtonVariants = "default" | "elevated";

interface RadioButtonProps {
	variant?: RadioButtonVariants;
	color?: string;
	size?: CSSNumericValue;
	trueValue?: boolean;
	name?: string;
	disabled?: boolean;
}

const {
	color = "red",
	variant = "default",
	size = "2rem",
	trueValue = true,
	disabled = false,
	name = "",
} = defineProps<RadioButtonProps>();

const model = defineModel<boolean>({ default: false });

const classObject = computed(() => ({
	"RadioButton--selected": model.value == trueValue,
	[`RadioButton--${variant}`]: variant != null,
	"RadioButton--disabled": disabled,
}));
</script>

<style lang="scss" scoped>
$fill-size: 80%;
$border-size: 0.2rem;
$min-size: 1.2rem;

$animation-duration: 0.3s;

.RadioButton {
	position: relative;

	min-width: $min-size;
	min-height: $min-size;

	width: round(down, v-bind(size), 1px);
	height: round(down, v-bind(size), 1px);

	display: flex;
	justify-content: center;
	align-items: center;

	border: solid $border-size v-bind(color);
	border-radius: 50%;

	&__input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		appearance: none;
		cursor: pointer;
	}

	&__fill {
		width: 0;
		height: 0;

		transition: all $animation-duration;

		border-radius: 50%;
		background-color: transparent;
	}

	&__input:checked + .RadioButton__fill {
		width: round(down, $fill-size, 2px);
		height: round(down, $fill-size, 2px);
		background-color: v-bind(color);
	}
}
</style>
