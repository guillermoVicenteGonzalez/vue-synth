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
      <WaveCard v-for="(wave, index) in waves" :key="index" :wave="wave"></WaveCard>
    </template>

    <template #body>
      <MainWaveCanvas :waves="waves"></MainWaveCanvas>
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
import { ref, type Ref } from 'vue';

let waves: Ref<Wave[]> = ref([]);

waves.value.push(new Wave(2, 2, 2));
waves.value.push(new Wave(10, 10, 0));
waves.value[1].setForm('square');
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
