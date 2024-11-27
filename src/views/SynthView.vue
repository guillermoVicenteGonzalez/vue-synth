<template>
	<SynthLayout>
		<template #header>Header</template>
		<template #components>
			<div class="components">
				<ModuleCardListWidget v-model="audioModules"></ModuleCardListWidget>
				<div></div>
				<div class="components__controls">
					<button @click="createNewModule">new wave</button>
				</div>
			</div>
			<!-- <ModuleCardWidget></ModuleCardWidget> -->
		</template>
		<template #display>Main display</template>
		<template #piano>Piano</template>
		<template #footer> Footer</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioModule from "@/models/AudioModule";
import Wave from "@/models/wave";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { ref } from "vue";

const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger());
const filters = ref<BiquadFilterNode[]>([]);

function createNewModule() {
	const wave = new Wave(10, 1, 0);
	wave.setForm("sine");
	const waveName = `wave ${audioModules.value.length + 1}`;

	const module = new AudioModule(waveName, wave, mainContext.value, false);
	audioModules.value.push(module);
}
</script>

<style scoped lang="scss">
.components {
	background-color: purple;
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 4fr 3fr;
	gap: 0.5rem;

	&__controls {
		grid-column: 1/-1;
		background-color: green;
	}
}
</style>
