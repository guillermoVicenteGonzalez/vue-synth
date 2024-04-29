<template>
  <canvas ref="myCanvas"></canvas>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
