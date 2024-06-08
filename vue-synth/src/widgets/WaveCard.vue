<template>
  <AudioModuleCard>
<<<<<<< HEAD
    <div :class="disabledStyles">
      <div class="waveCard__actions-slot">
        <ToggleButton v-model="disabled" @click="disableWave"></ToggleButton>
      </div>

<<<<<<< HEAD
      <div class="waveCard__left-slot">
        <Selector :disabled="disabled" v-model="wave.form" :items="Object.keys(waveForms)" class="selector"
          @change="onWaveChangeCB">
        </Selector>
=======
    <div class="waveCard__left-slot">
      <Selector
        v-model="wave.form"
        :items="Object.keys(waveForms)"
        class="selector"
        @change="onWaveChangeCB"
      ></Selector>
>>>>>>> b94b397 (working filters)

<<<<<<< HEAD
        <div class="waveCard__controls">
          <div class="waveCard__control">
            <div class="waveCard__control__slider">
              <VerticalSlider :disabled="disabled" v-model="wave.frequency" :range="1000" @valueChange="onWaveChangeCB">
              </VerticalSlider>
            </div>
            <span class="waveCard__control__valueBox">{{ wave.frequency }}</span>
          </div>

          <div class="waveCard__control">
            <div class="waveCard__control__slider">
              <VerticalSlider :disabled="disabled" v-model="wave.amplitude" :range="50" @valueChange="onWaveChangeCB">
              </VerticalSlider>
            </div>
            <span class="waveCard__control__valueBox">{{ wave.amplitude }}</span>
=======
      <div class="waveCard__controls">
        <div class="waveCard__control">
          <div class="waveCard__control__slider">
            <VerticalSlider
              v-model="wave.frequency"
              :range="1000"
              @valueChange="onWaveChangeCB"
            ></VerticalSlider>
>>>>>>> 2c0de8d (wave filter structure)
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div class="waveCard__center-slot">
        <div class="waveCard__wave-slot">
          <WaveCanvas :wave="wave" :paused="disabled"></WaveCanvas>
        </div>
        <div class="waveCard__buttons">
          <button @click="playWaveBtn" :disabled="disabled">play wave</button>
          <button @click="deleteWave" :disabled="disabled">delete</button>
=======
        <div class="waveCard__control">
          <div class="waveCard__control__slider">
            <VerticalSlider
              v-model="wave.amplitude"
              :range="50"
              @valueChange="onWaveChangeCB"
            ></VerticalSlider>
          </div>
          <span class="waveCard__control__valueBox">{{ wave.amplitude }}</span>
>>>>>>> b94b397 (working filters)
        </div>
      </div>
=======
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
>>>>>>> 4260106 (card component created)
    </div>
  </AudioModuleCard>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
  import { onMounted, onUnmounted, ref, type Ref, computed } from 'vue';
  import WaveCanvas from '../components/Waves/WaveCanvas.vue';
  import Wave, { waveForms } from '@/models/wave';
  import VerticalSlider from '@/components/Common/VerticalSlider.vue';
  import Selector from '@/components/Common/Selector.vue';
  import AudioModuleCard from '@/components/Waves/AudioModuleCard.vue';
  import ToggleButton from '@/components/Common/ToggleButton.vue';
=======
import { onMounted, ref, type Ref } from 'vue';
=======
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
>>>>>>> d4659da (wave deleted)
import WaveCanvas from '../components/Waves/WaveCanvas.vue';
import Wave, { waveForms } from '@/models/wave';
import VerticalSlider from '@/components/Common/VerticalSlider.vue';
import Selector from '@/components/Common/Selector.vue';
import AudioModuleCard from '@/components/Waves/AudioModuleCard.vue';
>>>>>>> 4260106 (card component created)

