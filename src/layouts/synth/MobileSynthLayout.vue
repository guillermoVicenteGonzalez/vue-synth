<template>
	<div class="mobile-layout">
		<div class="mobile-layout__header">
			<slot name="header"> </slot>
		</div>
		<div class="mobile-layout__components">
			<VsTabs v-model="activeTab" :items="tabItems">
				<VsTab :active="activeTab == 0">
					<slot name="waves"></slot>
				</VsTab>

				<VsTab :active="activeTab == 1">
					<slot name="filters" :active="true"> </slot>
				</VsTab>
			</VsTabs>
		</div>

		<div class="mobile-layout__actions">
			<slot name="actions"></slot>
		</div>

		<div class="mobile-layout__analyser">
			<slot name="analyser"></slot>
		</div>

		<div class="mobile-layout__envelope">
			<slot name="envelope"></slot>
		</div>

		<div class="mobile-layout__piano">
			<slot name="piano"></slot>
		</div>

		<div class="mobile-layout__footer">
			<!-- <slot name="footer"></slot> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import VsTab from "@/components/common/VsTab/VsTab.vue";
import VsTabs from "@/components/common/VsTabs/VsTabs.vue";
import { ref } from "vue";

const activeTab = ref<number>(0);
const tabItems: string[] = ["waves", "filters", "effects"];
</script>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;
$components-bg-color: white;
$display-bg-color: white;
$footer-bg-color: blueviolet;

$min-components-w: 70rem;
$max-components-w: 4fr;

$min-display-w: 40rem;
$max-display-w: 5fr;

$min-header-h: 2rem;
$max-header-h: 0.5fr;

$min-body-h: 7rem;
$max-body-h: 7fr;

$min-piano-h: 2rem;
$max-piano-h: 2fr;

$min-footer-h: 0.5rem;
$max-footer-h: 0.5fr;

$piano-max-h: 10rem;
$piano-min-h: 0;

.mobile-layout {
	width: 100vw;
	height: 100vh;

	max-width: 100vw;
	max-height: 100vh;

	overflow: hidden;
	display: flex;
	flex-direction: column;

	&__header {
		background-color: $header-color;
		color: $header-text-color;
		height: 3rem;
		flex-basis: 3rem;
		width: 100%;
	}

	&__components {
		// position: relative;
		// background-color: purple;
		// width: 100%;
		// height: 50%;

		// height: 100%;
		// max-height: 50%;
		// width: 100%;
		// grid-template-rows: minmax(80%, 10fr) minmax(10%, 1fr);
		// gap: 0.5rem;
		background-color: purple;
		min-height: 40%;
		max-height: 40%;

		display: grid;
		// grid-template-rows: 9fr 1fr;

		&__cards {
			display: flex;
			flex-direction: column;
		}
	}

	&__actions {
		// position: absolute;
		gap: 1rem;
		display: flex;
		justify-content: space-around;
	}

	&__envelope {
		max-height: 20%;
		height: 100%;
	}

	&__analyser {
		max-height: 10%;
		height: 100%;
	}

	&__piano {
		height: fit-content;
		max-height: 20%;
		height: 100%;
		flex-basis: minmax(0, $piano-max-h);
		background-color: green;
	}
}
</style>
