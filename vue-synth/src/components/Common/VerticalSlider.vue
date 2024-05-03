<template>
  <input type="range" orient="vertical" v-model="model" :max="range" @input="emit('valueChange')" />
</template>

<script setup>
const model = defineModel();
const props = defineProps({
  range: {
    type: Number,
    default: 100,
  },
});
const emit = defineEmits(['valueChange']);
</script>

<style scoped lang="scss">
input[type='range'][orient='vertical'] {
  appearance: slider-vertical;
  height: 100%;
  width: 100%;
}
</style>
