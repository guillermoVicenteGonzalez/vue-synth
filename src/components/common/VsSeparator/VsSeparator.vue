<template>
	<hr class="VsSeparator" :class="VsSeparatorDynamicStyles" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

export type VsSeparatorOrientation = "vertical" | "horizontal";

interface VsSeparatorProps {
	orientation?: VsSeparatorOrientation;
}

const { orientation = "horizontal" } = defineProps<VsSeparatorProps>();

const VsSeparatorDynamicStyles = computed(() => ({
	[`VsSeparator--${orientation}`]: orientation,
}));
</script>

<style scoped lang="scss">
$separator-size: 0.3rem;

.VsSeparator {
	border: none;
	outline: none;
	background-color: $bg-color-3;

	&--horizontal {
		width: 100%;
		min-height: $separator-size;
		height: $separator-size;
	}

	&--vertical {
		width: $separator-size;
		min-width: $separator-size;
		height: 100%;
	}
}
</style>
