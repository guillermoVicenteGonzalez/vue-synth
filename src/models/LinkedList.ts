import type { AudioEffect } from "./AudioModule";

export class LinkedNode<T> {
	value: T;
	next: LinkedNode<T> | null;
	prev: LinkedNode<T> | null;

	constructor(
		value: T,
		prev: LinkedNode<T> | null,
		next: LinkedNode<T> | null
	) {
		this.value = value;
		this.prev = prev;
		this.next = next;
	}
}

export class LinkedList<T> {
	first: LinkedNode<T> | null;
	last: LinkedNode<T> | null;

	constructor() {
		this.first = null;
		this.last = null;
	}

	append(value: T) {
		if (this.first == null || this.last == null) {
			this.first = new LinkedNode(value, null, null);
			this.last = this.first;
			return this.first;
		}

		this.last.next = new LinkedNode(value, this.last, null);
		this.last = this.last.next;

		return this.last;
	}

	pop() {
		if (this.last == null) return null;
		const popped = this.last;

		if (this.last.prev != null) {
			this.last.prev.next = null;
		}
		this.last = this.last.prev;

		return popped;
	}

	#recursiveRun(node: LinkedNode<T> | null) {
		if (node == null) {
			return;
		} else {
			console.log(node.value);
			this.#recursiveRun(node.next);
		}
	}

	printList() {
		if (this.first != null) this.#recursiveRun(this.first);
	}

	// #recursiveSearch(value: T, node: LinkedNode<T>) {
	// 	if (node.next == null) {
	// 		return null;
	// 	}

	// 	if (node.value == value) {
	// 		return node;
	// 	}
	// }

	// getElement(value: T) {
	// 	// if ()
	// }
}

export class EffectChain extends LinkedList<AudioEffect> {
	gain: GainNode;
	source: OscillatorNode;

	constructor(gain: GainNode, source: OscillatorNode) {
		super();
		this.gain = gain;
		this.source = source;

		this.source.connect(gain);
	}

	append(value: AudioEffect) {
		//we call the method of the inherited LLclass
		const node = super.append(value);

		//if there was an effect before => we connect the audio nodes
		//if not, we connect the source
		if (node.prev != null) {
			node.prev.value.connect(node.value);
		} else {
			this.source.connect(node.value);
		}

		//and in any case, we connect the new node to the gain
		node.value.connect(this.gain);
		return node;
	}

	// detachEffect(value: AudioEffect) {}
}
