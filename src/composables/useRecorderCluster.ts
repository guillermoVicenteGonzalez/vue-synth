import RecorderCluster from "@/models/effects/Recorder/RecorderCluster";
import { computed, type Ref, ref, watch } from "vue";

export default function useRecorderCluster(
	source: AudioNode,
	context: AudioContext
) {
	const recorderCluster: Ref<RecorderCluster, RecorderCluster> =
		ref<RecorderCluster>(new RecorderCluster(source, context)) as Ref<
			RecorderCluster,
			RecorderCluster
		>;

	const recorderComposables = computed(() => {
		console.log("ME EJECUTO");
		return recorderCluster.value.slots.map(recorder => {
			return ref(recorder);
		});
	});

	watch(
		() => recorderCluster.value.recordings,
		() => {
			console.error("POR FIN ME EJECUTO");
		},
		{
			deep: true,
		}
	);

	const hasRecordings = computed(() => {
		return recorderComposables.value.some(composable => {
			return composable.value.recording != null;
		});
	});

	return {
		recorderCluster,
		recorderComposables,
		hasRecordings,
	};
}
