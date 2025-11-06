<template>
	<VsCard></VsCard>
</template>

<script setup lang="ts">
import VsCard from "@/components/common/VsCard/VsCard.vue";

const compression = defineModel<DynamicsCompressorNode>();
console.log(compression.value);
</script>
