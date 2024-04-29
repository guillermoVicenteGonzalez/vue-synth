<template>
  <div class="waveCard">
    <div class="waveCard__left-slot"></div>

    <div class="waveCard__center-slot">
      <div class="waveCard__wave-slot">
        <WaveCanvas :wave="myWave"></WaveCanvas>
      </div>
      <div class="waveCard__controls-slot"></div>
    </div>

    <div class="waveCard__right-slot"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import WaveCanvas from '../components/Waves/WaveCanvas.vue';
import Wave from '@/models/wave';

// let myWave: Ref<Wave> = ref(new Wave(20, 2, 2));

const props = defineProps({
  wave: {
    type: Wave,
    required: true,
    default: new Wave(2, 2, 2),
  },
});
</script>

<style scoped lang="scss">
.waveCard {
  max-width: 30rem;
  min-height: 10rem;
  max-height: 15rem;

  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 8fr 1fr;

  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  &__center-slot {
  }
}

canvas {
  border-radius: 10px;
  background-color: var(--canvas-bg);
  width: 100%;
  height: 100%;
}
</style>
