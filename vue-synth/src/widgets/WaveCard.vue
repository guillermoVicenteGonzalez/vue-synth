<template>
  <div class="waveCard">
    <div class="waveCard__left-slot"></div>

    <div class="waveCard__center-slot">
      <div class="waveCard__wave-slot">
        <WaveCanvas :wave="wave"></WaveCanvas>
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

const props = defineProps({
  wave: {
    type: Wave,
    required: true,
    default: new Wave(2, 2, 2),
  },
});

let audioContext: AudioContext;
let gainNode: GainNode;
let oscillator: OscillatorNode;
let isPlaying: Ref<Boolean> = ref(false);

function playWaveBtn() {
  isPlaying.value ? audioContext.suspend() : audioContext.resume();
  gainNode.gain.setValueAtTime(props.wave.getAmplitude() / 50, audioContext.currentTime);
}

function updateOscillator() {
  oscillator.frequency.value = props.wave.getFrequency();
  gainNode.gain.setValueAtTime(props.wave.getAmplitude() / 50, audioContext.currentTime);
  oscillator.type = props.wave.getForm();
}
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
