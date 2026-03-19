<template>
	<div class="portrait-layout">
		<div class="portrait-layout__header">
			<MobileHeader></MobileHeader>
		</div>

		<div class="portrait-layout__body">
			<VsTab :active="activeTab == 0">
				<slot name="waves"></slot>
				<slot name="filters"></slot>
			</VsTab>

			<VsTab :active="activeTab == 1">
				<slot name="envelope" variant="minimal"></slot>
			</VsTab>

			<VsTab :active="activeTab == 2" class="portrait-layout__piano">
				<slot name="piano"></slot>
			</VsTab>

			<VsTab :active="activeTab == 3">
				<slot name="lfo"></slot>
			</VsTab>

			<!-- <VsTab :active="activeTab == 0">
				<slot name="effects" class="effects"> </slot>
			</VsTab> -->
			<!-- 
			<div v-if="$slots.effects" class="portrait-layout__effects">
				<slot name="effects" class="effects"> </slot>
			</div> -->
		</div>

		<!-- <div class="portrait-layout__actions">
			<slot name="actions"></slot>
		</div> -->
	</div>
</template>
<script setup lang="ts">
import VsTab from "@/components/common/VsTab/VsTab.vue";
import MobileHeader from "@/widgets/MobileHeader/MobileHeader.vue";
import { ref } from "vue";

// const tabItems = ["envelope", "piano", "LFO"];
const activeTab = ref<number>(0);
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
	display: grid;

	&__actions {
		width: 100%;
		position: absolute;
	}
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
