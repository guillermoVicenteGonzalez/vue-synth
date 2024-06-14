<template>
  <input type="range" v-model="model" :max="range" @input="emit('valueChange')" class="verticalSlider" />
</template>

<script setup lang="ts">
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
  // height: 100%;
  width: 100%;
  writing-mode: vertical-lr;
  direction: rtl;
}
</style>
