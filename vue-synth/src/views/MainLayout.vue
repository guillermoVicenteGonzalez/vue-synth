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
                    @click="playSound()"
                    >
                    <PauseIcon v-if="isPlaying"></PauseIcon>
                    <PlayIcon v-else></PlayIcon>
                    </button>
                </template>
            </GCard>


        </section>


    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {Wave} from "../models/wave"
import waveList from "@/components/WaveList.vue"
import MainCanvas from '@/components/MainCanvas.vue';
import GCard from '@/components/GCard.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';

let waves = ref([]);
let isPlaying = ref(false);
let audioContext 
let merger 
let oscillators = []


function createNewWave(){
    let wave = new Wave(50,1,0);
    waves.value.push(wave);

    let tempOsc = audioContext.createOscillator();
    tempOsc.frequency.value = wave.getFrequency();
    tempOsc.connect(merger,0,2);
    tempOsc.start();
    oscillators.push(tempOsc);
    updateOscillators(oscillators,waves.value);
}


function updateOscillators(osc,waves){
    waves.forEach((wave, index) => {
        osc[index].frequency.value = wave.getFrequency();
        osc[index].type = wave.getForm();
    });
}


function playSound(){
    isPlaying.value ? audioContext.suspend():audioContext.resume();
    isPlaying.value = !isPlaying.value
}

/**
 * EVENT CALLBACKS
 */

function onWaveUpdated(){
    updateOscillators(oscillators, waves.value);
}



onMounted(()=>{
    audioContext = new AudioContext();
    audioContext.suspend();
    merger = audioContext.createChannelMerger();
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