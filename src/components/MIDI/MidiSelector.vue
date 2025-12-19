<template>
	<div class="MidiSelector">
		<VsButton
			v-if="!midiReady"
			class="MidiSelector__request-btn"
			variant="round"
			@click="requestMidi"
		>
			<PianoIcon class="MidiSelector__request-btn__icon"></PianoIcon
		></VsButton>

		<VsSelector
			v-else
			v-model="midiInputName"
			:items="midiInputNames"
			:disabled="midiReady"
			clearable
			@change="onSelectedInputChange"
			@clear="disconnectMidiInput"
		></VsSelector>
	</div>
</template>

<script setup lang="ts">
import { useMidi } from "@/composables/useMidi";
import { PianoIcon } from "lucide-vue-next";
import { computed, ref } from "vue";
import VsButton from "../common/VsButton/VsButton.vue";
import VsSelector from "../common/VsSelector/VsSelector.vue";

const { inputs, midiReady, selectMidiInput, disconnectMidiInput, requestMidi } =
	useMidi();
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

<style lang="scss" scoped>
$request-btn-size: 4rem;
$request-btn-size-sm: 3rem;

.MidiSelector {
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	&__request-btn {
		background-color: $primary-color;
		width: $request-btn-size;
		height: $request-btn-size;
		padding: $gap-df;
		justify-self: center;

		&__icon {
			@include iconButton;
			color: $tertiary-color;
			color: black;
		}

		@include respond(tab-port) {
			width: $request-btn-size-sm;
			height: $request-btn-size-sm;
			padding: 0.5rem;
		}
	}
}
</style>
