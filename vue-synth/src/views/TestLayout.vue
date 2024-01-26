<template>
    <input v-bind:value="text">
    <p>{{ text}}</p>
</template>

<script setup>
import {ref, reactive} from "vue";
let contador = ref(0);
let text = ref();

function increment(){
    contador.value++;   
}

function onInput(e){
    text.value=e.target.value
}
</script>

<style scoped>

</style>