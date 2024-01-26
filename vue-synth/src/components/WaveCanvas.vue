<template>
    <canvas ref="myCanvas"></canvas>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {Wave} from "@/models/wave"

let myCanvas = ref();
let context;
let frames = 0;

const props = defineProps({
    wave:{
        type:Wave,
        required:true
    },
});

const emit = defineEmits("updateWave");

function paintWave(w, ctx=context, step=0){
    let cWidth = ctx.canvas.width;
    let cHeight = ctx.canvas.height;
    let middle = cHeight/2;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.beginPath();
    
    let points = w.calculatePoints(cWidth,step * w.frequency);
    for(let x=0; x<cWidth; x++){
        ctx.lineTo(x, (middle + points[x]));
    }
    ctx.stroke();
}

function animateWave(){
    frames += 0.1;
    let ctx = myCanvas.value.getContext("2d");
    paintWave(props.wave, ctx, frames);

    window.requestAnimationFrame(animateWave)
}

onMounted(() => {
    context = myCanvas.value.getContext("2d");
    window.requestAnimationFrame(animateWave);
    // emit("updateWave");
});
</script>