<template>
    <div class="layout">
        <div class="leftControls">
            <div class="waveCardList">
                <WaveDisplaVue 
                @update-wave="test"
                v-for="(wave, index) in waves"
                :key=index
                :wave="wave"></WaveDisplaVue>
            </div>

            <button @click="createNewWave">new wave</button>
        </div>

        <section class="mainSection">
            <WaveDisplaVue 
            :wave="mainWave"
            v-if="waves.length != 0"></WaveDisplaVue>
        </section>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import WaveDisplaVue from "../components/WaveDisplay.vue"
import {Wave} from "../models/wave"

let waves = ref([]);
let mainWave = ref(new Wave(50,1,0));

function addWaves(w1,w2){
    let nAmp = w1.amplitude;
    let nFrec = 2 * Math.cos((w1.frequency + w2.frequency)/2) * Math.sin((w1.frequency + w2.frequency)/2);
    console.log(nFrec)
    nFrec = Math.asin(nFrec)
    console.log(nFrec)

    return new Wave(nAmp,nFrec,0);
}

function generateMainWave(){
    let temp = waves.value[0];
    for(let i=1; i<waves.value.length; i++){
        temp = addWaves(temp, waves.value[i]);
    }

    mainWave.value = temp;
}

function createNewWave(){
    let wave = new Wave(50,1,0);
    waves.value.push(wave);
}

function test(){
    generateMainWave()
}
</script>

<style scoped>
    .layout{
        width:100vw;
        height:100vh;
        display: grid;
        grid-template-columns:2fr 5fr 1fr;
    }

    .mainSection{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .waveCardList{
        max-height: 100%;
        display: flex;
        flex-direction: column;
        gap:10px;
        overflow:scroll;
    }

    .leftControls{
        max-height: 100vh;
        display: grid;
        grid-template-rows: 9fr 1fr;
    }

</style>