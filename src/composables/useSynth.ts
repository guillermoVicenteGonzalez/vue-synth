import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import type FilterHandler from "@/models/FilterHandler";
import { LFO } from "@/models/LFO";
import type LFOHandler from "@/models/LFOHandler";
import { ref, type Ref } from "vue";

export interface ReactiveSynth {
	cluster: Ref<AudioCluster>;
	filters: Ref<FilterHandler[]>;
	lfos: Ref<LFOHandler[]>;
	envelope: Ref<AudioEnvelope>;
}

const LFO_COUNT = 4;
// const MAX_FILTERS = 5;

const mainContext = ref<AudioContext>(new AudioContext());
const merger = mainContext.value.createChannelMerger(1);
const mainAudioCluster: Ref<AudioCluster, AudioCluster> = ref<AudioCluster>(
	new AudioCluster(mainContext.value, merger)
) as Ref<AudioCluster, AudioCluster>;
const filters = ref<FilterHandler[]>([]) as Ref<FilterHandler[]>;
const lfos = ref<LFOHandler[]>(
	[...Array(LFO_COUNT)].map(() => {
		return {
			inputModule: null,
			propertyName: null,
			lfo: new LFO(mainContext.value),
		};
	})
) as Ref<LFOHandler[]>;

mainAudioCluster.value.exit.connect(mainContext.value.destination);

const envelope = ref<AudioEnvelope>({
	attack: 0.2,
	decay: 0.4,
	sustain: 0.5,
	release: 0.2,
});

export default function useSynth(): ReactiveSynth {
	return {
		cluster: mainAudioCluster,
		filters: filters,
		lfos: lfos,
		envelope: envelope,
	};
}
