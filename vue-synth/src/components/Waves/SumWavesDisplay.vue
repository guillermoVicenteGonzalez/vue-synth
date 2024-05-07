<template>
  <canvas ref="myCanvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Wave from '@/models/wave';

let myCanvas = ref();
let context;
let frames = 0;

const props = defineProps({
  waves: {
    type: Array<Wave>,
    required: true,
  },
});

function paintMainWave(waves: Wave[], ctx: CanvasRenderingContext2D, step = 0) {
  if (!Array.isArray(waves) || waves.length == 0) {
    return false;
  }

  let height = ctx.canvas.height;
  let length = ctx.canvas.width;
  let middle = height / 2;
  ctx.clearRect(0, 0, length, height);
  ctx.beginPath();

  let wavePoints = Wave.addWaves(waves, length, step);
  wavePoints.forEach((y, x) => {
    ctx.lineTo(x, middle + y);
  });

  ctx.stroke();
}

function animateWave() {
  frames += 0.1;
  let ctx = myCanvas.value.getContext('2d');
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
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  padding: 4px;
}
</style>
