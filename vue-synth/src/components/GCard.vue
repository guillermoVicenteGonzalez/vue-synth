<template>
    <div class="Gcard card">
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

    .Gcard{
        max-width:100%;
        height: 100%;
        min-width: fit-content;
        min-height: fit-content;

        display: grid;
        grid-template-rows: 1.5fr 6fr 1.5fr;
    }


    .cardBody{
        margin:0 5%;
        background-color: var(--card-surface);
        border-radius: 20px;
    }

    .cardActions{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

</style>