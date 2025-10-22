<template>
	<ul class="header-controls">
		<li
			:class="handleActiveTabClass(item)"
			class="header-controls__item"
			v-for="item in tabItems"
			:key="item"
			@click="handleSelectTab(item)"
		>
			{{ item }}
		</li>
	</ul>
</template>

<script setup lang="ts">
const tabItems = <const>["Voice", "Effects"];
type TabItem = (typeof tabItems)[number];
const currentTab = defineModel<TabItem>({
	default: "Voice",
});

function handleSelectTab(tab: TabItem) {
	currentTab.value = tab;
}

function handleActiveTabClass(tab: TabItem) {
	if (tab === currentTab.value) return "header-controls__item--active";
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

		&--active {
			background-color: $bg-color-3;
			border-top: solid $border-size $primary-color;
		}
	}
}
</style>
