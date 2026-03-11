<template>
	<Transition name="fade">
		<dialog v-if="message" class="ToastCard" open :class="dynamicToastClass">
			<VsCard class="ToastCard__container">
				<div class="ToastCard__content">
					<h4 class="ToastCard__title">{{ message.title }}</h4>
					<span v-if="message.content" class="ToastCard__message">{{
						message.content
					}}</span>
				</div>
				<div class="ToastCard__actions">
					<VsButton
						variant="outlined"
						class="ToastCard__button"
						@click="handleCloseToast"
						>close</VsButton
					>
				</div>
			</VsCard>
		</dialog>
	</Transition>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount } from "vue";
import VsButton from "../VsButton/VsButton.vue";
import VsCard from "../VsCard/VsCard.vue";

export type ToastCardVariant = "default" | "warning" | "error";

interface ToastCardProps {
	message: ToastMessage;
	variant?: ToastCardVariant;
}

export interface ToastMessage {
	content?: string;
	title: string;
}

const { message, variant } = defineProps<ToastCardProps>();

const dynamicToastClass = computed(() => ({
	[`ToastCard--${variant}`]: variant,
}));

const emit = defineEmits<(e: "closeToast") => void>();

function handleCloseToast() {
	// removeMessage(message);
	emit("closeToast");
}

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
$min-toast-width: 35rem;
$min-toast-height: 1rem;
$max-toast-height: 5rem;

$animation-duration: 1s;

$toast-actions-width: 1rem;

.ToastCard {
	width: $min-toast-width;
	min-height: $min-toast-height;

	height: auto;

	display: block;

	border: none;
	outline: none;
	background-color: transparent;
	position: static;

	animation-name: fade-in;
	animation-duration: $animation-duration;
	pointer-events: all;
	// display: flex;

	&__container {
		padding: $gap-df;
		background-color: $bg-color-1;
		color: $text-color;

		display: flex;
		width: 100%;
		height: 100%;
	}

	&__content {
		flex: 1 1 100%;
	}

	&__message {
		font-size: 1.6rem;
	}

	&__title {
		font-size: 2rem;
	}

	&__actions {
	}

	&__button {
		width: 2rem;
		height: 3rem;
		border-color: $primary-color;
		color: $primary-color;
	}

	&--warning {
		.ToastCard {
			&__container {
				box-shadow: 0 0 0.1rem 0.1rem rgba($warning-color, 1);
			}

			&__button {
				border-color: $warning-color;
				color: $warning-color;
			}

			&__message,
			&__title {
				color: $warning-color;
			}
		}
	}

	&--error {
		.ToastCard {
			&__container {
				box-shadow: 0 0 0.1rem 0.1rem rgba($error-color, 1);
			}

			&__button {
				border-color: $error-color;
				color: $error-color;
			}

			&__message,
			&__title {
				color: $error-color;
			}
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@keyframes fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 100%;
	}
}

@keyframes fade-out {
	0% {
		opacity: 100%;
	}

	100% {
		opacity: 0%;
	}
}

@keyframes slide-in {
}
</style>
