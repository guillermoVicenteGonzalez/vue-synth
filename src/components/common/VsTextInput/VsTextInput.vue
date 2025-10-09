<template>
	<input
		type="text"
		class="VsTextInput"
		v-model="model"
		:disabled="disabled"
		:class="VsTextInputVariantClass"
	/>
</template>

<script lang="ts" setup>
import { computed } from "vue";

type VsTextInputVariants = "default";

interface VsTextInputProps {
	disabled?: boolean;
	variant?: VsTextInputVariants;
}

const model = defineModel<string>({ default: "" });
const { disabled, variant = "default" } = defineProps<VsTextInputProps>();

const VsTextInputVariantClass = computed(() => ({
	[`VsTextInput--${variant}`]: variant,
}));
</script>

<style scoped lang="scss">
.VsTextInput {
	@include inputStyles;
	width: 100%;
}
</style>
