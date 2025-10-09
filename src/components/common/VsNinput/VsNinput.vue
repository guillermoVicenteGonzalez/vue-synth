<template>
	<input
		v-model.number="model"
		type="number"
		class="VSNinput"
		:max="max"
		:min="min"
		:step="step"
		:class="VSNinputDynamicClass"
	/>
</template>

<script setup lang="ts">
import { computed } from "vue";

type VSNinputVariants = "default" | "elevated";

interface VSNinputProps {
	max?: number;
	min?: number;
	step?: number;
	variant?: VSNinputVariants;
}

const {
	max = 1,
	min = 0,
	step = 0.1,
	variant = "default",
} = defineProps<VSNinputProps>();

const model = defineModel<number>({
	default: 0,
});

const VSNinputDynamicClass = computed(() => ({
	[`VSNinput--${variant}`]: variant,
}));
</script>

<style lang="scss" scoped>
:where(.VSNinput) {
	@include inputStyles;
}

.VSNinput {
	&--default {
		border-radius: $border-radius-sm;
		min-height: 2.5rem;

		border: none;
		outline: none;
		padding: 0.5rem;
	}
}
</style>
