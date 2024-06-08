<template>
  <MainLayout>
    <template #header> Vue-synth</template>
    <template #components>
      <div class="components">
        <WaveList :waves="waves" @wave-updated="onWaveUpdated" @wave-deleted="onWaveDeleted"></WaveList>
        <div class="components__filters">
          <WaveFilter v-for="filter in filters" :sources="oscillators.map((osc) => {
            return osc.gain;
          })
            " :filter="filter" :items="oscillators" :main-ctxt="mainContext"
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
import { onMounted, ref, type Ref } from 'vue';
import WaveAnalyzer from '@/components/Waves/WaveAnalyzer.vue';
import SumWavesDisplay from '@/components/Waves/SumWavesDisplay.vue';
import WaveList from '@/widgets/WaveList.vue';
import WaveFilter from '@/components/Waves/WaveFilter.vue';

type oscillatorItem = {
  osc: OscillatorNode;
  gain: GainNode;
};

let waves: Ref<Wave[]> = ref([]);
let oscillators: Array<oscillatorItem> = [];
let mainContext: Ref<AudioContext> = ref(new AudioContext());
let merger: Ref<ChannelMergerNode> = ref(mainContext.value.createChannelMerger());
let filters: Ref<BiquadFilterNode[]> = ref([]);

function createNewWave() {
  let wave = new Wave(10, 1, 0);
  wave.setForm('sine');
  waves.value.push(wave);

  let tempOsc = mainContext.value.createOscillator();
  tempOsc.frequency.value = wave.getFrequency();
  let gainNode = mainContext.value.createGain();
  gainNode.connect(merger.value, 0, 2);
  tempOsc.connect(gainNode);

  tempOsc.start();
  oscillators.push({
    osc: tempOsc,
    gain: gainNode,
  });

}

function onWaveUpdated(index: number): void {
  updateWaveOscillator(index);
}

function onWaveDeleted(index: number) {
  waves.value.splice(index, 1)
  oscillators[index].osc.stop();
  oscillators[index].gain.disconnect(merger.value);
  oscillators.splice(index, 1);
}


function attachEffect(effect: AudioNode, source: AudioNode, end: AudioNode) {
  console.log('attaching');
  console.log(source);
  console.log(effect);
  console.log(end);
  source.disconnect(end);
  source.connect(effect);
  effect.connect(end);
}

function updateWaveOscillator(index: number): void {
  oscillators[index].osc.frequency.value = waves.value[index].getFrequency();
  oscillators[index].osc.type = waves.value[index].getForm();
  oscillators[index].gain.gain.setValueAtTime(
    waves.value[index].getAmplitude() / 50,
    mainContext.value.currentTime,
  );
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
.waveCardList {
  >* {
    margin: 1rem 0.5rem;
  }
}

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
  grid-template-columns: 1.5fr 1fr;

  &__waveCardList {
    border-right: solid 1px black;
    overflow: auto;
    padding: 1rem 0.5rem;

    >* {
      margin-bottom: 1rem;
    }
  }

  &__filters {}
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
