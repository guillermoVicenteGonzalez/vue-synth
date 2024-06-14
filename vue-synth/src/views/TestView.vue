<template>
  <MainLayout>
    <template #header> Vue-synth</template>
    <template #components>
      <div class="components">
        <WaveList :waves="waves" @wave-updated="onWaveUpdated" @wave-deleted="onWaveDeleted"></WaveList>
        <div class="components__filters">
          <WaveFilter v-for="filter in filters" :sources="connectors" :filter="filter" :items="oscillators"
            :main-ctxt="mainContext" @detach-node="(source: AudioNode) => detachEffect(filter, source, merger)"
            @attach-node="(source: AudioNode) => attachEffect(filter, source, merger)"></WaveFilter>
        </div>
      </div>
      <div class="controls">
        <button @click="createNewWave">new wave</button>
        <button @click="playMainWave">play</button>
        <button @click="createNewFilter">new effect</button>
      </div>
    </template>

    <template #display>
      <div class="displays">
        <div class="displays__pure">
          <SumWavesDisplay :waves="waves"></SumWavesDisplay>
        </div>
        <div class="displays__analyser">
          <WaveAnalyzer :source-ctx="mainContext" :source="merger"></WaveAnalyzer>
        </div>
      </div>
    </template>

    <template #footer>
      <h2>Footer</h2>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import Wave from '@/models/wave';
import MainLayout from '@/Layouts/MainLayout.vue';
import { onMounted, ref, computed, type Ref } from 'vue';
import WaveAnalyzer from '@/components/Waves/WaveAnalyzer.vue';
import SumWavesDisplay from '@/components/Waves/SumWavesDisplay.vue';
import WaveList from '@/widgets/WaveList.vue';
import WaveFilter from '@/components/Waves/WaveFilter.vue';
import AudioModule from '@/models/AudioModule';

type oscillatorItem = {
  osc: OscillatorNode;
  gain: GainNode;
};

// let waves: Ref<Wave[]> = ref([]);
let waves = computed(() => {
  return waveModules.value.map((module) => {
    return module.wave
  })
})

let oscillators = computed(() => {
  return waveModules.value.map((module) => {
    return module.oscillator
  })
})

let connectors = computed(() => {
  return waveModules.value.map((module) => {
    return module.gain
  })
})


// let oscillators: Ref<oscillatorItem[]> = ref([]);
let mainContext: Ref<AudioContext> = ref(new AudioContext());
let merger: Ref<ChannelMergerNode> = ref(mainContext.value.createChannelMerger());
let filters: Ref<BiquadFilterNode[]> = ref([]);
let waveModules: Ref<AudioModule[]> = ref([])

function createNewWave() {
  let wave = new Wave(10, 1, 0);
  wave.setForm('sine');
  waves.value.push(wave);
  let waveName = `wave ${waveModules.value.length + 1}`

  let module = new AudioModule(waveName, wave, mainContext.value, merger.value)
  waveModules.value.push(module)
}

function onWaveUpdated(index: number): void {
  updateWaveOscillator(index);
}

function onWaveDeleted(index: number): void {
  waveModules.value[index].destroyModule();
  waveModules.value.splice(index, 1);
}



function attachEffect(effect: AudioNode, index: number) {
  waveModules.value[index].attachEffect(effect)
}


function detachEffect(effect: AudioNode, index: number) {
  waveModules.value[index].detachEffect(effect)
}

function updateWaveOscillator(index: number): void {
  waveModules.value[index].updateOscillator();
}

function createNewFilter() {
  let f: BiquadFilterNode = mainContext.value.createBiquadFilter();
  filters.value.push(f);
  console.log(filters.value.length);
}

function playMainWave() {
  mainContext.value.state == 'running' ? mainContext.value.suspend() : mainContext.value.resume();
  console.log(merger);
}

onMounted(() => {
  merger.value.connect(mainContext.value.destination);
});
</script>

<style scoped lang="scss">
.displays {
  height: 100%;
  resize: both;
  // display: grid;
  // grid-template-rows: 3fr 1fr;

  &__pure {
    height: 70%;
    // background-color: red;
  }

  &__analyser {
    height: 30%;
    resize: both;

    // background-color: blue;
    // > * {
    //   object-fit: fill;
    // }
    &:deep(canvas) {
      object-fit: fill;
      resize: both;
    }
  }
}

.components {
  height: 92%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;

  // &__waveCardList {
  //   border-right: solid 1px black;
  //   overflow: auto;
  //   // padding: 1rem 0.5rem;
  //   > * {
  //     margin-bottom: 1rem;
  //   }
  // }

  &__filters {
    overflow: auto;

    padding: 1rem;
  }
}

.controls {
  background-color: purple;
  height: 8%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>
