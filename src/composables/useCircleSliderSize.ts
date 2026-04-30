import { computed } from "vue";
import { useMonitorSize } from "./useMonitorSize";

const { browserWidth } = useMonitorSize();

export default function useCircleSliderSize() {
	return computed(() => {
		if (browserWidth.value < 700) {
			return 60;
		}

		if (browserWidth.value < 800) {
			return 65;
		}

		if (browserWidth.value < 1200) {
			return 70;
		}

		return 80;
	});
}
