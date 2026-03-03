import AudioCluster from "@/models/AudioCluster";
import type { AudioEnvelope } from "@/models/AudioEnvelope";
import ChorusEffect from "@/models/effects/ChorusEffect";
import { CompressionEffect } from "@/models/effects/CompressionEffect";
import DelayEffect from "@/models/effects/DelayEffect";
import DistortionEffect from "@/models/effects/DistortionEffect";
import Equalizer from "@/models/effects/EqualizerEffect";
import { FilterEffect } from "@/models/effects/FilterEffect";
import { FlangerEffect } from "@/models/effects/FlangerEffect";
import { ReverbEffect } from "@/models/effects/ReverbEffect";
import WahEffect from "@/models/effects/WahEffect";
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

//!ORDER IS IMPORTANT
function initializeEffects(cluster: AudioCluster) {
	const compression = new CompressionEffect(cluster.context);
	const filter = new FilterEffect(cluster.context);
	const distortion = new DistortionEffect(cluster.context);
	const delay = new DelayEffect(cluster.context);
	const flanger = new FlangerEffect(cluster.context);
	const chorus = new ChorusEffect(cluster.context);
	const reverb = new ReverbEffect(cluster.context);
	const wah = new WahEffect(cluster.context);
	const equalizer = new Equalizer(cluster.context);

	flanger.disabled = true;
	filter.disabled = true;
	delay.disabled = true;
	chorus.disabled = true;
	reverb.disabled = true;
	distortion.disabled = true;
	wah.disabled = true;

	cluster.effects.append(wah);
	cluster.effects.append(distortion);
	cluster.effects.append(flanger);
	cluster.effects.append(chorus);
	cluster.effects.append(delay);
	cluster.effects.append(reverb);
	cluster.effects.append(filter);
	cluster.effects.append(equalizer);
	cluster.effects.append(compression);
}

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
initializeEffects(mainAudioCluster.value);

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
