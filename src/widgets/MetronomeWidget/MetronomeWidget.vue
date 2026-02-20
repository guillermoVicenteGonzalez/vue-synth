<template>
	<DropdownMenu orientation="bot" activation="rightCLick">
		<template #activator>
			<VsTooltip text="Metronome">
				<VsButton
					class="MetronomeWidget"
					:class="dynamicMetronomeClass"
					variant="round"
					@click="toggleMetronome"
					><Timer class="MetronomeWidget__icon"></Timer
				></VsButton>
			</VsTooltip>
		</template>

		<template #content>
			<ul class="MetronomeWidget__menu">
				<li class="MetronomeWidget__menu__item">
					<span>Volume</span>
					<VsSlider
						v-model="metronome.volume"
						:max="METRONOME_MAX_VOLUME"
					></VsSlider>
				</li>
				<li class="MetronomeWidget__menu__item">
					<span>Pitch</span>
					<VsSlider
						v-model="metronome.pitch"
						:min="MIN_METRONOME_PITCH"
						:max="MAX_METRONOME_PITCH"
					></VsSlider>
				</li>
				<li class="MetronomeWidget__menu__item">
					<span>Form</span>
					<VsSelector
						v-model="metronome.waveForm"
						:items="Object.keys(waveForms)"
					></VsSelector>
				</li>
				<li class="MetronomeWidget__menu__item">
					<span>BPM</span>
					<VsNinput
						v-model="metronome.bpm"
						:min="MIN_METRONOME_BPM"
						:max="MAX_METRONOME_BPM"
						:step="1"
					></VsNinput>
				</li>
				<li class="MetronomeWidget__menu__item">
					<span> Beats </span>
					<VsNinput
						v-model="metronome.beats"
						:min="MIN_METRONOME_BEATS"
						:max="MAX_METRONOME_BEATS"
						:step="1"
					></VsNinput>
				</li>
			</ul>
		</template>
	</DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu.vue";
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsNinput from "@/components/common/VsNinput/VsNinput.vue";
import VsSelector from "@/components/common/VsSelector/VsSelector.vue";
import VsSlider from "@/components/common/VsSlider/VsSlider.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import Metronome, {
	MAX_METRONOME_BEATS,
	MAX_METRONOME_BPM,
	MAX_METRONOME_PITCH,
	METRONOME_MAX_VOLUME,
	MIN_METRONOME_BEATS,
	MIN_METRONOME_BPM,
	MIN_METRONOME_PITCH,
} from "@/models/utils/metronome/metronome";
import { waveForms } from "@/models/wave";
import { Timer } from "lucide-vue-next";
import { computed, onUnmounted, ref } from "vue";

const metronome = ref<Metronome>(new Metronome());

const dynamicMetronomeClass = computed(() => ({
	"MetronomeWidget--active": metronome.value.isPlaying,
}));

function toggleMetronome() {
	if (metronome.value.isPlaying) metronome.value.stop();
	else metronome.value.start();
}

onUnmounted(() => {
	metronome.value.stop();
});
</script>

<style lang="scss" scoped>
$btn-size: 4rem;
$btn-size-sm: 3rem;

$menu-min-width: 20rem;
$menu-max-width: 30rem;
$menu-max-height: 30rem;

$item-height: 2rem;

.MetronomeWidget {
	background-color: $primary-color;
	width: $btn-size;
	height: $btn-size;
	padding: $gap-df;
	justify-self: center;

	&__icon {
		@include iconButton;
		color: $tertiary-color;
		color: black;
	}

	&--active {
		background-color: $secondary-color;
		* {
			color: $text-color;
		}
		border: solid 1px $text-color;
	}

	&__menu {
		list-style: none;
		overflow: auto;
		display: flex;
		flex-direction: column;
		// gap: $gap-df;
		padding: 0 $gap-df;
		height: max-content;
		width: max-content;

		min-width: $menu-min-width;
		max-width: $menu-max-width;
		max-height: $menu-max-height;

		&__item {
			padding: $gap-df;
			font-size: 1.6rem;
			color: $text-color;
			width: 100%;
			// height: $item-height;
			// white-space: nowrap;

			display: grid;
			grid-template-columns: 1.2fr 2fr;
			grid-template-rows: $item-height;
			align-items: center;

			gap: $gap-bg;
		}
	}
}
</style>
