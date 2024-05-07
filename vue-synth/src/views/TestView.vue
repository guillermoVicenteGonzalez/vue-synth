<template>
  <MainLayout>
    <template #header> Vue-synth</template>
    <template #components>
<<<<<<< HEAD
<<<<<<< HEAD
      <div class="components">
        <WaveList :waves="waves" @wave-updated="onWaveUpdated" @wave-deleted="onWaveDeleted"
          @waveToggled="(disabled, index) => onWaveToggled(disabled, index)"></WaveList>
        <div class="components__filters">
          <WaveFilter v-for="filter in filters" :sources="connectors" :filter="filter" :items="oscillators"
            :main-ctxt="mainContext" @detach-node="(sourceIndex: number) => detachEffect(filter, sourceIndex)"
            @attach-node="(sourceIndex: number) => attachEffect(filter, sourceIndex)"></WaveFilter>
        </div>
      </div>
      <div class="controls">
        <button @click="createNewWave">new wave</button>
        <button @click="playMainWave">play</button>
        <button @click="createNewFilter">new effect</button>
      </div>
    </template>

<<<<<<< HEAD
    <template #display>
      <div class="displays">
        <div class="displays__pure">
          <SumWavesDisplay :waves="enabledWaves"></SumWavesDisplay>
=======
      <div class="waveCardList">
        <WaveCard
          v-for="(wave, index) in waves"
          :key="index"
          :wave="wave"
          @update-wave="onWaveUpdated(index)"
        ></WaveCard>
=======
      <div class="components">
        <div class="components__waveCardList">
          <WaveCard
            v-for="(wave, index) in waves"
            :key="index"
            :wave="wave"
            @update-wave="onWaveUpdated(index)"
          ></WaveCard>
        </div>
        <div class="components__filters"></div>
      </div>
      <div class="controls">
>>>>>>> 9159e72 (added scroll controls and main wave sound)
        <button @click="createNewWave">new wave</button>
        <button @click="playMainWave">play</button>
      </div>
    </template>

    <template #display>
      <div class="displays">
        <div class="displays__pure">
          <SumWavesDisplay :waves="waves"></SumWavesDisplay>
>>>>>>> b5386c1 (correctly populated layout)
        </div>
        <div class="displays__analyser">
          <WaveAnalyzer :source-ctx="mainContext" :source="merger"></WaveAnalyzer>
        </div>
<<<<<<< HEAD
      </div>
=======
    <template #body>
      <!-- <MainWaveCanvas :source-ctx="mainContext" :source="merger"></MainWaveCanvas> -->
      <!-- <WaveAnalyzer :source-ctx="mainContext" :source="merger"></WaveAnalyzer> -->
      <SumWavesDisplay :waves="waves"></SumWavesDisplay>
>>>>>>> 16e5dcc (main wave canvas added)
=======
        <!-- <WaveAnalyzer :source-ctx="mainContext" :source="merger"></WaveAnalyzer> -->
      </div>
>>>>>>> b5386c1 (correctly populated layout)
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

<<<<<<< HEAD
  // let waves: Ref<Wave[]> = ref([]);
=======
let waves: Ref<Wave[]> = ref([]);
let oscillators: Array<oscillatorItem> = [];
let mainContext: Ref<AudioContext> = ref(new AudioContext());
// let merger: ChannelMergerNode = mainContext.value.createChannelMerger();
let merger: Ref<ChannelMergerNode> = ref(mainContext.value.createChannelMerger());
// let merger: Ref = ref();
>>>>>>> b5386c1 (correctly populated layout)

  let mainContext: Ref<AudioContext> = ref(new AudioContext());
  let merger: Ref<ChannelMergerNode> = ref(mainContext.value.createChannelMerger());
  let filters: Ref<BiquadFilterNode[]> = ref([]);
  let waveModules: Ref<AudioModule[]> = ref([])

<<<<<<< HEAD
  let enabledWaves = computed(() => {
    return waveModules.value.filter(module => !module.disabled)
      .map((module) => {
        return module.wave
      })
  })
=======
  let tempOsc = mainContext.value.createOscillator();
  tempOsc.frequency.value = wave.getFrequency();
  let gainNode = mainContext.value.createGain();
  gainNode.connect(merger.value, 0, 2);
  tempOsc.connect(gainNode);
>>>>>>> b5386c1 (correctly populated layout)

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
    // oscillators.value[index].osc.frequency.value = waves.value[index].getFrequency();
    // oscillators.value[index].osc.type = waves.value[index].getForm();
    // oscillators.value[index].gain.gain.setValueAtTime(
    //   waves.value[index].getAmplitude() / 50,
    //   mainContext.value.currentTime,
    // );
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

  function onWaveToggled(disabled: Boolean, index: number) {
    // if disabled = true, that means we have to "untoggle" the wave
    waveModules.value[index].toggleModule(!disabled)
  }

  onMounted(() => {
    merger.value.connect(mainContext.value.destination);
  });
<<<<<<< HEAD
=======
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

function playMainWave() {
  // mainContext.value.resume();
  mainContext.value.state == 'running' ? mainContext.value.suspend() : mainContext.value.resume();
  console.log(merger);
}

onMounted(() => {
  // merger.value = mainContext.value.createChannelMerger();
  merger.value.connect(mainContext.value.destination);
});
>>>>>>> b5386c1 (correctly populated layout)
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
<<<<<<< HEAD
=======
}

.displays {
  height: 100%;
  // display: grid;
  // grid-template-rows: 3fr 1fr;

  &__pure {
    height: 70%;
    // background-color: red;
  }

  &__analyser {
    height: 30%;
    // background-color: blue;
    > * {
      object-fit: fill;
    }
  }
}
<<<<<<< HEAD
>>>>>>> b5386c1 (correctly populated layout)
=======

.components {
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__waveCardList {
    border-right: solid 1px black;
    overflow: auto;
  }
}

.controls {
  background-color: purple;
  height: 10%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
>>>>>>> 9159e72 (added scroll controls and main wave sound)
</style>
