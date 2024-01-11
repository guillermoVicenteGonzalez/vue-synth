<template>
    <div class="layout">
        <div class="mainSection">
            <div class="cardList">
                <Wave-card v-for="item in waves" :key="item"></Wave-card>
            </div>

            <div class="mainCanvas"></div>
        </div>

        <div class="controls"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WaveCard from '../components/WaveCard.vue';

let waves = ref([1,2,3,4,5]) 
        
</script>

<style scoped>
    .layout{
        width:100vw;
        height:100vh;

        display:grid;
        grid-template-rows: 10fr 1fr;
    }

    .mainSection{
        height: 100%;
        width: 100%;

        display:grid;
        grid-template-columns: 1fr 3fr;
    }

    .controls{
        background-color:rgb(71, 71, 71);
    }

    .cardList{
        /* margin:.5rem; */
        padding:.5rem 1rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap:20px;
        border-right-width: 1px;
        border-right-color: rgb(138, 138, 138);
        border-right-style: inset;
    }

</style>