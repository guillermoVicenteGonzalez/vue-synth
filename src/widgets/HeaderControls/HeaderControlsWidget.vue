<template>
	<ul class="header-controls">
		<VsTabButton
			v-for="item in tabItems"
			:key="item"
			:active="currentTab == item"
			class="header-controls__item"
			@click="handleSelectTab(item)"
		>
			{{ item }}
		</VsTabButton>
	</ul>
</template>

<script setup lang="ts">
import VsTabButton from "@/components/common/VsToggleButton/VsTabButton.vue";

const tabItems = <const>["Voice", "Effects"];
type TabItem = (typeof tabItems)[number];
const currentTab = defineModel<TabItem>({
	default: "Voice",
});

function handleSelectTab(tab: TabItem) {
	currentTab.value = tab;
}
</script>

<style lang="scss" scoped>
$border-size: 0.3rem;

.header-controls {
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	list-style: none;

	&__item {
		height: 100%;
		width: 100%;
		text-align: center;
		font-size: 2rem;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
