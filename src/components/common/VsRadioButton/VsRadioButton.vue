<template>
	<button
		class="RadioButton"
		:class="classObject"
		@click="handleClick"
	></button>
</template>

<script setup lang="ts">
import { computed } from "vue";
type RadioButtonVariants = "default" | "elevated";

interface RadioButtonProps {
	variant?: RadioButtonVariants;
	color?: string;
	size?: CSSNumericValue;
	trueValue?: boolean;
	disabled?: boolean;
}

const {
	color = "red",
	variant = "default",
	size = "1.5rem",
	trueValue = true,
	disabled = false,
} = defineProps<RadioButtonProps>();

const model = defineModel<boolean>({ default: false });
const emit = defineEmits<{
	(e: "click", value: boolean): void;
}>();

function handleClick() {
	model.value = !model.value;
	emit("click", model.value);
}

const classObject = computed(() => ({
	"RadioButton--selected": model.value == trueValue,
	[`RadioButton--${variant}`]: variant != null,
	"RadioButton--disabled": disabled,
}));
</script>

<style lang="scss" scoped>
.RadioButton {
	cursor: pointer;
	background-color: transparent;

	width: v-bind(size);
	height: v-bind(size);
	max-width: v-bind(size);
	min-height: v-bind(size);
	min-width: v-bind(size);
	min-height: v-bind(size);

	border-radius: 100px;
	border: none;
	outline: 0.1rem solid v-bind(color);
	// margin: auto;
	// padding: 2px;
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0.1rem;

	&--disabled {
		outline: 0.1rem solid $disabled-color-2;
	}
}

.RadioButton--selected::before {
	display: block;
	content: "";
	background: v-bind(color);
	height: 100%;
	width: 100%;
	border-radius: 100px;
	margin: auto;
}

.RadioButton--disabled.toggleButton--selected::before {
	background: $disabled-color-2;
}
</style>
