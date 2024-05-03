<template>
  <input type="range" orient="vertical" v-model="model" :max="range" />
</template>

<script setup>
let test = 5;
const model = defineModel();
const props = defineProps({
  range: {
    type: Number,
    default: 100,
  },
});
// const props = defineProps({
//   sliderValue: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });
</script>

<style scoped lang="scss">
input[type='range'][orient='vertical'] {
  appearance: slider-vertical;
  height: 100%;
  width: 100%;
}
</style>
