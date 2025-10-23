<template>
	<div ref="drawerTemplateRef" class="VsDrawer" :class="VsDrawerClasses">
		<div class="VsDrawer__content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

export type VsDrawerVariants = "default" | "outlined";
export type VsDrawerPosition = "top" | "bottom" | "left" | "right";

interface VsDrawerProps {
	variant?: VsDrawerVariants;
	position?: VsDrawerPosition;
}

const model = defineModel<boolean>({ default: false });
const { variant = "default", position = "left" } = defineProps<VsDrawerProps>();

const VsDrawerClasses = computed(() => ({
	"VsDrawer--active": model.value,
	[`VsDrawer--${variant}`]: variant,
	[`VsDrawer--${position}`]: variant,
}));

const drawerTemplateRef = ref<HTMLTemplateElement>();

// useClickOutside(drawerTemplateRef, () => {
// 	// handleCloseDrawer();
// });

// function handleCloseDrawer() {
// 	if (model.value == true) model.value = false;
// }
</script>

<style scoped lang="scss">
$drawer-bg-color: $bg-color-2;
$drawer-final-size: 20rem;
$animation-time: 0.5s;

.VsDrawer {
	overflow-y: auto;
	overflow-x: hidden;
	background-color: $drawer-bg-color;
	position: absolute;
	height: 100%;

	border-radius: $border-radius-df;
	border-top-left-radius: 0;
	z-index: 3;

	visibility: hidden;
	width: 0;

	transition: all $animation-time;

	&--active {
		width: $drawer-final-size;
		visibility: visible;

		.VsDrawer__content {
			visibility: visible;
		}
	}

	&__content {
		visibility: hidden;
		padding: $gap-bg;
		display: flex;
		flex-direction: column;
		gap: $gap-bg;

		@include respond(tab-port) {
			padding: $gap-df;
		}
	}

	&--top {
		width: 100dvw;
		height: $drawer-final-size;

		.VsDrawer__content {
			flex-direction: row;
		}
	}

	&--bottom {
		width: 100dvw;
		height: $drawer-final-size;
		bottom: 0;
		left: 0;

		.VsDrawer__content {
			flex-direction: row;
		}
	}

	&--left {
		left: 0;
	}

	&--right {
		right: 0;
	}
}
</style>
