<template>
	<VsButton class="ToggleButton">
		<slot></slot>
	</VsButton>
</template>

<script lang="ts" setup>
import VsButton from "@components/common/VsButton/VsButton.vue";
// const active = defineModel<boolean>();
</script>

<style lang="scss" scoped>
.ToggleButton {
}
</style>
