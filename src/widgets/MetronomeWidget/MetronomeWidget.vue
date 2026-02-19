<template>
	<VsTooltip text="Metronome">
		<VsButton
			class="MetronomeWidget"
			:class="dynamicMetronomeClass"
			variant="round"
			@click="toggleMetronome"
			>a</VsButton
		>
	</VsTooltip>
</template>

<script setup lang="ts">
import VsButton from "@/components/common/VsButton/VsButton.vue";
import VsTooltip from "@/components/VsTooltip/VsTooltip.vue";
import Metronome from "@/models/utils/metronome/metronome";
import { computed, ref } from "vue";

const metronome = ref<Metronome>(new Metronome());

const dynamicMetronomeClass = computed(() => ({
	"MetronomeWidget--active": metronome.value.isPlaying,
}));

function toggleMetronome() {
	if (metronome.value.isPlaying) metronome.value.stop();
	else metronome.value.start();
}
</script>

<style lang="scss" scoped>
$btn-size: 4rem;
$btn-size-sm: 3rem;

.MetronomeWidget {
	background-color: $primary-color;
	width: $btn-size;
	height: $btn-size;
	padding: $gap-df;
	justify-self: center;

	&--active {
		color: white !important;
	}
}
</style>
