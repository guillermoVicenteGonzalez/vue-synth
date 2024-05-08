<template>
  <div class="card">
    <div class="card__top">
      <Selector :items="props.sources" v-model="currentSource" @change="onSourceChange"></Selector>
      <Selector :items="filterTypes" v-model="filterType" @change="onFilterChange"></Selector>
    </div>

    <div class="card__body">
      <!-- <WaveAnalyzer :source-ctx="internalContext"></WaveAnalyzer> -->
      <canvas></canvas>
    </div>

    <div class="card__bottom">
      <input type="range" class="card__bottom__slider" v-model="cutoffFrequency" range="1000" />
      <input type="number" class="card__bottom__input" v-model="cutoffFrequency" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Selector from '../Common/Selector.vue';
import WaveAnalyzer from './WaveAnalyzer.vue';

//recibe una coleccion de ondas (oscillators) a los que puede ser aplicado
//le paso un origen que no puede ser el destino y le añade un
//al cambiar
//la idea es que el filtro tenga su propio play button. Si se le asigna a una onda, la tarjeta de onda reproduce la onda pura y el filtro la onda filtrada.
//posible solucion. El evento change de este componente devuelve el filtro creado. El padre se encarga de asignarlo?
const props = defineProps({
  sources: {
    type: Array<AudioNode>,
    required: true,
    default: [],
  },

  filter: {
    type: BiquadFilterNode,
    required: true,
  },

  mainCtxt: {
    type: AudioContext,
    required: true,
  },
});

enum filterTypes {
  lowpass = 'lowpass',
  highpass = 'highpass',
  bandpass = 'bandpass',
  lowshelf = 'lowshelf',
  highself = 'highself',
  peaking = 'peaking',
  notch = 'notch',
  allpass = 'allpass',
}

let cutoffFrequency: Ref<number> = ref(0);
let filterType: Ref<BiquadFilterType> = ref('lowpass');
let currentSource: Ref<AudioNode | undefined> = ref();
let previousSource: AudioNode;
let internalContext: Ref<AudioContext> = ref(new AudioContext());
let internalFilter: Ref<BiquadFilterNode> = ref(internalContext.value.createBiquadFilter());
let internalSource: AudioNode;

console.log(filterType.value);

function onFilterChange() {
  /**
   * Cambio el filtro interno y el externo a la vez
   */
  internalFilter.value.type = filterType.value;
  props.filter.type = filterType.value;

  internalFilter.value.frequency.setTargetAtTime(
    cutoffFrequency.value,
    internalContext.value.currentTime,
    0,
  );

  props.filter.frequency.setTargetAtTime(cutoffFrequency.value, props.mainCtxt.currentTime, 0);
}

function onSourceChange() {
  /**
   * Si cambia la source hay que
   * - desconectar la previa?
   * - asignar la source actual a la variable previa
   * - conectar la source al filtro prop (emitiendo un evento)
   * - crear una source interna
   */
}
</script>

<style scoped lang="scss">
.card {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 13rem;

  border-radius: 20px;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);

  background-color: red;

  //   display: grid;
  //   grid-template-rows: 2fr 6fr 2fr;

  &__top {
    height: 20%;
    background-color: blue;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &:deep(select) {
      width: 100%;
    }
  }

  &__body {
    height: 60%;
    background-color: green;
    padding: 1rem 2rem;

    &:deep(canvas) {
      object-fit: fill;
      background-color: yellow;

      //BORRAR
      height: 100%;
      width: 100%;
    }
  }

  &__bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &__slider {
      width: 10rem;
    }

    &__input {
      width: 5rem;
    }
  }
}
</style>
