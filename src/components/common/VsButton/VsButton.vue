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

export type VSButtonVariants = keyof typeof VSButtonVariants;

interface VSButtonProps {
	disabled?: boolean;
	variant?: VSButtonVariants;
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
$hover-scale: 1.05;
$active-scale: 0.98;

.vs-button {
	// min-width: 100px;
	// min-height: 50px;
	min-width: 10rem;
	width: auto;
	height: 5rem;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: $border-radius-df;

	// background: linear-gradient(135deg, $primary-color, $secondary-color);
	background-color: $tertiary-color;
	font-size: 1.6rem;
	color: $text-color;

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

	&--disabled {
		background-color: $disabled-color-1;
		cursor: not-allowed;
	}

	&:not(&--round) {
		@include respond(tab-port) {
			width: 8arem;
			height: 3rem;
		}
	}

	&:hover {
		transform: scale($hover-scale);
	}

	&:active {
		transform: scale($active-scale);
	}
}
</style>
