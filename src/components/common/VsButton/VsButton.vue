<template>
	<button :class="`vs-button ${VSButtonVariants[variant]}`"></button>
</template>

<script setup lang="ts">
const VSButtonVariants = {
	default: "vs-button--default",
	outlined: "vs-button--outlined",
};

interface VSButtonProps {
	variant?: keyof typeof VSButtonVariants;
}

const { variant = "default" } = defineProps<VSButtonProps>();
</script>

<style lang="scss" scoped>
.vs-button {
	min-width: 100px;
	min-height: 50px;
	border: none;
	outline: none;

	&--outlined {
		background-color: red;
		color: #fff;
	}
}
</style>
