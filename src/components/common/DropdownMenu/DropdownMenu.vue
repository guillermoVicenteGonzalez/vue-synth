<template>
	<div ref="selfRef" class="DropdownMenu">
		<div
			class="DropdownMenu__activator"
			@click="handleLeftClick"
			@contextmenu="handleRightClick"
		>
			<slot name="activator"> </slot>
		</div>
		<div class="DropdownMenu__content" :class="dynamicContentClass">
			<vs-button
				v-if="closeBtn"
				class="DropdownMenu__close-btn"
				variant="round"
				@click="handleClose"
			>
				<x class="DropdownMenu__close-btn__icon"></x>
			</vs-button>
			<slot name="content"> </slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import useClickOutside from "@/composables/useClickOutside";
import { X } from "lucide-vue-next";
import { computed, ref } from "vue";
import VsButton from "../VsButton/VsButton.vue";

export type DropdownMenuOrientation =
	| "top"
	| "bot"
	| "left"
	| "right"
	| "centered";
type DropDownMenuActivation = "leftClick" | "dbClick" | "rightCLick";

interface DropdownMenuProps {
	orientation?: DropdownMenuOrientation;
	activation?: DropDownMenuActivation;
	closeBtn?: boolean;
}

const {
	orientation = "bot",
	activation = "leftClick",
	closeBtn = true,
} = defineProps<DropdownMenuProps>();
const active = ref<boolean>();
const selfRef = ref();

const dynamicContentClass = computed(() => ({
	"DropdownMenu__content--hidden": !active.value,
	[`DropdownMenu__content--${orientation}`]: orientation,
}));

useClickOutside(selfRef, () => {
	active.value = false;
});

function handleLeftClick() {
	if (activation != "leftClick") return;
	toggleDropdown();
}

function handleRightClick(e: MouseEvent) {
	if (activation != "rightCLick") return;
	e.preventDefault();
	toggleDropdown();
}

function toggleDropdown() {
	active.value = !active.value;
}

function handleClose() {
	active.value = false;
}
</script>

<style lang="scss" scoped>
$animation-duration: 0.1s;
$animation-timing-function: ease-in;
$content-max-width: 500rem;

$centered-margin: 5rem;
$close-btn-size: 3rem;

$close-btn-padding: $gap-df;

.DropdownMenu {
	position: relative;

	&__activator {
		width: fit-content;
		height: fit-content;
		// position: relative;
		// overflow: visible;
	}

	&__close-btn-container {
		display: flex;
		justify-content: end;
		align-items: center;
	}

	&__close-btn {
		height: $close-btn-size;
		width: $close-btn-size;

		position: absolute;
		top: $close-btn-padding;
		right: $close-btn-padding;

		&__icon {
			padding: 0.2rem;
			@include iconButton;
			float: left;
		}
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

		&--centered {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			position: fixed;

			max-width: calc(100dvw - #{$centered-margin});
			max-height: calc(100dvh - #{$centered-margin});

			// overflow: auto;
		}

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