<<<<<<< HEAD
  const emit = defineEmits(['updateWave', 'deleteWave', "toggleWave"]);
  const props = defineProps({
    wave: {
      type: Wave,
      required: true,
      default: new Wave(2, 2, 2),
    },
=======
const emit = defineEmits(['updateWave', 'deleteWave']);
const props = defineProps({
  wave: {
    type: Wave,
    required: true,
    default: new Wave(2, 2, 2),
  },
});
>>>>>>> d4659da (wave deleted)

    name: {
      type: String,
      default: "wave "
    }
  });

  let audioContext: AudioContext;
  let gainNode: GainNode;
  let oscillator: OscillatorNode;
  let isPlaying: Ref<Boolean> = ref(false);
  let disabled = ref();

<<<<<<< HEAD
  let disabledStyles = computed(() => {
    return disabled.value
      ? "waveCard waveCard--disabled"
      : "waveCard"
  })
=======
function deleteWave() {
  oscillator.stop();
  audioContext.close();
  emit("deleteWave")
}

function updateOscillator() {
  oscillator.frequency.value = props.wave.getFrequency();
  gainNode.gain.setValueAtTime(props.wave.getAmplitude() / 50, audioContext.currentTime);
  oscillator.type = props.wave.getForm();
}
>>>>>>> d4659da (wave deleted)

  function playWaveBtn() {
    isPlaying.value ? audioContext.suspend() : audioContext.resume();
    gainNode.gain.setValueAtTime(props.wave.getAmplitude() / 50, audioContext.currentTime);
    isPlaying.value = !isPlaying.value;
  }

<<<<<<< HEAD
  function deleteWave() {
    oscillator.stop();
    audioContext.close();
    emit("deleteWave")
  }
=======

onMounted(() => {
  audioContext = new AudioContext();
  audioContext.suspend();
>>>>>>> d4659da (wave deleted)

  function updateOscillator() {
    oscillator.frequency.value = props.wave.getFrequency();
    gainNode.gain.setValueAtTime(props.wave.getAmplitude() / 50, audioContext.currentTime);
    oscillator.type = props.wave.getForm();
  }

<<<<<<< HEAD

  function onWaveChangeCB() {
    updateOscillator();
    emit('updateWave');
  }

  function disableWave() {
    if (disabled.value) {
      audioContext.suspend()
    } else {
      audioContext.resume();
    }
    emit("toggleWave", disabled.value)
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
=======
  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = props.wave.getFrequency();
  oscillator.start();
  oscillator.connect(gainNode);
});

onUnmounted(() => {
})
>>>>>>> d4659da (wave deleted)
</script>

<style scoped lang="scss">
  @import "../assets/base.scss";
  $card-width: 30rem;
  $card-height: 15rem;
  $card-padding: 2rem;

<<<<<<< HEAD
  .waveCard {
    // max-width: $card-width;
=======
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
>>>>>>> 4260106 (card component created)
    width: 100%;
    // max-height: $card-height;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 2fr 8fr;

    // box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
    // border-radius: 20px;
    // overflow: hidden;

    &--disabled {
      // background-color: red;
      position: relative;


      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba($color-primary, .1);
        backdrop-filter: blur(1px);
      }
    }

    &__left-slot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      // max-height: $card-height;
      height: 100%;
      padding: $card-padding 1rem;
      gap: .5rem;
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
      padding: $card-padding 2rem $card-padding 1rem;
      gap: 1rem;
    }

    &__wave-slot {
      width: 100%;
      height: 100%;
    }

    &__actions-slot {
      padding: 1rem 0;
      background-color: black;
      z-index: 99;
      // display: flex;
      // justify-content: center;
      // align-items: start;
    }

    &__buttons {
      display: flex;
      gap: 1rem;
    }
  }

  canvas {
    border-radius: 10px;
    background-color: var(--canvas-bg);
    width: 100%;
    height: 100%;
  }

  #disableWaveInput {
    display: none;
  }

  label {
    width: 1.5rem;
    height: 1.5rem;
    background-color: red;
    border-radius: 100px;
    position: relative;

    &::before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100px;
      content: "";
      width: 1rem;
      height: 1rem;
      background-color: blue;
      z-index: 99;
    }
  }
</style>
