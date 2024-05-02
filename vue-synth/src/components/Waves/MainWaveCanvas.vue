<template>
  <canvas ref="myCanvas"></canvas>
  <button @click="test">resume</button>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import Wave from '@/models/wave';

const props = defineProps({
  waves: {
    type: Array<Wave>,
    required: true,
  },
});

let myCanvas: Ref = ref();
let context: CanvasRenderingContext2D;
let frames: number = 0;

function paintMainWave(waves: Wave[], ctx: CanvasRenderingContext2D, step: number = 0): Boolean {
  if (!Array.isArray(waves) || waves.length == 0) {
    return false;
  }

  let height: number = ctx.canvas.height;
  let length: number = ctx.canvas.width;
  let middle: number = height / 2;
  ctx.clearRect(0, 0, length, height);
  ctx.beginPath();

  let wavePoints = Wave.addWaves(waves, length, step);
  if (wavePoints.length == 0) {
    return false;
  }

  wavePoints.forEach((y, x) => {
    ctx.lineTo(x, middle + y);
  });

  ctx.stroke();
  return true;
}

function animateWave() {
  frames += 0.1;
  let ctx: CanvasRenderingContext2D = myCanvas.value.getContext('2d');
  if (ctx != undefined) {
    paintMainWave(props.waves, ctx, frames);
  }

  if (frames > 10000000) {
    frames = 0;
  }

  window.requestAnimationFrame(animateWave);
}

onMounted(() => {
  context = myCanvas.value.getContext('2d');
  paintMainWave(props.waves, context);
  window.requestAnimationFrame(animateWave);
});
</script> -->

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import Wave from '@/models/wave';

const props = defineProps({
  sourceCtx: {
    type: AudioContext,
    required: true,
    // default: new window.AudioContext(),
  },
  source: {
    type: ChannelMergerNode,
    required: true,
    // default: new window.AudioContext().createChannelMerger(),
  },
});

let analyser: AnalyserNode = props.sourceCtx.createAnalyser();
analyser.fftSize = 2048;

let bufferLength: number = analyser.frequencyBinCount;
let dataArray: Uint8Array = new Uint8Array(bufferLength);

let myCanvas: Ref = ref();
let context: CanvasRenderingContext2D;

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  context.fillStyle = 'rgb(200 200 200)';
  context.fillRect(0, 0, myCanvas.value.width, myCanvas.value.height);

  context.lineWidth = 2;
  context.strokeStyle = 'rgb(0 0 0)';

  context.beginPath();

  const sliceWidth = (myCanvas.value.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * myCanvas.value.height) / 2;

    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }

    x += sliceWidth;
  }

  context.lineTo(myCanvas.value.width, myCanvas.value.height / 2);
  context.stroke();
}

function test() {
  props.sourceCtx.resume();
  console.log(props.sourceCtx);
}

onMounted(() => {
  // analyser = props.sourceCtx.createAnalyser();
  // analyser.fftSize = 2048;

  // bufferLength = analyser.frequencyBinCount;
  // dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  props.source.connect(analyser);

  context = myCanvas.value.getContext('2d');
  // console.log(myCanvas.value);
  console.log(context);
  console.log(myCanvas.value.width);

  draw();
});
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
