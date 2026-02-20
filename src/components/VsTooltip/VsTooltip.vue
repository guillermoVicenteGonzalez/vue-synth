<template>
	<div class="VsTooltip" :class="VsTooltipDynamicClasses">
		<slot></slot>
		<span class="VsTooltip__content" :class="VsTooltipContentClasses">{{
			text
		}}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type VsTooltipVariant = "default";
type VsTooltipOrientation = "top" | "bottom" | "left" | "right";

interface VsTooltipProps {
	text?: string;
	variant?: VsTooltipVariant;
	orientation?: VsTooltipOrientation;
	delay?: string;
}

const {
	text = "",
	variant = "default",
	orientation = "bottom",
	delay = ".5s",
} = defineProps<VsTooltipProps>();

const VsTooltipDynamicClasses = computed(() => ({
	[`VsTooltip--${variant}`]: variant,
}));

const VsTooltipContentClasses = computed(() => ({
	[`VsTooltip__content--${orientation}`]: orientation,
}));
</script>

<style lang="scss" scoped>
$default-bg-color: $bg-color-3;
$default-text-color: $text-color;
$animation-time: 0.5s;

.VsTooltip {
	position: relative;
	width: fit-content;
	height: fit-content;

	&__content {
		visibility: hidden;
		opacity: 0;

		display: block;
		position: absolute;
		z-index: 10;

		// height: max-content;
		min-width: 5rem;
		width: max-content;

		padding: 0.2rem $gap-df;
		background-color: $default-bg-color;
		color: $default-text-color;
		border-radius: $border-radius-df;

		font-size: 1.6rem;
		transform-origin: 100% 50%;

		transition: $animation-time;
		transition-delay: v-bind(delay);
		transition-property: all;
		// transform: translate(50%, 50%);
		&--top {
			bottom: 100%;
			left: 50%;
			transform: translate(-50%);
		}

		&--left {
			top: 50%;
			right: 100%;
			transform: translate(0, -50%);
		}

		&--bottom {
			top: 100%;
			left: 50%;
			transform: translate(-50%);
		}

		&--right {
			top: 50%;
			left: 100%;
			transform: translate(0, -50%);
		}
	}
}

:slotted(*):hover + .VsTooltip__content {
	visibility: visible;
	opacity: 1;
}
</style>
