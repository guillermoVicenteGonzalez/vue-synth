import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export function useMonitorSize() {
	const sizes = reactive({
		browserWidth: window.innerWidth,
		deviceWidth: screen.width,
		browserHeight: window.innerHeight,
		deviceHeight: screen.height,
		isMobile: false,
	});

	const browserResized = () => {
		sizes.browserWidth = window.innerWidth;
		sizes.browserHeight = window.innerHeight;
		sizes.deviceWidth = screen.width;
		sizes.deviceHeight = screen.height;
		sizes.isMobile = isMobile();
	};

	const isMobile = () => {
		return window.innerWidth <= 600 ? true : false;
	};

	onMounted(() => {
		window.addEventListener("resize", browserResized);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", browserResized);
	});

	return {
		...toRefs(sizes),
	};
}
