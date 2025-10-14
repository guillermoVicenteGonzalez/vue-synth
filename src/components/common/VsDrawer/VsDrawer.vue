<template>
	<div class="VsDrawer" :class="VsDrawerClasses">
		<div class="VsDrawer__content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export type VsDrawerVariants = "default" | "outlined";

interface VsDrawerProps {
	variant?: VsDrawerVariants;
}

const model = defineModel<boolean>({ default: false });
const { variant = "default" } = defineProps<VsDrawerProps>();

const VsDrawerClasses = computed(() => ({
	"VsDrawer--active": model.value,
	[`VsDrawer--${variant}`]: variant,
}));
</script>

<style scoped lang="scss">
$drawer-bg-color: $bg-color-2;
$drawer-final-width: 20rem;

.VsDrawer {
	overflow: hidden;
	background-color: $drawer-bg-color;
	height: 100dvh;
	position: absolute;

	border-radius: $border-radius-df;
	border-top-left-radius: 0;
	z-index: 3;

	visibility: hidden;
	width: 0;

	&--active {
		width: $drawer-final-width;
		visibility: visible;
	}

	&__content {
		padding: $gap-bg;
		display: flex;
		flex-direction: column;
		gap: $gap-bg;
	}
}
</style>
