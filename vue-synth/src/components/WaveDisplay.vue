<template>
        <div class="card waveCard">
            <div class="firstRow flex-center">
                <button 
                @click="emit('waveDeleted')"
                class="icon-btn btn">
                    <delete-icon  :size="30" class="icon"/>
                </button>
            </div>

            <div class="centerCol">
                <GSelector
                @change="onWaveChangeCB"
                v-model="wave.form"
                :items="waveForms"></GSelector>

                <WaveCanvas
                :wave="wave"></WaveCanvas>

                <div class="slider-container">
                    <input 
                    type="range"
                    class="slider" 
                    min="1"
                    max="700"
                    v-model="wave.frequency" placeholder="frecuency" 
                    @input="onWaveChangeCB">
                    <label>{{ wave.frequency }}</label>


                    <input 
                    class="slider"
                    v-if="dense"
                    min="1"
                    max="100"
                    type="range" 
                    v-model="wave.amplitude" placeholder="amplitude" 
                    @input="onWaveChangeCB">
                    <label>{{ wave.amplitude }}</label>
                </div>
            </div>

            <div class="rightCol flex-center">
                <button
                class="icon-btn btn"
                @click="playWaveBtn">
                    <pause-icon :size="30" class="icon" v-if="isPlaying"/>
                    <play-icon :size="30" class="icon" v-else/>
                </button>
            </div>
        </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { Wave } from "../models/wave";
import WaveCanvas from "@/components/WaveCanvas.vue";
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import GSelector from "./GSelector.vue";

const props = defineProps(["wave","dense"]);
const emit = defineEmits(["updateWave","waveDeleted"]);

let waveForms = ["sine","square","triangle","sawtooth"];
let audioContext;
let gainNode;
let oscillator;
let isPlaying = ref(false);

function playWaveBtn(){
    isPlaying.value ? audioContext.suspend():audioContext.resume();
    isPlaying.value = !isPlaying.value
}

function updateOscillator(){
    oscillator.frequency.value = props.wave.getFrequency();
    gainNode.gain.setValueAtTime(props.wave.getAmplitude()/50,audioContext.currentTime)
    oscillator.type= props.wave.getForm();
}

function onWaveChangeCB(){
    updateOscillator();
    emit("updateWave")
}


onMounted(()=>{
    audioContext = new AudioContext();
    audioContext.suspend();

    // gainNode = new GainNode(audioContext);
    // gainNode.connect(audioContext.destination)
    // gainNode.gain.cancelScheduledValues(audioContext.currentTime);
    // // gainNode.gain = 1;
    // gainNode.gain.value = 0;

    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    // gainNode.gain.setValueAtTime(1,audioContext.currentTime)

    oscillator = audioContext.createOscillator();
    oscillator.frequency.value = props.wave.getFrequency();
    oscillator.start();
    oscillator.connect(gainNode);
})
</script>

<style scoped>

    .waveCard{
        border-radius:20px;
        display: grid;
        grid-template-columns:1fr 7fr 1fr;
        /* width:fit-content;
        height:fit-content; */

        gap:10px;
        padding:15px 10px;
    }

    .centerCol{
        display: flex;
        flex-direction: column;
        gap:15px;
    }

    canvas{
        border-radius:10px;
        background-color: var(--canvas-bg);
        width: 100%;
        height: 100%;
        /* height:100%; */
    }

    .slider-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap:10px;
        padding: 0 10px;
        justify-content: center;
        align-items: center;
    }


    input{

    }
</style>