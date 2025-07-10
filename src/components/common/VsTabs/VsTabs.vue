<template>
	<div class="tabs">
		<ul class="tabs__navigation">
			<li
				v-for="(tab, index) in items"
				:key="tab + index"
				class="tabs__selector"
				:class="{ 'tabs__selector--active': index == activeTab }"
				@click="handleSelectTab(index)"
			>
				{{ tab }}
			</li>
		</ul>

		<div class="tabs__content">
			<slot ref="myslot"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
interface VsTabsProps {
	items: string[];
	textColor?: string;
	highlightColor?: string;
	variant?: string;
}

const { items, textColor } = defineProps<VsTabsProps>();

const activeTab = defineModel<number>();

function handleSelectTab(i: number) {
	activeTab.value = i;
}
</script>

<style lang="scss" scoped>
.tabs {
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
}
</style>
