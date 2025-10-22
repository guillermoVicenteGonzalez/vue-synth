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

		<div class="mobile-layout__controls">
			<VsTabs
				v-model="controlsTab"
				:items="controlsTabItems"
				class="mobile-layout__controls__tabs"
			>
				<div class="mobile-layout__controls__content">
					<VsTab :active="controlsTab == 0">
						<slot name="lfo"></slot>
					</VsTab>

					<VsTab :active="controlsTab == 1">
						<slot name="envelope"></slot>
					</VsTab>
				</div>
			</VsTabs>
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
const controlsTab = ref<number>(0);

const tabItems: string[] = ["waves", "filters"];
const controlsTabItems = ["LFO", "enveloppe"];
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
$max-header-h: 5rem;

$min-body-h: 7rem;
$max-body-h: 7fr;

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
		color: $header-text-color;

		flex: 1 0 $min-header-h;
		max-height: $max-header-h;
		width: 100%;
	}

	&__components {
		flex: 1 1 $base-components-h;
		max-height: $base-components-h;
		min-height: $min-components-h;

		display: grid;

		overflow: hidden;
	}

	&__actions {
		// position: absolute;
		gap: $gap-df;
		display: flex;
		justify-content: space-around;
		align-items: center;

		flex: 0 0 $base-actions-h;
		padding: $gap-df;
	}

	&__envelope {
		// max-height: 25%;
		// height: 100%;
		// flex: 0 0 $base-enveloppe-h;
		height: 100%;
	}

	&__lfo {
		height: 100%;
	}

	// LFO + enveloppe
	&__controls {
		height: 100%;
		flex: 1 0 $base-controls-h;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&__tabs {
			gap: 1rem;
		}

		&__content {
			height: 100%;
		}
	}

	&__piano {
		height: fit-content;

		min-height: $min-piano-h;

		background-color: green;
		flex: 1 0 $max-piano-h;
	}
}
</style>
