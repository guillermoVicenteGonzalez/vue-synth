<template>
	<SynthLayout>
		<template #header>Header</template>
		<template #components>
			<ModuleCardWidget></ModuleCardWidget>
		</template>
		<template #display>Main display</template>
		<template #piano>Piano</template>
		<template #footer> Footer</template>
	</SynthLayout>
</template>

<script setup lang="ts">
import SynthLayout from "@/layouts/synth/SynthLayout.vue";
import ModuleCardWidget from "@/widgets/ModuleCard/ModuleCardWidget.vue";
</script>
