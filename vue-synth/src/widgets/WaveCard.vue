<template>
  <AudioModuleCard>
    <div class="waveCard">
      <div class="waveCard__actions-slot"></div>

      <div class="waveCard__left-slot">
        <Selector v-model="wave.form" :items="Object.keys(waveForms)" class="selector" @change="onWaveChangeCB">
        </Selector>

        <div class="waveCard__controls">
          <div class="waveCard__control">
            <div class="waveCard__control__slider">
              <VerticalSlider v-model="wave.frequency" :range="1000" @valueChange="onWaveChangeCB"></VerticalSlider>
            </div>
            <span class="waveCard__control__valueBox">{{ wave.frequency }}</span>
          </div>

          <div class="waveCard__control">
            <div class="waveCard__control__slider">
              <VerticalSlider v-model="wave.amplitude" :range="50" @valueChange="onWaveChangeCB"></VerticalSlider>
            </div>
            <span class="waveCard__control__valueBox">{{ wave.amplitude }}</span>
          </div>
        </div>
      </div>

      <div class="waveCard__center-slot">
        <div class="waveCard__wave-slot">
          <WaveCanvas :wave="wave"></WaveCanvas>
        </div>
        <button @click="playWaveBtn">play wave</button>
        <button @click="deleteWave">delete</button>
      </div>
    </div>
  </AudioModuleCard>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import WaveCanvas from '../components/Waves/WaveCanvas.vue';
import Wave, { waveForms } from '@/models/wave';
import VerticalSlider from '@/components/Common/VerticalSlider.vue';
import Selector from '@/components/Common/Selector.vue';
import AudioModuleCard from '@/components/Waves/AudioModuleCard.vue';

const emit = defineEmits(['updateWave', 'deleteWave']);
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
  isPlaying.value = !isPlaying.value;
}

function deleteWave() {
  oscillator.stop();
  emit("deleteWave")
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

onUnmounted(() => {
})
</script>

<style scoped lang="scss">
$card-width: 30rem;
$card-height: 15rem;
$card-padding: 2rem;

.waveCard {
  // max-width: $card-width;
  width: 100%;
  // max-height: $card-height;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 2fr 8fr;

  // box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
  // border-radius: 20px;
  // overflow: hidden;

  &__left-slot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: $card-height;
    padding: $card-padding 1rem;
  }

  &__controls {
    max-height: 100%;
    display: flex;
    margin: 0 2rem;
  }

  &__control {
    &__slider {
      height: 90%;
      width: 100%;
    }

    &__valueBox {
      display: block;
      text-align: center;
    }
  }

  &__center-slot {
    display: flex;
    justify-content: ceter;
    align-items: center;
    flex-direction: column;
    padding: $card-padding;
  }

  &__wave-slot {
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
