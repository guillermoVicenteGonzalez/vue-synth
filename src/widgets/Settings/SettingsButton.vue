<template>
	<DropdownMenu>
		<template #activator>
			<VsButton variant="round" class="SettingsButton">
				<SettingsIcon class="SettingsButton__icon"></SettingsIcon>
			</VsButton>
		</template>

		<template #content>
			<SettingsMenu></SettingsMenu>
		</template>
	</DropdownMenu>
</template>
<script setup lang="ts">
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import { SettingsIcon } from "lucide-vue-next";
import SettingsMenu from "./SettingsMenu.vue";
</script>

<style lang="scss" scoped>
$btn-size: 4rem;
$btn-size-sm: 3rem;

$menu-min-width: 20rem;
$menu-max-width: 30rem;
$menu-max-height: 30rem;

$item-height: 2rem;

.SettingsButton {
	background-color: $primary-color;
	min-width: $btn-size;
	min-height: $btn-size;
	padding: $gap-df;
	justify-self: center;

	&__icon {
		@include iconButton;
		color: $tertiary-color;
		color: black;
	}
}
</style>
