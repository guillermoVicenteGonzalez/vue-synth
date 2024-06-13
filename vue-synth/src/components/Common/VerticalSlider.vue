<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <input type="range" v-model="model" :max="range" @input="emit('valueChange')" class="verticalSlider" />
=======
  <input
    type="range"
    v-model="model"
    :max="range"
    @input="emit('valueChange')"
    class="verticalSlider"
  />
>>>>>>> 2c0de8d (wave filter structure)
=======
  <input type="range" v-model="model" :max="range" @input="emit('valueChange')" class="verticalSlider" />
>>>>>>> 06a3705 (refactored some styles)
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
.verticalSlider {
<<<<<<< HEAD
<<<<<<< HEAD
  // height: 100%;
=======
  height: 100%;
>>>>>>> 2c0de8d (wave filter structure)
=======
  // height: 100%;
>>>>>>> 06a3705 (refactored some styles)
  width: 100%;
  writing-mode: vertical-lr;
  direction: rtl;
}
</style>
