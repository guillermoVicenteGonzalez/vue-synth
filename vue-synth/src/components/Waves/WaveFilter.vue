<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <AudioModuleCard>
    <div class="card">
      <div class="card__top">
        <Selector :items="props.sources" v-model="currentSource" @change="onSourceChange"></Selector>
        <Selector :items="Object.keys(filterTypes)" v-model="filterType" @change="onFilterChange"></Selector>
      </div>

      <div class="card__body">
        <WaveAnalyzer :source="props.filter" v-if="currentSource"></WaveAnalyzer>
      </div>

      <div class="card__bottom">
        <input type="range" class="card__bottom__slider" v-model="cutoffFrequency" :max="1000" @input="onFilterChange" />
        <input type="number" class="card__bottom__input" v-model="cutoffFrequency" @input="onFilterChange" />
      </div>
    </div>
  </AudioModuleCard>
=======
  <div class="card">
    <div class="card__top">
      <Selector :items="props.sources" v-model="currentSource" @change="onSourceChange"></Selector>
      <Selector
        :items="Object.keys(filterTypes)"
        v-model="filterType"
        @change="onFilterChange"
      ></Selector>
    </div>
=======
  <AudioModuleCard>
    <div class="card">
      <div class="card__top">
        <Selector :items="props.sources" v-model="currentSource" @change="onSourceChange"></Selector>
        <Selector :items="Object.keys(filterTypes)" v-model="filterType" @change="onFilterChange"></Selector>
      </div>
>>>>>>> 4260106 (card component created)

      <div class="card__body">
        <WaveAnalyzer :source="props.filter" v-if="currentSource"></WaveAnalyzer>
      </div>

      <div class="card__bottom">
        <input type="range" class="card__bottom__slider" v-model="cutoffFrequency" :max="1000" @input="onFilterChange" />
        <input type="number" class="card__bottom__input" v-model="cutoffFrequency" @input="onFilterChange" />
      </div>
    </div>
<<<<<<< HEAD
  </div>
>>>>>>> 2c0de8d (wave filter structure)
=======
  </AudioModuleCard>
>>>>>>> 4260106 (card component created)
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Selector from '../Common/Selector.vue';
import WaveAnalyzer from './WaveAnalyzer.vue';
<<<<<<< HEAD
<<<<<<< HEAD
import AudioModuleCard from './AudioModuleCard.vue';
=======
>>>>>>> 2c0de8d (wave filter structure)
=======
import AudioModuleCard from './AudioModuleCard.vue';
>>>>>>> 4260106 (card component created)

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

<<<<<<< HEAD
<<<<<<< HEAD
  mixedWave: {
    type: AudioNode,
    // required: true,
  },
});

const emit = defineEmits(['attach-node', 'detach-node']);

=======
  mainCtxt: {
    type: AudioContext,
    required: true,
  },
});

>>>>>>> 2c0de8d (wave filter structure)
=======
  mixedWave: {
    type: AudioNode,
    // required: true,
  },
});

const emit = defineEmits(['attach-node', 'detach-node']);

>>>>>>> b94b397 (working filters)
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
<<<<<<< HEAD
<<<<<<< HEAD
let currentSource: Ref<AudioNode> = ref();
let previousSource: AudioNode; // * used just to know if it is the first time a node is attached
<<<<<<< HEAD
=======
let currentSource: Ref<AudioNode | undefined> = ref();
=======
let currentSource: Ref<AudioNode> = ref();
>>>>>>> b94b397 (working filters)
let previousSource: AudioNode;
>>>>>>> 2c0de8d (wave filter structure)
=======
>>>>>>> 9f97c7a (attach effects works)
let internalContext: Ref<AudioContext> = ref(new AudioContext());
let internalFilter: Ref<BiquadFilterNode> = ref(internalContext.value.createBiquadFilter());
let internalSource: AudioNode;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
console.log(filterType.value);
>>>>>>> 2c0de8d (wave filter structure)

=======
>>>>>>> b94b397 (working filters)
=======

>>>>>>> 9f97c7a (attach effects works)
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b94b397 (working filters)
  //   props.filter.frequency.setTargetAtTime(cutoffFrequency.value, props.mainCtxt.currentTime, 0);
  props.filter.frequency.setTargetAtTime(
    cutoffFrequency.value,
    currentSource.value.context.currentTime,
    0,
  );
  console.log('changing filter');
<<<<<<< HEAD
}

function onSourceChange() {
  if (previousSource != null) {
    // previousSource.disconnect(props.filter);
    emit('detach-node', props.sources.indexOf(previousSource));
<<<<<<< HEAD
  }
  console.log(currentSource.value);
  emit('attach-node', props.sources.indexOf(currentSource.value));
  previousSource = currentSource.value;
}

function onFilterDestroy() {
  emit('detach-node', currentSource.value);
=======
  props.filter.frequency.setTargetAtTime(cutoffFrequency.value, props.mainCtxt.currentTime, 0);
=======
>>>>>>> b94b397 (working filters)
}

function onSourceChange() {
<<<<<<< HEAD
  /**
   * Si cambia la source hay que
   * - desconectar la previa?
   * - asignar la source actual a la variable previa
   * - conectar la source al filtro prop (emitiendo un evento)
   * - crear una source interna
   */
<<<<<<< HEAD
>>>>>>> 2c0de8d (wave filter structure)
=======
  //   internalSource = currentSource.value.gain;
  //   console.log(internalSource);

  //conecto el filtro a la fuente
  //devuelvo el filtro en un evento para conectarlo al nodo pertinente
=======
>>>>>>> 1a249fc (wave collection (unused) + filter management)
  if (previousSource != null) {
    // previousSource.disconnect(props.filter);
    emit('detach-node', previousSource);
=======
>>>>>>> 9f97c7a (attach effects works)
  }
<<<<<<< HEAD
>>>>>>> b94b397 (working filters)
=======
  console.log(currentSource.value);
  emit('attach-node', props.sources.indexOf(currentSource.value));
  previousSource = currentSource.value;
}

function onFilterDestroy() {
  emit('detach-node', currentSource.value);
>>>>>>> 1a249fc (wave collection (unused) + filter management)
}
</script>

<style scoped lang="scss">
.card {
  display: block;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
<<<<<<< HEAD
  //   max-height: 13rem;
=======
  max-height: 13rem;
>>>>>>> 2c0de8d (wave filter structure)
=======
  //   max-height: 13rem;
>>>>>>> 4260106 (card component created)

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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 2c0de8d (wave filter structure)
=======

>>>>>>> 9f97c7a (attach effects works)
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
