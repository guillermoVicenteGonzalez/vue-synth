<template>
	<span class="VsSpinner" :class="dynamicSpinnerClasses"></span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SpinnerSize = "xs" | "sm" | "md" | "bg";

interface VsSpinnerProps {
	size?: SpinnerSize;
}

const { size = "md" } = defineProps<VsSpinnerProps>();

const dynamicSpinnerClasses = computed(() => ({
	[`VsSpinner--${size}`]: size,
}));
</script>

<style scoped lang="scss">
$spinner-size: 2.4rem;
$spinner-thickness: 0.25rem;

.VsSpinner {
	--spinner-size: 4.8rem;
	--spinner-thickness: 0.5rem;

	width: var(--spinner-size);
	height: var(--spinner-size);
	border: var(--spinner-thickness) solid #fff;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	&--xs {
		--spinner-size: 1.1rem;
		--spinner-thickness: 0.13rem;
	}

	&--sm {
		--spinner-size: 2.4rem;
		--spinner-thickness: 0.3rem;
	}

	&--md {
		--spinner-size: 4.8rem;
		--spinner-thickness: 0.5rem;
	}

	&--bg {
		--spinner-size: 8.6rem;
		--spinner-thickness: 1rem;
	}
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
