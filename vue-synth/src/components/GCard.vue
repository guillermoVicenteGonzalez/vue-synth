<template>
    <div class="card">
        <div class="cardTitle">
            <slot name="title"></slot>
        </div>
        <div class="cardBody">
            <slot name="body">

            </slot>
        </div>


        <div class="cardActions">
            <slot name="actions">
            </slot>
        </div>
    </div>
</template>

<style scoped>
    .card{
        width: 100%;
        height: 100%;
        min-width: fit-content;
        min-height: fit-content;

        margin: 10px;
        padding: 10px;

        background-color: var(--card-color);
        border-radius: 20px;

        display: grid;
        grid-template-rows:1fr 9fr 1.5fr;
    }

    .cardBody{
        margin:5%;
        background-color: var(--card-surface);
        border-radius: 20px;
    }

    .cardActions{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .divider{
        background-color: red;
        color:red;
        height: 2px;
        border:none
    }
</style>