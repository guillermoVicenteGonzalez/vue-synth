<template>
	<div class="portrait-layout">
		<div class="portrait-layout__header">
			<slot name="analyser"></slot>
		</div>

		<div class="portrait-layout__components">
			<slot name="waves"></slot>
			<slot name="filters"></slot>
		</div>

		<div class="portrait-layout__actions">
			<div><slot name="actions"></slot></div>
			<div>
				<VsTabs v-model="activeTab" :items="tabItems"></VsTabs>
			</div>
		</div>

		<div class="portrait-layout__display">
			<VsTab :active="activeTab == 0">
				<slot name="envelope"></slot>
			</VsTab>

			<VsTab :active="activeTab == 1"> <slot name="piano"></slot> </VsTab>

			<VsTab :active="activeTab == 2">
				<slot name="display"></slot>
			</VsTab>
		</div>
	</div>
</template>
<script setup lang="ts">
import VsTab from "@/components/common/VsTab/VsTab.vue";
import VsTabs from "@/components/common/VsTabs/VsTabs.vue";
import { ref } from "vue";

const tabItems = ["envelope", "piano", "effects"];
const activeTab = ref<number>(0);
</script>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-display-h: 3rem;
$max-display-h: 35%;

$piano-max-h: 10rem;
$piano-min-h: 0;

.portrait-layout {
	width: 100vw;
	height: 100dvh;

	max-width: 100vw;
	max-height: 100dvh;

	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&__header {
		max-height: 10%;
	}

	&__components {
		min-height: 40%;
		max-height: 40%;
		height: 100%;

		display: grid;
		grid-template-columns: 4fr 3fr;
		grid-template-rows: minmax(5, 10fr) minmax(3.5rem, 1fr);
		gap: 0.5rem;
	}

	&__actions {
		gap: 1rem;
		height: 10%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		font-size: 1.6rem;
	}

	&__display {
		height: fit-content;
		min-height: 40%;
		max-height: 40%;
	}

	&__piano {
		height: fit-content;
		min-height: 25%;
		flex-basis: minmax(0, $piano-max-h);
		background-color: green;
	}
}
</style>
