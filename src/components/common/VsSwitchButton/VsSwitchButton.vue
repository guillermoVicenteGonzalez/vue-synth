<template>
	<div class="SwitchButton" @click="handleClick" :class="dynamicClass">
		<div class="SwitchButton__handle"></div>
		<input type="checkbox" hidden v-model="active" />
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const active = defineModel<boolean>({ default: false });

const dynamicClass = computed(() => ({
	"SwitchButton--active": active.value,
}));

function handleClick() {
	active.value = !active.value;
}
</script>

<style scoped lang="scss">
$switch-button-width: 5rem;
$switch-button-height: 2.5rem;

$switch-handle-size: 2rem;
$switch-button-border-radius: 100px;

.SwitchButton {
	width: $switch-button-width;
	height: $switch-button-height;
	background-color: black;
	border-radius: $switch-button-border-radius;

	display: flex;
	align-items: center;
	position: relative;

	&__handle {
		background-color: white;
		height: $switch-handle-size;
		width: $switch-handle-size;
		border-radius: $switch-button-border-radius;
		cursor: pointer;

		transition: all 2s;

		position: absolute;
		// left: 0%;
	}

	&--active {
		.SwitchButton__handle {
			right: 30px;
		}
	}
}
</style>
