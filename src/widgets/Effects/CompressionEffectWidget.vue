<template>
	<EffectCard title="compression" v-model="disabled">
		<template #body>
			<div class="CompressionEffect__body">
				<div class="CompressionEffect__body__controls">
					<div class="CompressionEffect__body__control">
						<VsChip class="CompressionEffect__chip">Threshold</VsChip>

						<CircleSlider
							v-model="compressorHandler.threshold"
							class="CompressionEffect__circle-slider"
							:min="-100"
							:max="0"
							:step="0.01"
							:fill-color="primaryColor"
						></CircleSlider>
					</div>

					<div class="CompressionEffect__body__control">
						<VsChip class="CompressionEffect__chip">Knee</VsChip>

						<CircleSlider
							v-model="compressorHandler.knee"
							class="CompressionEffect__circle-slider"
							:min="0"
							:max="40"
							:step="0.01"
							:fill-color="primaryColor"
						></CircleSlider>
					</div>
				</div>
				<CompressionAnalyser
					v-if="compression && preCompressionSource"
					class="CompressionEffect__body__visualization"
					:compressed-source="compression"
					:source="preCompressionSource"
				></CompressionAnalyser>

				<div class="CompressionEffect__body__controls">
					<div class="CompressionEffect__body__control">
						<VsChip class="CompressionEffect__chip">Attack</VsChip>

						<CircleSlider
							v-model="compressorHandler.attack"
							class="CompressionEffect__circle-slider"
							:min="0"
							:max="1"
							:step="0.001"
							:fill-color="primaryColor"
						></CircleSlider>
					</div>

					<div class="CompressionEffect__body__control">
						<VsChip class="CompressionEffect__chip">Ratio</VsChip>
						<CircleSlider
							v-model="compressorHandler.ratio"
							class="CompressionEffect__circle-slider"
							:min="1"
							:max="20"
							:step="0.01"
							:fill-color="primaryColor"
						></CircleSlider>
					</div>
				</div>
			</div>
		</template>
	</EffectCard>
</template>

<script setup lang="ts">
import CircleSlider from "@/components/common/CircleSlider/CircleSlider.vue";
import VsChip from "@/components/common/VsChip/VsChip.vue";
import CompressionAnalyser from "@/components/waves/CompressionAnalyser/CompressionAnalyser.vue";
import AudioCluster from "@/models/AudioCluster";
import type { AudioEffect } from "@/models/AudioModule";
import { CompressionEffectHandler } from "@/models/effects/CompressionEffectHandler";
import type { LinkedNode } from "@/models/LinkedList";
import { inject, ref, type Ref } from "vue";
import EffectCard from "./EffectCard.vue";

const compression = defineModel<DynamicsCompressorNode>({ required: true });
const compressorHandler = ref<CompressionEffectHandler>(
	new CompressionEffectHandler(compression.value)
);

const cluster: Ref<AudioCluster> | undefined = inject("mainCluster");
const preCompressionSource = ref<AudioNode>();

const disabled = ref<boolean>();
const primaryColor = "#42d392";

function getSourcePreCompression() {
	if (!cluster) return;

	const clusterLinkedNode: LinkedNode<AudioEffect> | null =
		cluster.value.effects.getNodeByValue(compression.value);

	if (!clusterLinkedNode) return;

	const prevNode = clusterLinkedNode.prev;
	preCompressionSource.value =
		prevNode == null ? cluster.value.effects.source : prevNode.value;
	console.log(preCompressionSource.value);
}

getSourcePreCompression();
</script>

<style scoped lang="scss">
$handle-bg-color: black;
$handle-padding: 1rem;
$disabled-color: gray;

$handle-width: 4rem;

.CompressionEffect {
	&__body {
		display: flex;
		height: 100%;
		gap: $gap-df;

		&__controls {
			flex: 0 0 15rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}

		&__control {
			display: flex;
			flex-direction: column;
			gap: $gap-df;
			width: 100%;
			align-items: center;
			padding: $gap-sm;
		}

		&__visualization {
			background-color: $bg-color-1;
			border-radius: 0.5rem;
			flex: 1 1 100%;
		}
	}

	&__chip {
		font-size: 1.6rem;
		width: 70%;
		text-align: center;
	}

	&__circle-slider {
		color: $text-color;
	}
}
</style>
