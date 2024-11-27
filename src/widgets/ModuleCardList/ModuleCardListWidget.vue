<template>
	<div class="ModuleCardList">
		<ModuleCardWidget
			v-for="(module, index) in modulesList"
			:key="index"
			v-model="modulesList[index]"
		></ModuleCardWidget>
	</div>
</template>

<script setup lang="ts">
import type AudioModule from "@/models/AudioModule";
import ModuleCardWidget from "@/widgets/ModuleCard/ModuleCardWidget.vue";

const modulesList = defineModel<AudioModule[]>({ default: [] });
</script>

<style lang="scss" scoped>
.ModuleCardList {
	height: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 1rem;
	padding: 1rem;
}
</style>
