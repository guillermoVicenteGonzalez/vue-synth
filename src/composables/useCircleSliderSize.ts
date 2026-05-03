import { computed } from "vue";
import { useMonitorSize } from "./useMonitorSize";

const { browserWidth } = useMonitorSize();

export default function useCircleSliderSize() {
	return computed(() => {
		if (browserWidth.value < 500) {
			return 55;
		}

		if (browserWidth.value < 700) {
			return 60;
		}

		if (browserWidth.value < 800) {
			return 65;
		}

		if (browserWidth.value < 1600) {
			return 70;
		}

		if (browserWidth.value < 1800) {
			return 75;
		}

		return 80;
	});
}
