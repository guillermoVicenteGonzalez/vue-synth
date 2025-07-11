<template v-if="visible">
	<div
		v-if="visible"
		ref="selfReference"
		class="context-menu"
		:class="classObject"
		:style="{ top: posY + 'px', left: posX + 'px' }"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import useClickOutside from "@/composables/useClickOutside";
import { computed, onUnmounted, ref } from "vue";

type ContextMenuAnimations = "top" | "bot" | "left" | "right" | null;

interface ContextMenuProps {
	posX?: number;
	posY?: number;
	animation?: ContextMenuAnimations;
	visible?: boolean;
}

const {
	posX = 0,
	posY = 0,
	animation,
	visible = false,
} = defineProps<ContextMenuProps>();

const emit = defineEmits<(e: "close") => void>();

const selfReference = ref();

useClickOutside(selfReference, () => {
	handleCloseMenu();
});

const classObject = computed(() => ({
	[`context-menu--${animation}-animation`]: animation,
}));

function handleCloseMenu() {
	if (visible) emit("close");
}

function handleKeyDown(e: KeyboardEvent) {
	if (e.key === "Escape") handleCloseMenu();
}

document.addEventListener("keydown", handleKeyDown);

onUnmounted(() => {
	document.removeEventListener("keypress", handleKeyDown);
});
</script>

<style lang="scss" scoped>
$animation-duration: 0.1s;
$animation-timing-function: ease-in;

.context-menu {
	interpolate-size: allow-keywords;
	z-index: 10;
	background-color: #fff;
	position: fixed;
	// top: v-bind(posY);
	// left: v-bind(posX);
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 0px 1px 3px 1px #00000026;

	animation-duration: $animation-duration;
	animation-timing-function: $animation-timing-function;

	&--bot-animation {
		animation-name: contextMenuAnimationBot;
	}

	&--top-animation {
		animation-name: contextMenuAnimationTop;
	}
}

@keyframes contextMenuAnimationBot {
	0% {
		height: 0;
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		height: auto;
	}
}

@keyframes contextMenuAnimationTop {
	0% {
		height: 0;
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		height: auto;
	}
}
</style>
