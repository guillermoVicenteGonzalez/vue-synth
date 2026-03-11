<template>
	<div class="ToastContainer">
		<ToastCard
			v-for="event in events"
			:key="event.message.content"
			:message="event.message"
			:variant="applyToastVariant(event)"
			@close-toast="handleCloseToast(event)"
		></ToastCard>
	</div>
</template>

<script setup lang="ts">
import useToast, { type ToastEvent } from "@/composables/useToast";
import ToastCard, { type ToastCardVariant } from "./ToastCard.vue";

const { events, removeMessage } = useToast();

function applyToastVariant(toast: ToastEvent): ToastCardVariant {
	switch (toast.severity) {
		case "error":
			return "error";

		case "warning":
			return "warning";

		default:
			return "default";
	}
}

function handleCloseToast(toast: ToastEvent) {
	removeMessage(toast);
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.ToastContainer {
	position: absolute;
	top: 0;

	display: flex;
	flex-direction: column;
	align-items: flex-end;

	height: 100dvh;
	width: 100dvw;

	z-index: 2;
	padding: $gap-df;
	gap: $gap-df;

	pointer-events: none;
}
</style>
