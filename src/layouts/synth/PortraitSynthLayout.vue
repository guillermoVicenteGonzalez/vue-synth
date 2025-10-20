<template>
	<div class="portrait-layout">
		<VsButton
			variant="round"
			class="portrait-layout__drawer-btn"
			@click="handleOpenDrawer"
		>
			<VsHamburgerIcon v-model="isDrawerActive"></VsHamburgerIcon>
		</VsButton>

		<div class="portrait-layout__header">
			<slot name="header"> </slot>
			<VsDrawer v-model="isDrawerActive" class="portrait-layout__drawer">
				<slot name="actions"></slot>
				<VsSeparator></VsSeparator>
				<VsTabs
					v-model="activeTab"
					orientation="vertical"
					:items="tabItems"
					class="portrait-layout__tabs"
				></VsTabs>
			</VsDrawer>
		</div>

		<div class="portrait-layout__components">
			<slot name="waves"></slot>
			<slot name="filters"></slot>
		</div>

		<div class="portrait-layout__display">
			<VsTab :active="activeTab == 0">
				<slot name="envelope" variant="minimal"></slot>
			</VsTab>

			<VsTab :active="activeTab == 1" class="portrait-layout__piano">
				<slot name="piano"></slot>
			</VsTab>

			<VsTab :active="activeTab == 2">
				<slot name="lfo"></slot>
			</VsTab>
		</div>

		<div class="portrait-layout__footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsDrawer from "@/components/common/VsDrawer/VsDrawer.vue";
import VsHamburgerIcon from "@/components/common/VsHamburgerIcon/VsHamburgerIcon.vue";
import VsSeparator from "@/components/common/VsSeparator/VsSeparator.vue";
import VsTab from "@/components/common/VsTab/VsTab.vue";
import VsTabs from "@/components/common/VsTabs/VsTabs.vue";
import { ref } from "vue";

const tabItems = ["envelope", "piano", "LFO"];
const activeTab = ref<number>(0);
const isDrawerActive = ref<boolean>(false);

function handleOpenDrawer() {
	isDrawerActive.value = !isDrawerActive.value;
}
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
	background-color: $global-bg-color;
	color: $text-color;

	width: 100vw;
	height: 100%;

	max-width: 100dvw;
	max-height: 100dvh;

	overflow: hidden !important;

	display: grid;
	grid-template-rows:
		[header-start] minmax($header-min-h, $header-h)
		[header-end cards-start] minmax($min-components-h, $max-components-h)
		[cards-end display-start] minmax($min-display-h, $max-display-h);

	&__drawer-btn {
		--drawer-btn-dimensions: calc(#{$header-h} - #{$gap-df});
		top: $gap-sm;
		left: $gap-sm;
		position: absolute;
		width: var(--drawer-btn-dimensions);
		height: var(--drawer-btn-dimensions);

		background-color: $primary-color;
		color: $text-color;
		overflow: hidden;
	}

	&__header {
		// max-height: 7rem;

		overflow: hidden;
	}

	&__components {
		min-height: $min-components-h;
		height: 100%;

		display: grid;
		grid-template-columns: minmax($min-waves-w, $max-waves-w) minmax(
				$min-filters-w,
				$max-filters-w
			);
		// grid-template-rows: minmax($min-waves-w, 10fr) minmax(3.5rem, 1fr);
		// gap: 0.5rem;
	}

	&__display {
		height: 100%;
		width: 100%;
	}

	&__tabs {
	}

	// &__footer {
	// 	overflow: hidden;
	// 	display: none;
	// }

	&__drawer {
		height: calc(100dvh - #{$header-h});
	}

	&__piano {
		max-width: 100dvw;
		overflow: hidden;
	}
}
</style>
