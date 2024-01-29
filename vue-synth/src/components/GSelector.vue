<template>
    <select
    v-model="model"
    @change="onInputCB">
        <option
        v-for="item in items"
        :value="item">{{ item }}</option>
    </select>
</template>

<script setup>
import {ref} from "vue"
let selection = ref();
const props = defineProps({
    items:{
        type:Array,
        required:true
    },
});

const model = defineModel()
const emit = defineEmits(["change"])
let variable = "buenas"

function onInputCB(){
    // model.value = selection.value
    emit("change")
}
</script>
