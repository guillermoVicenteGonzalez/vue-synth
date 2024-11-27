<template>
	<button
		:class="`${selectedClass} ${variantClass}`"
		@click="handleClick"
	></button>
</template>

<script setup lang="ts">
import { computed } from "vue";
type ToggleButtonVariants = "default" | "elevated";

interface ToggleButtonProps {
	variant?: ToggleButtonVariants;
	color?: string;
}

const { color = "red", variant = "default" } = defineProps<ToggleButtonProps>();

const model = defineModel<boolean>({ default: false });
const emit = defineEmits<{
	(e: "click", value: boolean): void;
}>();

function handleClick() {
	model.value = !model.value;
	emit("click", model.value);
}

const selectedClass = computed(() => {
	return model.value ? "toggleButton toggleButton--selected" : "toggleButton";
});

const variantClass = computed(() => {
	return `toggleButton--${variant}`;
});
</script>

<style lang="scss" scoped>
.toggleButton {
	display: block;
	background-color: transparent;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 100px;
	border: 0.1rem solid v-bind(color);
	// margin: auto;
	padding: 2px;
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
</style>
