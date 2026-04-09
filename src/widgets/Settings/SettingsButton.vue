<template>
	<DropdownMenu :orientation="dropdownMode">
		<template #activator>
			<VsButton variant="round" class="SettingsButton">
				<!-- <SettingsIcon class="SettingsButton__icon"></SettingsIcon> -->
				<Save class="SettingsButton__icon"></Save>
			</VsButton>
		</template>

		<template #content>
			<SettingsMenu :class="dynamicSettingsMenuClass"> </SettingsMenu>
		</template>
	</DropdownMenu>
</template>
<script setup lang="ts">
/**
 * In the future this should have more menus. For now just the settings menu
 */
import DropdownMenu, {
	type DropdownMenuOrientation,
} from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import { Save } from "lucide-vue-next";
import { computed } from "vue";
import SettingsMenu from "./SettingsMenu.vue";

interface SettingsButtonProps {
	dropdownMode?: DropdownMenuOrientation;
}

const { dropdownMode } = defineProps<SettingsButtonProps>();

const dynamicSettingsMenuClass = computed(() => ({
	"SettingsMenu--centered": dropdownMode == "centered",
}));
</script>

<style lang="scss" scoped>
$btn-size: 4rem;
$btn-size-sm: 3rem;
$menu-min-width: 20rem;
$menu-max-width: 30rem;
$menu-max-height: 30rem;
$item-height: 2rem;
$centered-margin: 7rem;

.SettingsMenu--centered {
	height: calc(100dvh - #{$centered-margin});
}

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
