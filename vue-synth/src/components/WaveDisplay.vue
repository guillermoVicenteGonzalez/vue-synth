<template>
    <div>
        <div class="waveCard">
            <div class="firstRow">
                <input type="checkbox">
            </div>

            <div class="centerCol">
                <select placeholder="waveform"></select>
                <canvas ref="myCanvas"></canvas>
                <div class="sliders">
                    <input type="range" 
                    v-model="wave.frequency" placeholder="frecuency" 
                    @input="paintWave(wave), emit('updateWave')">
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
let frames = 0;


function paintWave(w,ctx=context, step=0){
    let cWidth = ctx.canvas.width;
    let cHeight = ctx.canvas.height;
    let middle = cHeight/2;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.beginPath();
    
    let points = w.calculatePoints(cWidth,step);
    for(let x=0; x<cWidth; x++){
        ctx.lineTo(x, (middle + points[x]));
        // console.log(middle + points[x]);
    }
    ctx.stroke();
}


function animateWave(){
    console.log("animation")
    frames += 0.2;
    let ctx = myCanvas.value.getContext("2d");
    let cWidth = ctx.canvas.width;
    let cHeight = ctx.canvas.height;
    // ctx.clearRect(0, 0, cWidth, cHeight);
    paintWave(props.wave,ctx,frames);

    window.requestAnimationFrame(animateWave)
}

onMounted(()=>{
    context = myCanvas.value.getContext("2d");
    // paintWave(props.wave, context,1);
    requestAnimationFrame(animateWave);
    emit("updateWave")
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
        justify-content: space-around;
    }

    .firstRow{
        display: grid;
        grid-template-rows:1fr 9fr;
    }

    input{

    }
</style>