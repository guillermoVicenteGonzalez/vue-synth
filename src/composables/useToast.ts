import type { ToastMessage } from "@/components/common/Toast/ToastCard.vue";
import { ref } from "vue";

interface ToastOptions {
	lifetime?: number;
}

const toastMessages = ref<ToastMessage[]>([]);
export default function useToast() {
	function addToast(message: ToastMessage, options?: ToastOptions) {
		toastMessages.value.push(message);

		if (!options) return;

		if (options.lifetime) {
			console.error("Setting lifetime");
			setTimeout(() => {
				const idx = toastMessages.value.indexOf(message);

				if (idx > -1) {
					toastMessages.value.splice(idx, 1);
				}
			}, options.lifetime);
		}
	}

	function addMultiple(messages: ToastMessage[], options: ToastOptions) {
		messages.forEach(m => {
			addToast(m, options);
		});
	}

	function removeMessage(message: ToastMessage) {
		const idx = toastMessages.value.indexOf(message);
		if (idx > -1) toastMessages.value.splice(idx, 1);
	}

	return {
		messages: toastMessages,
		addToast,
		addMultiple,
		removeMessage,
	};
}
