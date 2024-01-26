<template>
    <div class="layout">
        <div class="leftControls">
            <div class="waveCardList">
                <waveList
                :waves=waves
                @refresh-waves="onWaveUpdated"></waveList>
            </div>

            <button @click="createNewWave">new wave</button>
        </div>

        <section class="mainSection">
            <GCard>
                <template v-slot:body>
                    <MainCanvas
                    :waves="waves"></MainCanvas>
                </template>
                
                <template v-slot:actions>
                    <button class="btn"
                    @click="playSound(mainWavePoints,440000)"
                    >play sound</button>
                </template>
            </GCard>

            <button
            @click="playSound(mainWavePoints,440000)"
            >play sound</button>
        </section>


    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import WaveDisplaVue from "../components/WaveDisplay.vue"
import {Wave} from "../models/wave"
import waveList from "@/components/WaveList.vue"
import MainCanvas from '@/components/MainCanvas.vue';
import GCard from '@/components/GCard.vue';

let waves = ref([]);
let mainWavePoints = ref([]);

function createNewWave(){
    let wave = new Wave(50,1,0);
    waves.value.push(wave);
}

function onWaveUpdated(){
    // paintMainWave(waves.value, context);
}

function playSound(points,sampleRate=440){
    console.log(points)
    const audioContext = new AudioContext({sampleRate});
    const audioBuffer = audioContext.createBuffer(1,points.length,sampleRate);
    audioBuffer.copyToChannel(points,0);

    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = audioBuffer;
    source.start();
}

onMounted(()=>{
    // context = mainCanvas.value.getContext("2d");
    // context.width = 600;
})
</script>

<style scoped>
    .layout{
        width:100vw;
        height:100vh;
        display: grid;
        grid-template-columns:2fr 5fr 2fr;
    }



    .mainSection{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        margin: 5%;
    }

    .waveCardList{
        display: flex;
        flex-direction: column;
        gap:20px;
        margin:10px;
        overflow: auto;
        /* overflow:scroll; */
    }

    .leftControls{
        max-height: 100vh;
        display: grid;
        grid-template-rows: 9fr 1fr;
        border-right: solid 1px;
    }

    #mainCanvas{
        /* height: ; */
        height: fit-content;
        width: 100%;
        border:solid 1px;
    }

</style>