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
                    <!-- <input 
                    type="range"
                    v-model="wave.amplitude"
                    @input="paintWave(wave)">
                    <label>{{ wave.amplitude }}</label> -->

                    <input type="range" v-model="wave.frequency" placeholder="frecuency" @input="paintWave(wave), emit('updateWave')">
                    <label>{{ wave.frequency }}</label>
                </div>
            </div>
        </div>
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
    let cWidth = ctx.canvas.width;
    let cHeight = ctx.canvas.height;
    let middle = cHeight/2;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.beginPath();
    
    let points = w.calculatePoints(cWidth);
    for(let x=0; x<cWidth; x++){
        ctx.lineTo(x, (middle + points[x]));
        // console.log(middle + points[x]);
    }
    ctx.stroke();
}

onMounted(()=>{
    context = myCanvas.value.getContext("2d");
    paintWave(props.wave, context);
})

</script>

<style scoped>

    input[type=checkbox]{
        border-radius: 10px;
    }

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
        background-color: rgb(78, 78, 78);
        width: 100%;
        /* height:100%; */
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