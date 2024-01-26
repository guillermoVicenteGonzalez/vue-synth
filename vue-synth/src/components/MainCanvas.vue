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
    waves:{
        type:Array,
        required:true
    },
});


function paintMainWave(waves, ctx, step=0){
    if(waves == undefined){

        return false;
    }

    let points = []
    let height = ctx.canvas.height;
    let length = ctx.canvas.width;
    let middle = height/2;
    ctx.clearRect(0, 0, length, height);
    ctx.beginPath();
    
    for(let x=0;x<length; x++){
        let y = 0;
        waves.forEach(wave => {
            y += wave.amplitude * Math.sin(x * wave.getAngFrec()/length + step);
        });
        ctx.lineTo(x,(middle + y));
    }

    ctx.stroke();
}


function animateWave(){
    frames += 0.1;
    let ctx = myCanvas.value.getContext("2d");
    // paintWave(props.wave, ctx, frames);
    if(ctx != undefined){
        paintMainWave(props.waves, ctx, frames);
    }
    if(frames > 10000000){
        frames = 0;
    }

    window.requestAnimationFrame(animateWave)
}

onMounted(() => {
    context = myCanvas.value.getContext("2d");
    paintMainWave(props.waves, context)
    window.requestAnimationFrame(animateWave);
    // emit("updateWave");
});
</script>

<style scoped>  
canvas{
    width:100%;
    height:100%;
    padding:4px
}
</style>