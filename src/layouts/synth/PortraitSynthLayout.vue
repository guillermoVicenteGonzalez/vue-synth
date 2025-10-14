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
			<VsDrawer v-model="isDrawerActive">
				<slot name="actions"></slot>
				<hr />
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

			<VsTab :active="activeTab == 1"> <slot name="piano"></slot> </VsTab>

			<VsTab :active="activeTab == 2">
				<slot name="lfo"></slot>
			</VsTab>
		</div>
	</div>
</template>
<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsDrawer from "@/components/common/VsDrawer/VsDrawer.vue";
import VsHamburgerIcon from "@/components/common/VsHamburgerIcon/VsHamburgerIcon.vue";
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
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-components-h: 18rem;

$min-display-h: 3rem;
$max-display-h: 35%;

$piano-max-h: 10rem;
$piano-min-h: 0;

$header-h: 4rem;
$header-min-h: 4rem;
$base-actions-h: 4rem;

.portrait-layout {
	background-color: $global-bg-color;
	color: $text-color;

	width: 100vw;
	height: 100dvh;

	max-width: 100vw;
	max-height: 100dvh;

	// overflow: hidden !important;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

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
		min-height: $header-min-h;
		height: $header-h;
		overflow: hidden;
	}

	&__components {
		min-height: $min-components-h;
		max-height: 40%;
		height: 100%;

		display: grid;
		grid-template-columns: 4fr 3fr;
		grid-template-rows: minmax(5, 10fr) minmax(3.5rem, 1fr);
		gap: 0.5rem;
	}

	&__display {
		height: fit-content;
		min-height: 50%;
		max-height: 40%;
	}

	&__tabs {
	}
}
</style>
