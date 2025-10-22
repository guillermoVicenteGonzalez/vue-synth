<template>
	<button class="VsTabButton" :class="VsTabButtonClasses">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
type VsTabButtonVariant = "default";

interface VsTabButtonProps {
	active?: boolean;
	variant?: VsTabButtonVariant;
}

const { active, variant } = defineProps<VsTabButtonProps>();
const VsTabButtonClasses = computed(() => ({
	[`VsTabButton--${variant}`]: variant,
	[`VsTabButton--active`]: active,
}));
</script>

<style scoped lang="scss">
$border-size: 0.4rem;
$base-color: $tertiary-color;
$default-color: $base-color;
// $selected-color: rgba($base-color, 0.5);
$selected-color: #693c94;

.VsTabButton {
	min-width: fit-content;
	min-height: fit-content;

	border: none;
	outline: none;

	padding: $gap-df;

	background-color: $default-color;
	color: $text-color;

	&--active {
		// background-color: $bg-color-3;
		background-color: $selected-color;
		border-top: solid $border-size $primary-color;
		color: $primary-color;
	}
}
</style>
