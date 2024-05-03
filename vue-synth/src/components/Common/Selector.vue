<template>
  <select v-model="model" class="selector" @change="emit('change')">
    <option v-for="item in items" :value="item">{{ item }}</option>
  </select>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
const props = defineProps({
  items: {
    required: true,
  },
});
const model = defineModel();
const emit = defineEmits(['change']);
</script>

<style scoped lang="scss">
.selector {
  border-radius: 5px;
  outline: none;
}
</style>
