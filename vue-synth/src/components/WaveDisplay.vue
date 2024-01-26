<template>
    <div>
        <div class="waveCard">
            <div class="firstRow">
                <input type="checkbox">
            </div>

            <div class="centerCol">
                <select placeholder="waveform"></select>
                <WaveCanvas
                :wave="wave"></WaveCanvas>
                <div class="sliders">
                    <input type="range" 
                    min="1"
                    max="500"
                    v-model="wave.frequency" placeholder="frecuency" 
                    @input="emit('updateWave')">
                    <label>{{ wave.frequency }}</label>

                    <input type="range" 
                    v-model="wave.amplitude" placeholder="frecuency" 
                    @input="emit('updateWave')">
                    <label>{{ wave.amplitude }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { Wave } from "../models/wave";
import WaveCanvas from "@/components/WaveCanvas.vue";

const props = defineProps(["wave"]);
const emit = defineEmits(["updateWave"]);

const myCanvas = ref();
let context;
let amp = ref(2);
let frames = 0;


</script>

<style scoped>


    input[type=checkbox]{
        border-radius: 10px;
    }

    .waveCard{
        border-radius:20px;
        display: grid;
        background-color:var(--card-color);
        grid-template-columns:1fr 8fr 1fr;
        width:100%;
        height:fit-content;

        max-height: 300px;
        /* max-width:400px; */

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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .firstRow{
        display: grid;
        grid-template-rows:1fr 9fr;
    }

    input{

    }
</style>