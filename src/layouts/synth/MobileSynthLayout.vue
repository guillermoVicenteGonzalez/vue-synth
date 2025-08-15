<template>
	<div class="mobile-layout">
		<div class="mobile-layout__header">
			<slot name="header"> </slot>
		</div>
		<div class="mobile-layout__components">
			<VsTabs v-model="activeTab" :items="tabItems" class="mobile-layout__tabs">
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

		<div class="mobile-layout__lfo">
			<slot name="lfo"></slot>
		</div>

		<div class="mobile-layout__envelope">
			<slot name="envelope"></slot>
		</div>

		<div class="mobile-layout__piano">
			<slot name="piano"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import VsTab from "@/components/common/VsTab/VsTab.vue";
import VsTabs from "@/components/common/VsTabs/VsTabs.vue";
import { ref } from "vue";

const activeTab = ref<number>(0);
const tabItems: string[] = ["waves", "filters"];
</script>

<style lang="scss" scoped>
$header-color: black;
$header-text-color: white;

$base-components-h: 40%;

$base-actions-h: 4rem;

$base-enveloppe-h: 25%;

$base-analyser-h: 10%;

$min-header-h: 4rem;
$max-header-h: 5rem;

$min-body-h: 7rem;
$max-body-h: 7fr;

$piano-max-h: 15rem;
$piano-min-h: 0;

.mobile-layout {
	width: 100vw;
	height: 100dvh;

	max-width: 100vw;
	max-height: 100dvh;

	overflow: hidden;
	display: flex;
	flex-direction: column;

	&__header {
		background-color: $header-color;
		color: $header-text-color;

		flex: 1 0 $min-header-h;
		max-height: $max-header-h;
		width: 100%;
	}

	&__tabs {
		margin: 1rem 0;
	}

	&__components {
		background-color: purple;

		flex: 1 1 $base-components-h;
		max-height: $base-components-h;

		display: grid;

		overflow: hidden;
	}

	&__actions {
		// position: absolute;
		gap: 1rem;
		display: flex;
		justify-content: space-around;

		flex: 0 0 $base-actions-h;
	}

	&__envelope {
		// max-height: 25%;
		// height: 100%;
		flex: 0 0 $base-enveloppe-h;
	}

	&__lfo {
		max-height: $base-analyser-h;
		height: 100%;

		flex: 0 0 $base-analyser-h;
	}

	&__piano {
		height: fit-content;

		background-color: green;
		flex: 1 0 $piano-max-h;
	}
}
</style>
