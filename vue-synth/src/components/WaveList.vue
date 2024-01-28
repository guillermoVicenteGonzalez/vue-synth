<template>
    <WaveDisplay
    v-for="(wave, index) in waves"
    :key="index"
    :wave="wave"
    @waveDeleted="onWaveDeletedCB(index)"
    @update-wave="onWaveUpdatedCB"></WaveDisplay>
</template>

<script setup>
import { Wave } from "@/models/wave";
import {ref} from "vue";
import WaveDisplay from "./WaveDisplay.vue";

const props = defineProps({
    waves:{
        type:Array,
        required:true
    }
});

const emit = defineEmits(["refreshWaves","waveDeleted"])

function onWaveDeletedCB(index){
    props.waves.splice(index,1);
    emit("waveDeleted",index)
}

function onWaveUpdatedCB(){
    emit("refreshWaves")
}
</script>