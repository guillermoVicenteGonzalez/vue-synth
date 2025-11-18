<template>
	<button
		class="toggleButton"
		:class="classObject"
		@click="handleClick"
	></button>
</template>

<script setup lang="ts">
import { computed } from "vue";
type ToggleButtonVariants = "default" | "elevated";

interface ToggleButtonProps {
	variant?: ToggleButtonVariants;
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
} = defineProps<ToggleButtonProps>();

const model = defineModel<boolean>({ default: false });
const emit = defineEmits<{
	(e: "click", value: boolean): void;
}>();

function handleClick() {
	model.value = !model.value;
	emit("click", model.value);
}

const classObject = computed(() => ({
	"toggleButton--selected": model.value == trueValue,
	[`toggleButton--${variant}`]: variant != null,
	"toggleButton--disabled": disabled,
}));
</script>

<style lang="scss" scoped>
.toggleButton {
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

.toggleButton--selected::before {
	display: block;
	content: "";
	background: v-bind(color);
	height: 100%;
	width: 100%;
	border-radius: 100px;
	margin: auto;
}

.toggleButton--disabled.toggleButton--selected::before {
	background: $disabled-color-2;
}
</style>
