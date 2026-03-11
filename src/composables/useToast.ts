import type { ToastMessage } from "@/components/common/Toast/ToastCard.vue";
import { ref } from "vue";

export interface ToastEvent {
	message: ToastMessage;
	lifetime?: number;
	severity?: "success" | "warning" | "info" | "error";
}

const toastEvents = ref<ToastEvent[]>([]);
export default function useToast() {
	function addToast(toast: ToastEvent) {
		toastEvents.value.push(toast);

		if (toast.lifetime) {
			setTimeout(() => {
				const idx = toastEvents.value.indexOf(toast);

				if (idx > -1) {
					toastEvents.value.splice(idx, 1);
				}
			}, toast.lifetime);
		}
	}

	function addMultiple(messages: ToastEvent[]) {
		messages.forEach(m => {
			addToast(m);
		});
	}

	function removeMessage(toast: ToastEvent) {
		const idx = toastEvents.value.indexOf(toast);
		if (idx > -1) toastEvents.value.splice(idx, 1);
	}

	return {
		events: toastEvents,
		addToast,
		addMultiple,
		removeMessage,
	};
}
