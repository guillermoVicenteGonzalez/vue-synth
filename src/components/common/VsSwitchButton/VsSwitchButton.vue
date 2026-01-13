<template>
	<div class="SwitchButton" :class="dynamicClass" @click="handleClick">
		<div class="SwitchButton__handle"></div>
		<input v-model="active" type="checkbox" hidden />
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
$switch-button-width: 6rem;
$switch-button-height: 3rem;

$switch-handle-size: 2rem;
$switch-button-border-radius: 100px;
$switch-animation-time: 0.5s;

$switch-margin: 0.5rem;

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

		// transition: all 2s;
		transition: transform $switch-animation-time;

		position: absolute;
		transform: translate($switch-margin, 0);
	}

	&--active {
		.SwitchButton__handle {
			// right: 30px;
			transform: translateX(
				calc(
					#{$switch-button-width} - #{$switch-handle-size} - #{$switch-margin}
				)
			);
		}
	}
}
</style>
