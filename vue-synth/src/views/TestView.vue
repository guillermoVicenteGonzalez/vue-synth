<template>
  <div class="testLayout">
    <h1 class="testLayout__heading">Test view</h1>

    <div class="testLayout__body">
      <div class="testLayout__body__left">
        <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave"></WaveCard>
      </div>

      <div class="testLayout__body__center">
        <MainWaveCanvas :waves="waves"></MainWaveCanvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Wave from '@/models/wave';
import MainWaveCanvas from '@/components/Waves/MainWaveCanvas.vue';
import WaveCard from '../widgets/WaveCard.vue';
import { ref, type Ref } from 'vue';

let waves: Ref<Wave[]> = ref([]);
</script>

<style scoped lang="scss">
.testLayout {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  &__heading {
    text-align: center;
  }

  &__body {
    display: grid;
    grid-template-columns: 2fr 8fr;
    height: auto;

    &__left {
      border-right: solid 1px black;
    }
  }
}
</style>
