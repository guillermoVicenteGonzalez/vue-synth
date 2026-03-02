<template>
	<input
		v-model="model"
		:placeholder="placeholder"
		type="text"
		class="VsTextInput"
		:disabled="disabled"
		:class="VsTextInputVariantClass"
		@keypress="handleKeyPress"
		@keydown="handleKeyPress"
	/>
</template>

<script lang="ts" setup>
import { computed } from "vue";

type VsTextInputVariants = "default";

interface VsTextInputProps {
	disabled?: boolean;
	variant?: VsTextInputVariants;
	stopPropagation?: boolean;
	placeholder?: string;
	//TODO: Implement
	clearable?: boolean;
}

const model = defineModel<string>({ default: "" });
const {
	disabled,
	placeholder,
	variant = "default",
	stopPropagation = true,
} = defineProps<VsTextInputProps>();

const VsTextInputVariantClass = computed(() => ({
	[`VsTextInput--${variant}`]: variant,
}));

function handleKeyPress(e: KeyboardEvent) {
	if (stopPropagation) e.stopImmediatePropagation();
}
</script>

<style scoped lang="scss">
.VsTextInput {
	@include inputStyles;
	width: 100%;
}
</style>
