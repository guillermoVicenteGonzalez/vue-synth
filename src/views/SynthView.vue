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
		<template #display>
			<VsCard height="50px">
				<WaveAnalyser
					v-if="audioModules[0] != null"
					:source="audioModules[0].end"
				></WaveAnalyser>
			</VsCard>
		</template>
		<template #piano>Piano</template>
		<template #footer> Footer</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import VsCard from "@/components/common/VsCard/VsCard.vue";
import WaveAnalyser from "@/components/waves/WaveAnalyser/WaveAnalyser.vue";
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioModule from "@/models/AudioModule";
import Wave from "@/models/wave";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { onMounted, ref } from "vue";

const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger());
// const filters = ref<BiquadFilterNode[]>([]);

function createNewModule() {
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
