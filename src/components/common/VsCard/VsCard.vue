<template>
	<div :class="`VSCard  VSCard--${variant}`">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
type VSCardVariant = "default" | "outlined" | "flat" | "elevated";

interface VSCardProps {
	width?: string;
	height?: string;
	minWidth?: string;
	minHeight?: string;
	maxWidth?: string;
	maxHeight?: string;
	bgColor?: string;
	variant?: VSCardVariant;
}

const {
	variant = "default",
	bgColor = "white",
	width = "100%",
	height = "100px",
	minWidth = "10px",
	minHeight = "50px",
	maxWidth = "100%",
	maxHeight = "100%",
} = defineProps<VSCardProps>();
</script>

<style lang="scss" scoped>
:where(.VSCard) {
	width: v-bind(width);
	height: v-bind(height);
	min-width: v-bind(minWidth);
	min-height: v-bind(minHeight);
	max-width: v-bind(maxWidth);
	max-height: v-bind(maxHeight);
	background-color: v-bind(bgColor);
}

.VSCard {
	overflow: hidden;
	// padding: 1.5rem;
	border-radius: 10px;

	&--default {
		box-shadow: 0 0 0.5rem 0.2rem rgba(black, 0.2);
	}

	&--outlined {
		border: solid 2px black;
	}
}
</style>
