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
	length: number;

	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	append(value: T) {
		if (this.first == null || this.last == null) {
			this.first = new LinkedNode(value, null, null);
			this.last = this.first;
			this.length++;
			return this.first;
		}

		this.last.next = new LinkedNode(value, this.last, null);
		this.last = this.last.next;

		this.length++;

		return this.last;
	}

	getNodeByIndex(index: number) {
		if (index >= this.length) return null;

		let currentNode = this.first;
		let currentIndex = 0;

		while (currentNode != null && currentIndex < index) {
			currentNode = currentNode.next;
			currentIndex++;
		}

		return currentNode;
	}

	getNodeByValue(value: T) {
		let cont = 0;
		let currentNode = this.first;

		while (cont < this.length && currentNode != null) {
			if (currentNode.value == value) return currentNode;
			currentNode = currentNode.next;
			cont++;
		}

		return null;
	}

	getIndexByNode(node: LinkedNode<T>) {
		let cont = 0;
		let currentNode = this.first;

		if (currentNode == null) return -1;

		while (cont < this.length && currentNode != null) {
			if (currentNode == node) return cont;

			currentNode = currentNode.next;
			cont++;
		}

		return -1;
	}

	getIndexByValue(value: T) {
		let cont = 0;
		let currentNode = this.first;

		if (currentNode == null) return -1;

		while (cont < this.length && currentNode != null) {
			if (currentNode.value == value) return cont;

			currentNode = currentNode.next;
			cont++;
		}

		return -1;
	}

	getValueByIndex(index: number) {
		const node = this.getNodeByIndex(index);
		if (!node) return null;
		return node.value;
	}

	pop() {
		if (this.last == null) return null;
		const popped = this.last;

		//If there is only one node
		if (this.last === this.first) {
			this.first = null;
		}

		//if there is a previos node, we set its next to null (it used to be popped)
		if (this.last.prev != null) {
			this.last.prev.next = null;
		}

		this.last = this.last.prev;
		this.length--;
		return popped;
	}

	appendAt(value: T, index: number) {
		if (index > this.length || this.first == null) return null;

		//if the index is the last position: That is the same as appending
		if (index == this.length) {
			return this.append(value);
		}
		//if the index is the first position
		if (index == 0) {
			const newNode = new LinkedNode<T>(value, null, this.first);
			this.first.prev = newNode;
			this.first = newNode;
			this.length++;
			return newNode;
		}

		let prevNode = this.first ? this.first : null;
		let cont = 0;

		while (cont < index - 1 && prevNode != null) {
			prevNode = prevNode.next;
			cont++;
		}

		if (prevNode == null) return;

		const nextNode = prevNode.next;
		const newNode = new LinkedNode<T>(value, prevNode, nextNode);
		prevNode.next = newNode;

		if (index == 0) this.first = newNode;

		this.length++;

		return newNode;
	}

	appendAfterNode(value: T, node: LinkedNode<T>) {
		const prevIndex = this.getIndexByNode(node);
		//cuidado si previndex es el ultimo
		if (prevIndex != -1) return this.appendAt(value, prevIndex + 1);
		return null;
	}

	appendAfterValue(value: T, prevValue: T) {
		const prevIndex = this.getIndexByValue(prevValue);
		if (prevIndex != -1) return this.appendAt(value, prevIndex + 1);
		return null;
	}

	slice(index: number) {
		//invalid index / access check
		if (index > this.length || this.length == 0 || this.first == null)
			return null;

		//if the index is the last element
		if (index == this.length - 1) return this.pop();

		//else
		let currentNode: LinkedNode<T> | null = this.first;
		let cont = 0;

		while (cont < index && currentNode != null) {
			currentNode = currentNode.next;
			cont++;
		}

		if (currentNode == null) return null;

		const prevNode = currentNode.prev;
		const nextNode = currentNode.next;

		//if its the first
		if (prevNode != null) prevNode.next = nextNode;
		if (nextNode != null) nextNode.prev = prevNode;

		/**
		 * If its the only element:
		 * 	- Next node is null => this.first = null; checks out
		 * If its not the only element
		 *  - Next node == former index nº 1 => current index number 0
		 */
		if (index == 0) {
			this.first = nextNode;
		}

		this.length--;
		return currentNode;
	}

	detachNodeByValue(value: T) {
		const nodeIndex = this.getIndexByValue(value);
		return this.slice(nodeIndex);
	}

	detachNode(node: LinkedNode<T>) {
		const nodeIndex = this.getIndexByNode(node);
		return this.slice(nodeIndex);
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
		console.log("\n");
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

/**
 * ! THIS SHOULDN'T BE gain:GainNode and source:Oscillator node.
 * If we later want another general effect chain whose input node is the exit of the general wave, we need source and exit to just be audioNodes
 */
export class EffectChain extends LinkedList<AudioEffect> {
	gain: GainNode;
	source: OscillatorNode;

	constructor(gain: GainNode, source: OscillatorNode) {
		super();
		this.gain = gain;
		this.source = source;

		this.source.connect(gain);
	}

	//revisar
	append(value: AudioEffect) {
		//we call the method of the inherited LLclass
		const node = super.append(value);

		/**
		 * the source node will be the oscillator (this.source) if the prev node is null
		 * if not, the source node will be the one attached before the new node (prev)
		 * When doing an append, the exit node is always the same, eg: The gain node
		 */
		const sourceNode = node.prev == undefined ? this.source : node.prev.value;
		const exitNode = this.gain;

		sourceNode.connect(node.value);
		node.value.connect(exitNode);
		return node;
	}

	//revisar
	pop() {
		const detached = super.pop();
		if (detached == null) return null;

		/**
		 * The detached node will retain its former previous and next nodes
		 * If detached.next is undefined it means the detached node used to be the last one => it was connected to gain
		 * If the previous node is undefined => it was the oscillator
		 *
		 */
		const exitNode =
			detached.next == undefined ? this.gain : detached.next.value;
		const sourceNode =
			detached.prev == undefined ? this.source : detached.prev.value;

		/**
		 * We diconnect the source from the detached node and the detached node from the previous exit.
		 */
		sourceNode.disconnect(detached.value);
		detached.value.disconnect(exitNode);
		return detached;
	}

	// detachEffect(value: AudioEffect) {}
}
