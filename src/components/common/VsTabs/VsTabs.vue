<template>
	<div class="VsTabs" :class="VsTabsDynamicClasses">
		<ul class="VsTabs__navigation">
			<li
				v-for="(tab, index) in items"
				:key="tab + index"
				class="VsTabs__selector"
				:class="{ 'VsTabs__selector--active': index == activeTab }"
				@click="handleSelectTab(index)"
			>
				{{ tab }}
			</li>
		</ul>

		<div class="VsTabs__content">
			<slot ref="myslot"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type VsTabsVariant = "default";
export type VsTabsOrientation = "horizontal" | "vertical";

interface VsTabsProps {
	items: string[];
	textColor?: string;
	highlightColor?: string;
	variant?: VsTabsVariant;
	orientation?: VsTabsOrientation;
}

const {
	items,
	textColor,
	variant = "default",
	orientation = "vertical",
} = defineProps<VsTabsProps>();

const activeTab = defineModel<number>();

function handleSelectTab(i: number) {
	activeTab.value = i;
}

const VsTabsDynamicClasses = computed(() => ({
	[`VsTabs--${variant}`]: variant,
	[`VsTabs--${orientation}`]: orientation,
}));
</script>

<style lang="scss" scoped>
.VsTabs {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	color: v-bind(textColor);

	&__navigation {
		display: flex;
		justify-content: center;
		list-style: none;
		gap: 4rem;
	}

	&__content {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	&__selector {
		font-size: 2.2rem;
		font-weight: 400;

		&--active {
			text-decoration: underline;
			font-weight: 800;
		}
	}

	&--vertical {
		.VsTabs {
			&__navigation {
				flex-direction: column;
				gap: 1rem;
			}
		}
	}
}
</style>
