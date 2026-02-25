import type AudioCluster from "./AudioCluster";
import type AudioModule from "./AudioModule";
import type { LFO } from "./LFO";

export type LfoSource =
	| AudioModule
	| AudioNode
	| AudioCluster
	| BiquadFilterNode;

export default interface LFOHandler {
	inputModule: LfoSource | null;
	propertyName: string | null;
	lfo: LFO;
}
