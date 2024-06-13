<template>
  <div class="waveCardList">
<<<<<<< HEAD
<<<<<<< HEAD
    <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave" @update-wave="onWaveUpdated(index)"
      @delete-wave="onWaveDeleted(index)" @toggleWave="(disabled) => onWaveToggled(disabled, index)"></WaveCard>
=======
    <WaveCard
      v-for="(wave, index) in waves"
      :key="index"
      :wave="wave"
      @update-wave="onWaveUpdated(index)"
    ></WaveCard>
>>>>>>> 226b0cf (wave list widget)
=======
    <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave" @update-wave="onWaveUpdated(index)"
<<<<<<< HEAD
      @delete-wave="onWaveDeleted(index)"></WaveCard>
>>>>>>> d4659da (wave deleted)
=======
      @delete-wave="onWaveDeleted(index)" @toggleWave="(disabled) => onWaveToggled(disabled, index)"></WaveCard>
>>>>>>> 3634227 (disabled functionality)
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3634227 (disabled functionality)
  import Wave from '@/models/wave';
  import WaveCard from './WaveCard.vue';
  const props = defineProps({
    waves: {
      type: Array<Wave>,
      required: true,
      default: [],
    },
  });
<<<<<<< HEAD

  const emit = defineEmits(['waveUpdated', "waveDeleted", "waveToggled"]);

  function onWaveUpdated(index: number) {
    emit('waveUpdated', index);
  }

  function onWaveDeleted(index: number) {
    emit("waveDeleted", index)
  }

  function onWaveToggled(disabled: Boolean, index: number) {
    emit("waveToggled", disabled, index)
  }
</script>

<style scoped lang="scss">
  .waveCardList {
    //   margin: 1rem 0;
    border-right: solid 1px black;
    //   overflow: auto;
    overflow-y: auto;
    padding: 1rem;

    >* {
      margin-bottom: 1rem;
    }
  }
=======
import Wave from '@/models/wave';
import WaveCard from './WaveCard.vue';
const props = defineProps({
  waves: {
    type: Array<Wave>,
    required: true,
    default: [],
  },
});
=======
>>>>>>> 3634227 (disabled functionality)

  const emit = defineEmits(['waveUpdated', "waveDeleted", "waveToggled"]);

  function onWaveUpdated(index: number) {
    emit('waveUpdated', index);
  }

  function onWaveDeleted(index: number) {
    emit("waveDeleted", index)
  }

  function onWaveToggled(disabled: Boolean, index: number) {
    emit("waveToggled", disabled, index)
  }
</script>

<style scoped lang="scss">
  .waveCardList {
    //   margin: 1rem 0;
    border-right: solid 1px black;
    //   overflow: auto;
    overflow-y: auto;
    padding: 1rem;

    >* {
      margin-bottom: 1rem;
    }
  }
<<<<<<< HEAD
}
>>>>>>> 226b0cf (wave list widget)
=======
>>>>>>> 3634227 (disabled functionality)
</style>
