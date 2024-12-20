import AudioModule from "@/models/AudioModule";
import { EffectChain } from "@/models/LinkedList";
import Wave from "@/models/wave";
import { describe, expect, test } from "vitest";
import "web-audio-test-api";

const audioCtx = new AudioContext();
const merger = audioCtx.createChannelMerger();
const wave = new Wave(10, 1, 0);
wave.setForm("sine");
const module = new AudioModule("test moudule", wave, audioCtx, merger);

describe("Effect chain", () => {
	const effectChain = new EffectChain(module.oscillator, merger);

	test("appends efffects succesfully", () => {
		const lowPassFilter = audioCtx.createBiquadFilter();
		const otherFilter = audioCtx.createBiquadFilter();
		effectChain.append(lowPassFilter);
		expect(effectChain.last?.value).toBe(lowPassFilter);
		effectChain.append(otherFilter);
		expect(effectChain.last?.value).toBe(otherFilter);
		expect(effectChain.first?.value).toBe(lowPassFilter);
	});
});
