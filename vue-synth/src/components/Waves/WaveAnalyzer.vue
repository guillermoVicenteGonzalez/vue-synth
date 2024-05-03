<template>
  <canvas ref="myCanvas"></canvas>
  <button @click="playSound">resume</button>
</template>

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
analyser.getByteTimeDomainData(dataArray);

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

function playSound() {
  props.sourceCtx.state == 'running' ? props.sourceCtx.suspend() : props.sourceCtx.resume();
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
  // analyser.getByteTimeDomainData(dataArray);
  props.source.connect(analyser);
  context = myCanvas.value.getContext('2d');

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
