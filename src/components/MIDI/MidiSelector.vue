<template>
	<VsSelector
		v-model="midiInputName"
		:items="midiInputNames"
		:disabled="midiReady"
		clearable
		@change="onSelectedInputChange"
		@clear="disconnectMidiInput"
	></VsSelector>
</template>

<script setup lang="ts">
import { useMidi } from "@/composables/useMidi";
import { computed, ref } from "vue";
import VsSelector from "../common/VsSelector/VsSelector.vue";

const { inputs, midiReady, selectMidiInput, disconnectMidiInput } = useMidi();
const midiInputName = ref<string>();

const midiInputNames = computed<string[]>(() => {
	if (!inputs.value) return [];

	const inputNames: string[] = [];

	for (const entry of inputs.value) {
		const input = entry[1];
		inputNames.push(input.name ? input.name : input.id);
	}

	return inputNames;
});

function onSelectedInputChange() {
	if (!inputs.value) return;
	for (const input of inputs.value.values()) {
		if (input.name == midiInputName.value) selectMidiInput(input.id);
	}
}
</script>
