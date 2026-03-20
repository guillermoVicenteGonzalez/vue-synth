<template>
	<div class="portrait-layout">
		<div class="portrait-layout__header">
			<MobileHeader v-model="activeTab"></MobileHeader>
		</div>

		<div class="portrait-layout__body">
			<VsTab :active="activeTab == 'voices'" class="portrait-layout__voices">
				<slot name="waves"></slot>
				<slot name="filters"></slot>
			</VsTab>

			<VsTab :active="activeTab == 'envelope'">
				<slot name="envelope" variant="minimal"></slot>
			</VsTab>

			<VsTab :active="activeTab == 'lfo'">
				<slot name="lfo"></slot>
			</VsTab>

			<VsTab :active="activeTab == 'effects'">
				<slot name="effects"></slot>
			</VsTab>
		</div>

		<div class="portrait-layout__actions">
			<slot name="actions" variant="block"></slot>
		</div>

		<VsTab :active="activeTab == 'piano'">
			<slot name="piano" class="pianoContainer"></slot>
		</VsTab>
	</div>
</template>
<script setup lang="ts">
import VsTab from "@/components/common/VsTab/VsTab.vue";
import type { ActionsWidgetVariants } from "@/widgets/ActionsWidget/ActionsWidget.vue";
import MobileHeader from "@/widgets/MobileHeader/MobileHeader.vue";
import { ref } from "vue";

export type MobileTabs = "voices" | "envelope" | "lfo" | "effects" | "piano";

// const tabItems = ["envelope", "piano", "LFO"];
const activeTab = ref<MobileTabs>("voices");
defineSlots<{
	actions(props: { variant: ActionsWidgetVariants }): void;
	envelope(): void;
	waves(): void;
	filters(): void;
	lfo(): void;
	piano(): void;
	effects(): void;
}>();
</script>

<style lang="scss" scoped>
$global-bg-color: $bg-color-1;

$header-color: black;
$header-text-color: white;

$min-components-h: 15rem;
$max-components-h: 5.2fr;

$min-display-h: 9rem;
$max-display-h: 4.5fr;

$header-h: 4rem;
$header-min-h: 4rem;
$header-max-h: 4rem;

$min-waves-w: 45rem;
$max-waves-w: 5fr;

$min-filters-w: 3.5rem;
$max-filters-w: 4fr;

.portrait-layout {
	width: 100vw;
	height: 100dvh;

	max-width: 100dvw;
	max-height: 100dvh;

	overflow: hidden;

	display: flex;
	flex-direction: column;
	gap: $gap-sm;

	&__header {
	}

	&__body {
		// background-color: red;
		overflow: auto;
		flex: 1 1 100%;
	}

	&__voices {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	&__actions {
		flex: 1 1 10rem;

		width: 100%;
		height: fit-content;
		// position: absolute;
		bottom: 0;
		left: 0;
		// padding: $gap-df;
		z-index: 3;

		// > * {
		// 	border-radius: 0 !important;
		// }
	}
}

.pianoContainer {
	flex: 1 1 100%;
}

// .portrait-layout {
// 	background-color: $global-bg-color;
// 	color: $text-color;

// 	width: 100vw;
// 	height: 100%;

// 	max-width: 100dvw;
// 	max-height: 100dvh;

// 	overflow: hidden !important;

// 	display: grid;
// 	grid-template-rows:
// 		[header-start] minmax($header-min-h, $header-h)
// 		[header-end cards-start] minmax($min-components-h, $max-components-h)
// 		[cards-end display-start] minmax($min-display-h, $max-display-h);

// 	&__drawer-btn {
// 		--drawer-btn-dimensions: calc(#{$header-h} - #{$gap-df});
// 		top: $gap-sm;
// 		left: $gap-sm;
// 		position: absolute;
// 		width: var(--drawer-btn-dimensions);
// 		height: var(--drawer-btn-dimensions);

// 		background-color: $primary-color;
// 		color: $text-color;
// 		overflow: hidden;
// 	}

// 	&__header {
// 		// max-height: 7rem;

// 		overflow: hidden;
// 	}

// 	&__components {
// 		min-height: $min-components-h;
// 		height: 100%;

// 		display: grid;
// 		grid-template-columns: minmax($min-waves-w, $max-waves-w) minmax(
// 				$min-filters-w,
// 				$max-filters-w
// 			);
// 		// grid-template-rows: minmax($min-waves-w, 10fr) minmax(3.5rem, 1fr);
// 		// gap: 0.5rem;
// 	}

// 	&__effects {
// 		grid-column: 1 / -1;
// 		height: 100%;
// 		overflow: auto;
// 	}

// 	&__display {
// 		height: 100%;
// 		width: 100%;
// 	}

// 	&__tabs {
// 	}

// 	// &__footer {
// 	// 	overflow: hidden;
// 	// 	display: none;
// 	// }

// 	&__drawer {
// 		height: calc(100dvh - #{$header-h});
// 	}

// 	&__piano {
// 		max-width: 100dvw;
// 		overflow: hidden;
// 	}
// }
</style>
