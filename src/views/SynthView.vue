<template>
	<SynthLayout>
		<template #header>Header</template>
		<template #components>
			<div class="components">
				<ModuleCardListWidget v-model="audioModules"></ModuleCardListWidget>
				<div></div>
				<div class="components__controls">
					<button @click="createNewModule">new wave</button>
					<button @click="handleCreateFilter">new filter</button>
					<button @click="test">test</button>
				</div>
			</div>
			<!-- <ModuleCardWidget></ModuleCardWidget> -->
		</template>
		<template #display>
			<FilterWidget
				v-for="(effect, index) in effects"
				:key="index + effect.channelCount"
				v-model:filter="effects[index] as BiquadFilterNode"
				:context="mainContext"
				:sources="audioModules"
			></FilterWidget>
		</template>
		<template #piano>Piano</template>
		<template #footer> Footer</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioModule from "@/models/AudioModule";
import FilterHandler from "@/models/FilterHandler";
import Wave from "@/models/wave";
import FilterWidget from "@/widgets/Filter/FilterWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { onMounted, ref } from "vue";

const MAX_MODULES = 5;

const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger());
// const filters = ref<FilterHandler[]>([]);
const effects = ref<AudioNode[]>([]);

function createNewModule() {
	if (audioModules.value.length >= MAX_MODULES) return;
	const wave = new Wave(10, 1, 0);
	wave.setForm("sine");
	const waveName = `wave ${audioModules.value.length + 1}`;

	const module = new AudioModule(
		waveName,
		wave,
		mainContext.value,
		merger.value
	);
	audioModules.value.push(module);
}

function handleCreateFilter() {
	alert("creating filter");
	const handler = new FilterHandler("lowpass", 0);
	handler.node = handler.createFilter(mainContext.value, handler);
	effects.value.push(handler.node);
}

function test() {
	console.log(audioModules.value[0].effects);
}

onMounted(() => {
	merger.value.connect(mainContext.value.destination);
});
</script>

<style scoped lang="scss">
.components {
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

.testContainer {
	background-color: red;
	height: 20px;
	width: 100px;
}
</style>
