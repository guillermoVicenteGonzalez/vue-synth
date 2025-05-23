import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export function useMonitorSize() {
	const isMobile = () => {
		return window.innerWidth <= 600;
	};

	const sizes = reactive({
		browserWidth: window.innerWidth,
		deviceWidth: screen.width,
		browserHeight: window.innerHeight,
		deviceHeight: screen.height,
		isMobile: isMobile(),
	});

	const browserResized = () => {
		alert("mounted");

		sizes.browserWidth = window.innerWidth;
		sizes.browserHeight = window.innerHeight;
		sizes.deviceWidth = screen.width;
		sizes.deviceHeight = screen.height;
		sizes.isMobile = isMobile();
		console.log(sizes.isMobile);
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
