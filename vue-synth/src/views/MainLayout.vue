<template>
    <div class="layout">
        <div class="waveCardList">
            <WaveDisplaVue 
            v-for="(wave, index) in waves"
            :key=index
            :wave="wave"></WaveDisplaVue>
        </div>

        <section class="mainSection">
            <canvas></canvas>
        </section>

       <button
       @click="createNewWave">new wave</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WaveDisplaVue from "../components/WaveDisplay.vue"
import {Wave} from "../models/wave"

let waves = ref([]);
        
function createNewWave(){
    let wave = new Wave(50,1,0);
    waves.value.push(wave);
}

</script>

<style scoped>
    .layout{
        width:100vw;
        height:100vh;
        display: grid;
        grid-template-columns:2fr 5fr 1fr;
    }

    .mainSection{}

</style>