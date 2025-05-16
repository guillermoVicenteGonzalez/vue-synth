<template>
	<div class="fold-container">
		<button @click="isVisible = !isVisible">
			<slot name="button-content"> Show </slot>
		</button>
		<div class="fold-container__content" :class="contentContainerStyles">
			<slot name="content" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const isVisible = ref<boolean>(true);

const contentContainerStyles = computed(() => ({
	"fold-container__content--visible": isVisible.value,
}));
</script>

<style lang="scss" scoped>
.fold-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	background-color: red;
	&__content {
		height: 0;
		display: none;
		&--visible {
			height: 100%;
			display: block;
		}
	}
}
</style>
