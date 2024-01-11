<template>
    <div class="card">
        <div class="flex-center">

        </div>
        <div class="flex-center">
            <canvas class="customCanvas"></canvas>
        </div>
        <div class="flex-center">
            <button class="round-btn">
                <span class="material-icons">
                    play_circle
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .card{
        min-width: 100px;
        min-height: 80px;
        max-width: 300px;
        max-height: 200px;

        overflow: hidden;
        border-radius: 15px;

        background-color: rgb(226, 226, 226);
        box-shadow: 1px 5px 5px rgb(156, 156, 156);

        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
    }

    .card:hover{
        box-shadow: 1px 5px 10px rgb(156, 156, 156);
        transition:0.2s
    }

    .round-btn{
        border-radius:360px;
    }

    .customCanvas{
        width:100%;
        height: 100%;
        background-color:red; 
    }

    *{
        overflow: hidden;
    }
</style>