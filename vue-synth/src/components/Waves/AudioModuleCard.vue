<template>
  <div class="moduleCard">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$card-width: 30rem;
$card-height: 15rem;
$card-padding: 2rem;

.moduleCard {
  max-width: $card-width;
  width: 100%;
  max-height: $card-height;
  height: 100%;

  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
}
</style>
