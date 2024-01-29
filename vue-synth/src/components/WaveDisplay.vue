<template>
    <div>
        <div class="waveCard">
            <div class="firstRow">
                <button 
                @click="emit('waveDeleted')"
                class="icon-btn">
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
                <div class="sliders">
                    <input type="range" 
                    min="1"
                    max="500"
                    v-model="wave.frequency" placeholder="frecuency" 
                    @input="onWaveChangeCB">
                    <label>Frec: {{ wave.frequency }}</label>

                    <input 
                    v-if="dense"
                    type="range" 
                    v-model="wave.amplitude" placeholder="amplitude" 
                    @input="onWaveChangeCB">
                    <label v-if="dense">Amp: {{ wave.amplitude }}</label>
                </div>
            </div>

            <div class="rightCol">
                <button
                class="icon-btn"
                @click="playWaveBtn">
                    <pause-icon :size="30" class="icon" v-if="isPlaying"/>
                    <play-icon :size="30" class="icon" v-else/>
                </button>
            </div>
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
    oscillator.type= props.wave.getForm();
}

function onWaveChangeCB(){
    updateOscillator();
    emit("updateWave")
}


onMounted(()=>{
    audioContext = new AudioContext();
    audioContext.suspend();

    oscillator = audioContext.createOscillator();
    oscillator.frequency.value = props.wave.getFrequency();
    oscillator.start();
    oscillator.connect(audioContext.destination);
})
</script>

<style scoped>


    input[type=checkbox]{
        border-radius: 10px;
    }

    .waveCard{
        border-radius:20px;
        display: grid;
        background-color:var(--card-color);
        grid-template-columns:1fr 7fr 1fr;
        width:fit-content;
        height:fit-content;

        /* max-height: 300px; */
        /* max-width:400px; */
        max-width: 100%;

        gap:10px;
        padding:15px 30px;
        /* padding:15px 20px; */
        /* margin:10px; */
    }

    .centerCol{
        display: flex;
        flex-direction: column;
        gap:10px;
    }

    canvas{
        border-radius:10px;
        background-color: var(--canvas-bg);
        width: 100%;
        /* height:100%; */
    }

    .sliders{
        /* padding:10px; */
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .firstRow{
        display: flex;
        justify-content:center;
        align-items: center;
    }

    .rightCol{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input{

    }
</style>