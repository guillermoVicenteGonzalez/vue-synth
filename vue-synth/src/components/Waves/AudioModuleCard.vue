<template>
  <div class="moduleCard">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
<<<<<<< HEAD
<<<<<<< HEAD
$card-width: 100rem;
=======
$card-width: 30rem;
>>>>>>> 4260106 (card component created)
=======
$card-width: 100rem;
>>>>>>> 3110368 (fixed card dimensions)
$card-height: 15rem;
$card-padding: 2rem;

.moduleCard {
  max-width: $card-width;
  width: 100%;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // height: fit-content;
  // aspect-ratio: 2/1;
  height: 20rem;

=======
  max-height: $card-height;
  height: 100%;
>>>>>>> 4260106 (card component created)
=======
  // max-height: $card-height;
  // height: 100%;
  height: fit-content;
  aspect-ratio: 2/1;
=======
  // height: fit-content;
  // aspect-ratio: 2/1;
  height: 20rem;
>>>>>>> 06a3705 (refactored some styles)

>>>>>>> 3110368 (fixed card dimensions)

  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
}
</style>
