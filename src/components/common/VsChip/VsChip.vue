<template>
	<div class="VsChip">
		<slot></slot>
	</div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
$default-bg-color: $bg-color-3;
$default-text-color: $text-color;

.VsChip {
	height: max-content;
	width: fit-content;

	padding: 0.2rem $gap-df;
	background-color: $default-bg-color;
	color: $default-text-color;
	border-radius: $border-radius-df;

	text-align: center;
}
</style>
