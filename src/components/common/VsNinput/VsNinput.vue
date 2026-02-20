<template>
	<input
		ref="inputRef"
		v-model.number="model"
		v-focus="autoFocus"
		type="number"
		inputmode="decimal"
		pattern="[0-9]*"
		class="VSNinput"
		:max="max"
		:min="min"
		:step="step"
		:class="VSNinputDynamicClass"
		@keypress="preventNonDigits"
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
	autoFocus?: boolean;
}

const {
	max = 100,
	min = 0,
	step = 0.1,
	variant = "default",
	autoFocus = false,
} = defineProps<VSNinputProps>();

const model = defineModel<number>({
	default: 0,
	set(v: number) {
		if (v > max) return max;
		if (v < min) return min;
		return v;
	},
});

const VSNinputDynamicClass = computed(() => ({
	[`VSNinput--${variant}`]: variant,
}));

const vFocus = {
	mounted: (el: HTMLInputElement) => {
		el.focus();
		setTimeout(() => {
			el.select();
		}, 1);
	},
};

function preventNonDigits(event: KeyboardEvent) {
	if (!/[0-9]|./.test(event.key)) {
		event.preventDefault();
	}
}
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
