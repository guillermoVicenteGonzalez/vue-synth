<template>
	<ul class="header-controls">
		<li class="header-controls__item">Voice</li>
		<li class="header-controls__item">Effects</li>
		<li class="header-controls__item">Options</li>
	</ul>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header-controls {
	display: flex;
	height: 100%;
	justify-content: space-evenly;
	align-items: center;
	list-style: none;

	&__item {
		font-size: 2rem;
	}
}
</style>
