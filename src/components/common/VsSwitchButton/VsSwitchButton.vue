<template>
	<div class="SwitchButton" :class="dynamicClass" @click="handleClick">
		<div class="SwitchButton__handle"></div>
		<input v-model="active" type="checkbox" hidden />
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface VsSwitchButtonProps {
	disabled?: boolean;
}

const { disabled } = defineProps<VsSwitchButtonProps>();
const emit = defineEmits<{
	(e: "change", value: boolean): void;
}>();

const active = defineModel<boolean>({ default: false });

const dynamicClass = computed(() => ({
	"SwitchButton--active": active.value,
	"SwitchButton--disabled": disabled,
}));

function handleClick() {
	if (disabled) return;
	active.value = !active.value;
	emit("change", active.value);
}
</script>

<style scoped lang="scss">
$switch-button-width: 6rem;
$switch-button-height: 3rem;

$switch-handle-size: 2rem;
$switch-button-border-radius: 100px;
$switch-animation-time: 0.5s;

$switch-margin: 0.5rem;

$handle-color: white;
$switch-color: $bg-color-black;
$switch-color-active: $primary-color;

.SwitchButton {
	width: $switch-button-width;
	height: $switch-button-height;
	background-color: $switch-color;
	border-radius: $switch-button-border-radius;

	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;

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
		background-color: $switch-color-active;

		.SwitchButton__handle {
			// right: 30px;
			transform: translateX(
				calc(
					#{$switch-button-width} - #{$switch-handle-size} - #{$switch-margin}
				)
			);
		}
	}

	&--disabled {
		background-color: $disabled-color-1;
		cursor: not-allowed;

		.SwitchButton {
			&__handle {
				background-color: $disabled-color-2;
			}
		}
	}
}
</style>
