<template>
	<div v-if="cluster" class="ModuleCardList">
		<ModuleCardWidget
			v-for="(_module, index) in cluster.modules"
			:key="index"
			v-model="cluster.modules[index]"
			@delete="deleteModule(index)"
		></ModuleCardWidget>
	</div>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import ModuleCardWidget from "@/widgets/ModuleCard/ModuleCardWidget.vue";

const cluster = defineModel<AudioCluster>();

function deleteModule(index: number) {
	if (cluster.value) cluster.value.deleteModuleByIndex(index);
}
</script>

<style lang="scss" scoped>
.ModuleCardList {
	height: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: $gap-bg;
	// padding: 1rem;
}
</style>
