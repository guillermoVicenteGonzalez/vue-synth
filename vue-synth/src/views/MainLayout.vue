<template>
    <div class="layout">
        <div class="leftControls">
            <div class="waveCardList">
                <!-- <WaveDisplaVue 
                @update-wave="onWaveUpdated"
                v-for="(wave, index) in waves"
                :key=index
                :wave="wave"></WaveDisplaVue> -->
                <waveList
                :waves=waves
                @refresh-waves="onWaveUpdated"></waveList>
            </div>

            <button @click="createNewWave">new wave</button>
        </div>

        <section class="mainSection">
            <canvas id="mainCanvas" ref="mainCanvas"></canvas>
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

let mainCanvas = ref();
let context;
let waves = ref([]);
let mainWavePoints = ref([]);

function addWaves(w1,w2){
    let nAmp = w1.amplitude;
    let nFrec = 2 * Math.cos((w1.frequency + w2.frequency)/2) * Math.sin((w1.frequency + w2.frequency)/2);
    console.log(nFrec)
    nFrec = Math.asin(nFrec)
    console.log(nFrec)

    return new Wave(nAmp,nFrec,0);
}


// function generateMainWavePoints(waves,length){
//     let points = [];
//     for(let x=0;x<length; x++){
//         let y = 0;
//         waves.forEach(wave => {
//             y += wave.amplitude * Math.sin(x * wave.getAngFrec()/length);
//         });
//         points.push(y);
//     }

//     console.log(points)
//     return points;
// }

function paintMainWave(waves, ctx, phase=0){
    console.log(waves)
    let points = []
    let height = ctx.canvas.height;
    let length = ctx.canvas.width;
    let middle = height/2;
    ctx.clearRect(0, 0, length, height);
    ctx.beginPath();
    
    for(let x=0;x<length; x++){
        let y = 0;
        waves.forEach(wave => {
            y += wave.amplitude * Math.sin(x * wave.getAngFrec()/length);
        });
        ctx.lineTo(x,(middle + y));
        mainWavePoints.value.push(y);
    }
    //desde 0 hasta longitud del canvas
        //desde 0 hasta numero de ondas
    ctx.stroke();
}

function createNewWave(){
    let wave = new Wave(50,1,0);
    waves.value.push(wave);
}

function onWaveUpdated(){
    paintMainWave(waves.value, context);

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
    context = mainCanvas.value.getContext("2d");
    context.width = 600;
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