<template>
	<div v-if="sources" class="effectList">
		<FilterWidget
			v-for="(_filter, index) in filters"
			:key="index"
			v-model="filters[index]"
			:context="context"
			:sources="sources as AudioCluster"
			@delete="deleteFilter(index)"
		></FilterWidget>
	</div>
</template>

<script setup lang="ts">
import type AudioCluster from "@/models/AudioCluster";
import type FilterHandler from "@/models/FilterHandler";
import type { UnwrapRef } from "vue";
import FilterWidget from "../Filter/FilterWidget.vue";

interface EffectListWidgetProps {
	sources: UnwrapRef<AudioCluster>;
	context: AudioContext;
}

const { sources, context } = defineProps<EffectListWidgetProps>();
const filters = defineModel<FilterHandler[]>({ default: [] });

function deleteFilter(index: number) {
	filters.value.splice(index, 1);
	//deletedEffects[0] = null; //for garbage collection
}
</script>

<style lang="scss" scoped>
.effectList {
	height: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: $gap-bg;
	padding: $gap-bg $gap-df;

	@include respond(tab-land) {
		padding: $gap-df;
	}
}
</style>
