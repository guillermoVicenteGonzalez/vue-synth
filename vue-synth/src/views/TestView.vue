<template>
  <!-- <div class="testLayout">
    <h1 class="testLayout__heading">Test view</h1>

    <div class="testLayout__body">
      <div class="testLayout__body__left">
        <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave"></WaveCard>
      </div>

      <div class="testLayout__body__center">
        <MainWaveCanvas :waves="waves"></MainWaveCanvas>
      </div>
    </div>
  </div> -->
  <MainLayout>
    <template #header> Vue-synth</template>
    <template #side>
      <div class="waveCardList">
        <WaveCard
          v-for="(wave, index) in waves"
          :key="index"
          :wave="wave"
          @update-wave="onWaveUpdated(index)"
        ></WaveCard>
      </div>
      <button @click="createNewWave">new wave</button>
      <button @click="test">test</button>
    </template>

    <template #body>
      <MainWaveCanvas :source-ctx="mainContext" :source="merger"></MainWaveCanvas>
    </template>

    <template #footer>
      <h2>Footer</h2>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import Wave from '@/models/wave';
import MainWaveCanvas from '@/components/Waves/MainWaveCanvas.vue';
import WaveCard from '../widgets/WaveCard.vue';
import MainLayout from '@/Layouts/MainLayout.vue';
import { onMounted, ref, type Ref } from 'vue';

type oscillatorItem = {
  osc: OscillatorNode;
  gain: GainNode;
};

let waves: Ref<Wave[]> = ref([]);
let oscillators: Array<oscillatorItem> = [];
let mainContext: Ref = ref(new AudioContext());
let merger: ChannelMergerNode = mainContext.value.createChannelMerger();

function createNewWave() {
  let wave = new Wave(10, 40, 0);
  wave.setForm('square');
  waves.value.push(wave);

  let tempOsc = mainContext.value.createOscillator();
  tempOsc.frequency.value = wave.getFrequency();
  let gainNode = mainContext.value.createGain();
  gainNode.connect(merger, 0, 2);
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

function updateWaveOscillator(index: number): void {
  oscillators[index].osc.frequency.value = waves.value[index].getFrequency();
  oscillators[index].osc.type = waves.value[index].getForm();
  oscillators[index].gain.gain.setValueAtTime(
    waves.value[index].getAmplitude() / 50,
    mainContext.value.currentTime,
  );
}

function test() {
  mainContext.value.resume();
  console.log(merger);
}

onMounted(() => {
  mainContext.value.suspend();
  merger.connect(mainContext.value.destination);
});
</script>

<style scoped lang="scss">
.waveCardList {
  > * {
    margin: 1rem 0.5rem;
  }
}
</style>
