<template>
    <div>
        <div class="waveCard">
            <div class="firstRow">
                <input type="checkbox">
            </div>

            <div class="centerCol">
                <select></select>
                <canvas ref="myCanvas"></canvas>
                <div class="sliders">
                    <input type="range" v-model="wave.amplitude" placeholder="amplitude" @change="paintWave(w)">
                    <input type="range" v-model="wave.frecuency" placeholder="frecuency" @dragleave="paintWave(w)">
                </div>
            </div>
        </div>
        <button @click="paintWave(wave,context)">paint</button>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { Wave } from "../models/wave";

const props = defineProps(["wave"]);
const emit = defineEmits(["updateWave"]);

const myCanvas = ref();
let context;
let amp = ref(2);


function paintWave(w,ctx=context){
    console.log(w);
    let cWidth = ctx.canvas.width;
    let cHeight = ctx.canvas.height;
    let middle = cHeight/2;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.beginPath();
    
    let points = w.calculatePoints(cWidth);
    for(let x=0; x<cWidth; x++){
        ctx.lineTo(x, (middle + points[x]));
        console.log(middle + points[x]);
    }
    ctx.stroke();
}

onMounted(()=>{
    context = myCanvas.value.getContext("2d");
    paintWave();
})

</script>

<style scoped>
    .waveCard{
        border-radius:5px;
        display: grid;
        background-color:var(--card-color);
        grid-template-columns:1fr 5fr;
        width:100%;
        height:fit-content;

        max-height: 300px;
        max-width:500px;

        gap:10px;
        padding:10px;
        /* padding:15px 20px; */
        /* margin:10px; */
    }

    .centerCol{
        display: flex;
        flex-direction: column;
        gap:2px;
    }

    canvas{
        background-color: rgb(78, 78, 78);
        width: 100%;
        height:100%;
    }

    .sliders{
        /* padding:10px; */
        display: flex;
        justify-content: space-around;
    }

    .firstRow{
        display: grid;
        grid-template-rows:1fr 9fr;
    }

    input{

    }
</style>