<template v-if="source">
	<canvas
		ref="analyserCanvas"
		:height="canvasHeight"
		:width="canvasWidth"
	></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

interface WaveAnalyserProps {
	canvasWidth?: number;
	canvasHeight?: number;
	source: AudioNode;
	lineColor?: string;
}

const {
	source,
	canvasWidth,
	canvasHeight,
	lineColor = "#000",
} = defineProps<WaveAnalyserProps>();

const analyserCanvas = ref();
let analyser: AnalyserNode | null = source.context.createAnalyser();
analyser.fftSize = 2048;
let context: CanvasRenderingContext2D;
const bufferLength: number = analyser.frequencyBinCount;
const dataArray: Uint8Array = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
const previousSource = ref<AudioNode>();
const animationFrameId = ref<number>(0);

function draw() {
	if (
		!analyser ||
		!analyserCanvas.value ||
		!analyserCanvas.value.width ||
		!analyserCanvas.value.height
	) {
		return;
	}

	animationFrameId.value = requestAnimationFrame(draw);
	analyser.getByteTimeDomainData(dataArray);

	context.fillStyle = "rgb(200 200 200)";
	context.fillRect(
		0,
		0,
		analyserCanvas.value.width,
		analyserCanvas.value.height
	);

	context.lineWidth = 2;
	context.strokeStyle = lineColor;

	context.beginPath();

	const sliceWidth = (analyserCanvas.value.width * 1.0) / bufferLength;
	let x = 0;

	for (let i = 0; i < bufferLength; i++) {
		const v = dataArray[i] / 128.0;
		const y = (v * analyserCanvas.value.height) / 2;

		if (i === 0) {
			context.moveTo(x, y);
		} else {
			context.lineTo(x, y);
		}

		x += sliceWidth;
	}

	context.lineTo(analyserCanvas.value.width, analyserCanvas.value.height / 2);
	context.stroke();
}

watch(
	() => source,
	() => {
		if (!analyser) return;
		if (previousSource.value) {
			previousSource.value.disconnect(analyser);
		}
		source.connect(analyser);
		previousSource.value = source;
	}
);

//otra opcion es lanzar un emit con la source antigua pidiendo que lo desconecte
//o directamente desconectarlo desde el padre?
//niguna funciona porque no tengo a que desconectarlo (el analizador)

onMounted(() => {
	if (!analyser) return;
	source.connect(analyser);
	if (!context) context = analyserCanvas.value.getContext("2d");
	previousSource.value = source;
	draw();
});

onBeforeUnmount(() => {
	previousSource.value = undefined;
	if (!analyser) return;
	source.disconnect(analyser);
	analyser.disconnect();
	analyser = null;
});
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
	object-fit: cover;
	background-color: white;
}
</style>
