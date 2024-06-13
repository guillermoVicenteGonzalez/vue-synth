<template>
    <button :class="selectedClass" @click="changeState"></button>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0d09e9e (pause wave)
    import { ref, type Ref, defineModel, type ModelRef, computed } from 'vue';
    const props = defineProps({
        color: {
            type: String,
            required: false
        }
    });

    const emit = defineEmits(["click"])

    const model: ModelRef<Boolean> = defineModel({ default: false });
    let selectedClass = computed(() => {
        return model.value
            ? "toggleBtn toggleBtn--selected"
            : "toggleBtn"
    })

    function changeState() {
        model.value = !model.value
        emit("click")
<<<<<<< HEAD
    }
=======
import { ref, type Ref, defineModel, type ModelRef, computed } from 'vue';
const props = defineProps({
    color: {
        type: String,
        required: false
    }
});

const model: ModelRef<Boolean> = defineModel({ default: false });
let selectedClass = computed(() => {
    return model.value
        ? "toggleBtn toggleBtn--selected"
        : "toggleBtn"
})

function changeState() {
    model.value = !model.value
    console.log(model.value)
}
>>>>>>> 32bbc2b (prototype radio button)
=======
    }
>>>>>>> 0d09e9e (pause wave)

</script>

<style scoped lang="scss">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0d09e9e (pause wave)
    .toggleBtn {
        display: block;
        background-color: transparent;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100px;
        border: .1rem solid red;
        margin: auto;
        padding: 2px;
<<<<<<< HEAD



    }

    .toggleBtn--selected::before {
        display: block;
        content: "";
        background: yellow;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        margin: auto;
    }
=======
.toggleBtn {
    display: block;
    background-color: transparent;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100px;
    border: .1rem solid red;
    margin: auto;
    padding: 2px;
=======
>>>>>>> 0d09e9e (pause wave)



    }

<<<<<<< HEAD
.toggleBtn--selected::before {
    display: block;
    content: "";
    background: yellow;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    margin: auto;
}
>>>>>>> 32bbc2b (prototype radio button)
=======
    .toggleBtn--selected::before {
        display: block;
        content: "";
        background: yellow;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        margin: auto;
    }
>>>>>>> 0d09e9e (pause wave)
</style>