<template>
  <div class="waveCardList">
    <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave" @update-wave="onWaveUpdated(index)"
      @delete-wave="onWaveDeleted(index)"></WaveCard>
  </div>
</template>

<script setup lang="ts">
import Wave from '@/models/wave';
import WaveCard from './WaveCard.vue';
const props = defineProps({
  waves: {
    type: Array<Wave>,
    required: true,
    default: [],
  },
});

const emit = defineEmits(['waveUpdated', "waveDeleted"]);

function onWaveUpdated(index: number) {
  emit('waveUpdated', index);
}

function onWaveDeleted(index: number): void {
  emit("waveDeleted", index)
}
</script>

<style scoped lang="scss">
.waveCardList {
  border-right: solid 1px black;
  overflow: auto;
  padding: 1rem 0.5rem;

  >* {
    margin-bottom: 1rem;
  }
}
</style>
