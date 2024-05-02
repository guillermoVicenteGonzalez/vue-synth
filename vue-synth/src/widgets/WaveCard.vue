<template>
  <div class="waveCard">
    <div class="waveCard__actions-slot"></div>

    <div class="waveCard__left-slot">
      <div class="waveCard__controls">
        <!-- <span>Frequency</span> -->
        <div class="waveCard__controls__slider">
          <VerticalSlider v-model="wave.frequency"></VerticalSlider>
        </div>
        <span class="waveCard__controls__valueBox">{{ wave.frequency }}</span>
      </div>

      <div class="waveCard__controls">
        <!-- <span>Amplitude</span> -->
        <div class="waveCard__controls__slider">
          <VerticalSlider v-model="wave.amplitude"></VerticalSlider>
        </div>
        <span class="waveCard__controls__valueBox">{{ wave.amplitude }}</span>
      </div>
    </div>

    <div class="waveCard__center-slot">
      <div class="waveCard__wave-slot">
        <WaveCanvas :wave="wave"></WaveCanvas>
      </div>
      <div class="waveCard__controls-slot"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import WaveCanvas from '../components/Waves/WaveCanvas.vue';
import Wave from '@/models/wave';
import VerticalSlider from '@/components/Common/VerticalSlider.vue';

const emit = defineEmits(['updateWave', 'waveDeleted']);
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

function onWaveChangeCB() {
  updateOscillator();
  emit('updateWave');
}

onMounted(() => {
  audioContext = new AudioContext();
  audioContext.suspend();

  gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);

  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = props.wave.getFrequency();
  oscillator.start();
  oscillator.connect(gainNode);
});
</script>

<style scoped lang="scss">
$card-width: 40rem;
$card-height: 20rem;
$card-padding: 2rem;

.waveCard {
  max-width: $card-width;
  width: $card-width;
  max-height: $card-height;
  height: $card-height;

  display: grid;
  grid-template-columns: 1fr 2fr 8fr;

  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;

  &__left-slot {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: $card-height;
  }

  &__controls {
    padding: $card-padding 0;

    &__slider {
      // height: calc(#{$card-height} * 0.7 - #{$card-padding});
      height: calc(100% - #{$card-padding});
      width: 100%;
    }

    &__valueBox {
      display: block;
      text-align: center;
    }
  }

  &__wave-slot {
    padding: $card-padding;
    width: 100%;
    height: 100%;
  }

  &__actions-slot {
    background-color: black;
  }
}

canvas {
  border-radius: 10px;
  background-color: var(--canvas-bg);
  width: 100%;
  height: 100%;
}
</style>
