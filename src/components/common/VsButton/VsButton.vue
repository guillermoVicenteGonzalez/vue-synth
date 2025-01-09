<template>
	<button class="vs-button" :class="classObject">
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const VSButtonVariants = {
	default: "vs-button--default",
	outlined: "vs-button--outlined",
	round: "vs-button--round",
};

interface VSButtonProps {
	disabled?: boolean;
	variant?: keyof typeof VSButtonVariants;
}

const { variant = "default", disabled = false } = defineProps<VSButtonProps>();

const classObject = computed(() => {
	return {
		"vs-button--disabled": disabled,
		[VSButtonVariants[variant]]: variant != null,
	};
});
</script>

<style lang="scss" scoped>
.vs-button {
	// min-width: 100px;
	// min-height: 50px;
	width: 100px;
	height: 50px;
	border: none;
	outline: none;
	cursor: pointer;

	&--outlined {
		background-color: red;
		color: #fff;
		border-radius: 1rem;
	}

	&--round {
		border-radius: 50%;
		min-width: 2rem;
		min-height: 2rem;
		width: 2rem;
		height: 2rem;
		color: black;
	}
}
</style>
