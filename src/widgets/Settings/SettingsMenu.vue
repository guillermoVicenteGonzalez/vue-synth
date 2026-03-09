<template>
	<div class="SettingsMenu">
		<PresetsMenu></PresetsMenu>
	</div>
</template>

<script setup lang="ts">
import PresetsMenu from "./Presets/PresetsMenu.vue";
</script>

<style scoped lang="scss">
$menu-min-width: 60rem;
$menu-max-width: 100rem;

// Dimensions should really be defined by its children
.SettingsMenu {
	min-width: $menu-min-width;
	width: 70rem;
	max-width: $menu-max-width;
}
</style>
