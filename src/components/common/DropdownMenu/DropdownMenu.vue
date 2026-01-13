<template>
	<div ref="selfRef" class="DropdownMenu">
		<div class="DropdownMenu__activator" @click="handleActivatorClick">
			<slot name="activator"> </slot>
		</div>
		<div class="DropdownMenu__content" :class="dynamicContentClass">
			<slot name="content"> </slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import useClickOutside from "@/composables/useClickOutside";
import { computed, ref } from "vue";

type DropdownMenuOrientation = "top" | "bot" | "left" | "right";

interface DropdownMenuProps {
	orientation?: DropdownMenuOrientation;
}

const { orientation = "bot" } = defineProps<DropdownMenuProps>();
const active = ref<boolean>();
const selfRef = ref();

const dynamicContentClass = computed(() => ({
	"DropdownMenu__content--hidden": !active.value,
	[`DropdownMenu__content--${orientation}`]: orientation,
}));

useClickOutside(selfRef, () => {
	active.value = false;
});

function handleActivatorClick() {
	active.value = !active.value;
}
</script>

<style lang="scss" scoped>
$animation-duration: 0.1s;
$animation-timing-function: ease-in;
$content-max-width: 500rem;

.DropdownMenu {
	position: relative;

	&__activator {
		width: fit-content;
		height: fit-content;
		// position: relative;
		// overflow: visible;
	}

	&__content {
		background-color: $bg-color-2;
		overflow: hidden;

		interpolate-size: allow-keywords;
		animation-duration: $animation-duration;
		animation-timing-function: $animation-timing-function;
		// animation-name: DropdownMenuShowAnimation;

		z-index: 10;
		position: absolute;

		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0px 1px 3px 1px #00000026;

		max-width: $content-max-width;
		height: auto;
		width: auto;

		&--bot {
			top: 100%;
			left: 50%;
			transform: translate(-50%, 0%);
		}

		&--top {
			top: 0%;
			left: 50%;
			transform: translate(-50%, -100%);
		}

		&--left {
			top: 50%;
			left: 0%;
			transform: translate(-100%, -50%);
		}

		&--right {
			top: 50%;
			left: 100%;
			transform: translate(0%, -50%);
		}

		//animation !!
		&--hidden {
			// animation-name: DropdownMenuHideAnimation;
			visibility: hidden;
		}
	}

	@keyframes DropdownMenuShowAnimation {
		0% {
			height: 10px;
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			height: auto;
		}
	}

	@keyframes DropdownMenuHideAnimation {
		0% {
			height: auto;
			visibility: visible;
		}

		50% {
			opacity: 1;
		}

		100% {
			height: 0;
			opacity: 0;
			visibility: hidden;
		}
	}
}
</style>
