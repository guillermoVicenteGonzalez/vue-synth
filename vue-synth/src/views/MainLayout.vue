<template>
    <div class="layout">
        <div class="leftMenu">
            <div class="waveCardList">
                <waveList
                :waves=waves
                @refresh-waves="onWaveUpdated"></waveList>
            </div>

            <div class="leftMenuActions">
                <button 
                class="btn newWaveBtn default-btn"
                @click="createNewWave">
                    <plus-icon :size="30" class="icon"/>
                </button>
            </div>
        </div>

        <section class="mainSection">
            <GCard>
                <template v-slot:body>
                    <MainCanvas
                    :waves="waves"></MainCanvas>
                </template>
                
                <template v-slot:actions>
                    <button class="btn default-btn"
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
import PlusIcon from 'vue-material-design-icons/Plus.vue';


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
    let gainNode = audioContext.createGain();
    gainNode.connect(merger,0,2);
    tempOsc.connect(gainNode);

    // tempOsc.connect(merger,0,2);
    tempOsc.start();
    oscillators.push({
        osc:tempOsc,
        gain:gainNode
    });
    updateOscillators(oscillators,waves.value);
}


function updateOscillators(osc,waves){
    waves.forEach((wave, index) => {
        osc[index].osc.frequency.value = wave.getFrequency();
        osc[index].osc.type = wave.getForm();
        osc[index].gain.gain.setValueAtTime(wave.getAmplitude()/50, audioContext.currentTime)
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
        height: 100vh;
        width:100vw;
        display: grid;
        grid-template-columns: 2fr 8fr;
    }


    .leftMenuActions{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .mainSection{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5%;
    }


    .waveCardList{
        display: flex;
        flex-direction: column;
        gap:20px;
        margin:10px;
        overflow: auto;
        /* overflow:scroll; */
    }

    .leftMenu{
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