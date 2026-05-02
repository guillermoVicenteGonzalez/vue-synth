<template>
	<div class="mobile-layout">
		<div class="mobile-layout__header">
			<MobileLandHeader></MobileLandHeader>
		</div>
		<div class="mobile-layout__body">
			<VsTab :active="activeTab == 'voices'" class="mobile-layout__voices">
				<slot name="waves"></slot>
				<VsSeparator></VsSeparator>
				<slot name="filters"></slot>
			</VsTab>

			<VsTab :active="activeTab == 'effects'">
				<slot name="effects"></slot>
			</VsTab>
		</div>

		<div class="mobile-layout__actions">
			<slot name="actions" variant="rounded"></slot>
		</div>

		<div class="mobile-layout__controls"></div>

		<div class="mobile-layout__piano">
			<slot name="piano"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsTab from "@/components/common/VsTab/VsTab.vue";
import type { ActionsWidgetVariants } from "@/widgets/ActionsWidget/ActionsWidget.vue";
import type { LFOWidgetVariants } from "@/widgets/LfoWdidget/LfoWdidgetWidget.vue";
import type { LfoWidgetListVariants } from "@/widgets/LfoWidgetList/LfoWidgetListWidget.vue";
import MobileLandHeader from "@/widgets/MobileLandHeader/MobileLandHeader.vue";
import { ref } from "vue";
import type { MobileTabs } from "./PortraitSynthLayout.vue";

// const tabItems = ["envelope", "piano", "LFO"];
const activeTab = ref<MobileTabs>("voices");

defineSlots<{
	actions(props: { variant: ActionsWidgetVariants }): void;
	envelope(): void;
	waves(): void;
	filters(): void;
	lfo(props: {
		listVariant: LfoWidgetListVariants;
		widgetVariant: LFOWidgetVariants;
	}): void;
	piano(): void;
	effects(): void;
	header(): void;
}>();
</script>

<style lang="scss" scoped>
$global-bg-color: $bg-color-1;

$header-color: black;
$header-text-color: white;

$base-components-h: 40%;
$min-components-h: 28rem;

$base-actions-h: 4rem;

$base-controls-h: 40%;

$base-enveloppe-h: 25%;

$base-analyser-h: 10%;

$min-header-h: 4rem;
$max-header-h: 12.2rem;

$min-body-h: 7rem;
$max-body-h: 100%;

$max-piano-h: 15rem;
$min-piano-h: 0;

.mobile-layout {
	background-color: $global-bg-color;
	color: $text-color;

	width: 100vw;
	height: 100dvh;

	max-width: 100vw;
	max-height: 100dvh;

	overflow: hidden;
	display: flex;
	flex-direction: column;

	&__header {
		flex: 0 0 $max-header-h;
		height: $max-header-h;
	}

	&__body {
		flex: 1 1 $max-body-h;
		max-height: 100%;
		overflow: auto;
	}

	&__actions {
		// height: 100%;
	}

	&__piano {
		height: fit-content;

		min-height: $min-piano-h;

		background-color: green;
		flex: 1 0 $max-piano-h;
	}

	&__voices {
		// max-height: 100%;

		gap: $gap-df;

		display: flex;
		flex-direction: column;
	}

	&__effects {
		height: 100%;
		overflow: auto;
	}
}
</style>
