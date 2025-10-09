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

const VSNinputDynamicClass = computed(() => {
	return [`VSNinput--${variant}`];
});
</script>

<style lang="scss" scoped>
:where(.VSNinput) {
	min-width: 5rem;
	// width: 2rem;
	width: 100%;
	max-width: 10rem;
	flex-basis: 1rem;
	flex-shrink: 1;
	flex-grow: 0;
	background-color: $bg-color-1;
	color: white;
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
