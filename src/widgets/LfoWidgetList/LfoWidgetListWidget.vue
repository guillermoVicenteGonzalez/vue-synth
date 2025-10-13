<template>
	<VsCard class="lfo-widget-list" :class="dynamicLayoutStyles">
		<VsTab v-for="n in WIDGET_N" :key="n" :active="activeTab == n">
			<LfoWdidgetWidget
				:context="context"
				:sources="sources"
			></LfoWdidgetWidget>
		</VsTab>
		<ul class="lfo-widget-list__tabs">
			<li
				v-for="n in WIDGET_N"
				:key="n"
				class="lfo-widget-list__tab"
				:class="n == activeTab ? 'lfo-widget-list__tab--active' : ''"
				@click="activeTab = n"
			></li>
		</ul>
	</VsCard>
</template>

<script setup lang="ts">
import VsCard from "@/components/common/VsCard/VsCard.vue";
import VsTab from "@/components/common/VsTab/VsTab.vue";
import { computed, ref } from "vue";
import type { LfoSource } from "../LfoWdidget/LfoWdidgetWidget.vue";
import LfoWdidgetWidget from "../LfoWdidget/LfoWdidgetWidget.vue";

const WIDGET_N = 4;

const activeTab = ref<number>(1);

type lfoWidgetListVariants = "horizontal" | "vertical";

interface LfoWidgetListWidgetProps {
	context: AudioContext;
	sources: LfoSource[];
	variant?: lfoWidgetListVariants;
}

const dynamicLayoutStyles = computed(() => {
	return variant == "horizontal"
		? "lfo-widget-list--horizontal"
		: "lfo-widget-list--vertical";
});

const {
	context,
	sources,
	variant = "vertical",
} = defineProps<LfoWidgetListWidgetProps>();
</script>

<style lang="scss" scoped>
.lfo-widget-list {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: $border-radius-df;
	background-color: black;

	&__tabs {
		// width: 100%;
		list-style: none;
		height: 3rem;
		background-color: black;
		display: flex;
	}

	&__tab {
		background-color: $bg-color-3;
		width: 5rem;
		height: 100%;
		border-radius: 10px;
		cursor: pointer;

		&--active {
			background-color: $primary-color;
		}
	}

	&--vertical {
		flex-direction: row;

		.lfo-widget-list__tabs {
			padding: 0.5rem;
			flex-direction: column;
			gap: 0.5rem;
			height: 100%;
		}

		.lfo-widget-list__tab {
			min-height: 5rem;
			height: 100%;
		}
	}

	&--horizontal {
		flex-direction: column;

		.lfo-widget-list__tabs {
			padding: 0.5rem;
			flex-direction: row;
			gap: 0.5rem;
		}

		.lfo-widget-list__tab {
			width: 100%;
		}
	}
}
</style>
