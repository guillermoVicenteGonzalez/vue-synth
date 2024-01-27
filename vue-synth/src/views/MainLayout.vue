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
                    @click="playSound(waves)"
                    >play sound</button>
                </template>
            </GCard>


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
let isPlaying = false
let audioContext 
let merger 

function deleteWaveCB(){

}

function createNewWave(){
    let wave = new Wave(50,1,0);
    let oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    
    let waveStructure= {
        wave:wave,
        ignore:false,
        oscillator:undefined
    };
    waves.value.push(wave);
}

function onWaveUpdated(){
    // paintMainWave(waves.value, context);
}


function playSound(waves){
    if(!isPlaying){
        isPlaying = true;
        let audioContext = new AudioContext();
        let oscillators = [];
        let merger = audioContext.createChannelMerger(waves.length);
        merger.connect(audioContext.destination)

        for(let i=0; i < waves.length;i++){
            let tempOsc = audioContext.createOscillator();
            tempOsc.type = "sine";
            tempOsc.frequency.value = waves[i].frequency;
            tempOsc.connect(merger,0,i);
            tempOsc.start();
            oscillators.push(tempOsc);
        }
    }else{
        isPlaying = false
    }
}

onMounted(()=>{
    audioContext = new AudioContext();
    merger = audioContext.createChannelMerger(10);
    merger.connect(audioContext.destination)
})
</script>

<style scoped>
    .layout{
        width:100vw;
        height:100vh;
        display: grid;
        grid-auto-flow: row;
        grid-template-columns:3.5fr 6.5fr;
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