<template>
	<div class="tab" :class="tabDynamicClass">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface VsTabProps {
	active?: boolean;
}

const { active = false } = defineProps<VsTabProps>();

const tabDynamicClass = computed(() => ({
	"tab--active": active,
}));
</script>

<style lang="scss" scoped>
.tab {
	width: 0;
	height: 0;
	visibility: hidden;
	overflow: hidden;

	&--active {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
}
</style>
