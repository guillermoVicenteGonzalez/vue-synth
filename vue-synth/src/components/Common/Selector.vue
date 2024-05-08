<template>
  <select v-model="model" class="selector" @change="emit('change')">
    <option value="" v-if="items.length == 0">{{ placeholder || 'select a value' }}</option>
    <option v-for="item in items" :value="item">{{ item }}</option>
  </select>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: [],
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
});
const model = defineModel('select an option');
const emit = defineEmits(['change']);
</script>

<style scoped lang="scss">
.selector {
  border-radius: 5px;
  outline: none;
}
</style>
