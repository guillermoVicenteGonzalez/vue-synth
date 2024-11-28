<template>
	<SynthLayout>
		<template #header>Header</template>
		<template #components>
			<div class="components">
				<ModuleCardListWidget v-model="audioModules"></ModuleCardListWidget>
				<!-- Esto tiene que ser un widget -->
				<EffectListWidget
					v-model="effects"
					:context="mainContext"
					:sources="audioModules"
				></EffectListWidget>
				<div class="components__controls">
					<button @click="createNewModule">new wave</button>
					<button @click="createEffect('filter')">new filter</button>
				</div>
			</div>
		</template>
		<template #display> </template>
		<template #piano>Piano</template>
		<template #footer> Footer</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import AudioModule, { type AudioEffect } from "@/models/AudioModule";
import Wave from "@/models/wave";
import EffectListWidget from "@/widgets/EffectList/EffectListWidget.vue";
import ModuleCardListWidget from "@/widgets/ModuleCardList/ModuleCardListWidget.vue";
import { onMounted, ref } from "vue";

const MAX_MODULES = 5;
const MAX_EFFECTS = 5;

const audioModules = ref<AudioModule[]>([]);
const mainContext = ref<AudioContext>(new AudioContext());
const merger = ref<ChannelMergerNode>(mainContext.value.createChannelMerger());
// const filters = ref<FilterHandler[]>([]);
const effects = ref<AudioEffect[]>([]);

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

function createEffect(effectType: string) {
	if (effects.value.length >= MAX_EFFECTS) return;
	if (effectType == "filter") {
		const nEffect = createFilter(mainContext.value);
		effects.value.push(nEffect);
	}
}

function createFilter(sourceCtx: AudioContext) {
	const newFilter = sourceCtx.createBiquadFilter();
	newFilter.type = "lowpass";
	newFilter.frequency.setTargetAtTime(200, sourceCtx.currentTime, 0);
	return newFilter;
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
