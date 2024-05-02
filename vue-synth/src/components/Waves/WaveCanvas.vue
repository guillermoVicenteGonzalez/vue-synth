<template>
  <canvas ref="myCanvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import Wave from '@/models/wave';

let myCanvas: Ref = ref();
// let myCanvas:Ref<HTMLCanvasElement | undefined> = ref();
let context: CanvasRenderingContext2D;
let frames = 0;

const props = defineProps({
  wave: {
    type: Wave,
    required: true,
    default: new Wave(2, 2, 2),
  },
});

const emit = defineEmits(['updateWave']);

function paintWave(w: Wave, ctx: CanvasRenderingContext2D = context, step = 0): Boolean {
  if (w == undefined) {
    return false;
  }

  let cWidth: number = ctx.canvas.width;
  let cHeight: number = ctx.canvas.height;
  let middle: number = cHeight / 2;

  ctx.clearRect(0, 0, cWidth, cHeight);
  ctx.beginPath();

  let points = w.calculatePoints(cWidth, step * w.frequency);
  for (let x = 0; x < cWidth; x++) {
    ctx.lineTo(x, middle + points[x]);
  }
  ctx.stroke();
  return true;
}

function animateWave(): Boolean {
  if (myCanvas.value == undefined) {
    return false;
  }

  frames += 0.1;
  let ctx: CanvasRenderingContext2D = myCanvas.value.getContext('2d');
  paintWave(props.wave, ctx, frames);

  window.requestAnimationFrame(animateWave);
  return true;
}

onMounted(() => {
  myCanvas.value.getContext('2d');
  window.requestAnimationFrame(animateWave);
});
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: solid 1px black;
}
</style>
