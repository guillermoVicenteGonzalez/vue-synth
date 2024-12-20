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

/**
 * A linked list consists of a series of linked nodes that are connected
 * Navigation of a linked list is achieved as:
 * - the LinkedList.first parameter stores the reference of the first linkedNode
 * - the LinkedList.last parameter stores the reference of the last linkedNode
 * - each linkedNode has references to its predecessors and successors
 * Members
 * - first: the first linkedNode in the list
 * - last: The last linkedNode in the list
 * - length: The number of nodes in the list
 */
export class LinkedList<T> {
	/**The first node in the list. If its value its null => the list is empty */
	first: LinkedNode<T> | null;
	/**The last node in the list. If it's null the list is empty */
	last: LinkedNode<T> | null;
	length: number;

	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	/**
	 * Adds a new linked node with the specified value at the end of the list
	 * @param value - The value to append to the list. Is internally converted into linkedNode
	 * @returns The last node in the list, eg the appended value, or null if it failed
	 */
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

	/**
	 * Returns the linkedNode found at the "index" position
	 * @param index
	 * @returns
	 */
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

	/**
	 * Finds the first node in the list that has the specified value and returns it
	 * @param value
	 * @returns
	 */
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

	/**
	 * Provided a linkedNode returns its position in the list (starting at 0)
	 * @param node
	 * @returns
	 */
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

	/**
	 * Returns the position (starting at 0) of the first element whose value matched the one specified
	 * @param value
	 * @returns
	 */
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

	/**
	 * detaches the last node in the linked list updating the pointers and returns it.
	 * @returns popped - The (former) last node in the chain
	 */
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

	/**
	 *
	 * @param value - The value we want the new node to have
	 * @param index - The position at which we want to append the new node
	 * @returns newNode - The created node or null if there was an error
	 */
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

		if (prevNode == null) return null;

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
	exit: AudioNode;
	source: AudioNode;

	constructor(source: AudioNode, exit: AudioNode) {
		super();
		this.exit = exit;
		this.source = source;

		this.source.connect(exit);
	}

	//revisar
	append(value: AudioEffect) {
		//we call the method of the inherited LLclass
		const node = super.append(value);

		/**
		 * the source node will be the oscillator (this.source) if the prev node is null
		 * if not, the source node will be the one attached before the new node (prev)
		 * When doing an append, the exit node is always the same, eg: The exit node
		 */

		const prevNode = node.prev == undefined ? this.source : node.prev.value;
		const nextNode = this.exit;

		prevNode.disconnect(nextNode);
		prevNode.connect(node.value);
		node.value.connect(nextNode);
		return node;
	}

	//revisar
	pop() {
		console.log("pop");
		const detached = super.pop();
		if (detached == null) return null;

		/**
		 * The detached node will retain its former previous and next nodes
		 * If detached.next is undefined it means the detached node used to be the last one => it was connected to exit
		 * If the previous node is undefined => it was the oscillator
		 *
		 */

		const prevNode =
			detached.prev == undefined ? this.source : detached.prev.value;
		const nextNode =
			detached.next == undefined ? this.exit : detached.next.value;

		/**
		 * We diconnect the source from the detached node and the detached node from the previous exit.
		 */

		prevNode.disconnect(detached.value);
		detached.value.disconnect(nextNode);
		prevNode.connect(nextNode);

		return detached;
	}

	appendAt(value: AudioEffect, index: number) {
		const newNode = super.appendAt(value, index);

		if (!newNode) return null;

		//if no prevnode => the prev is the source
		const prevNode = newNode.prev == null ? this.source : newNode.prev.value;
		//if no next node => the next is the exit
		const nextNode = newNode.next == null ? this.exit : newNode.next.value;

		/**
		 * This should always work.
		 * If it is the first node to be attached, source will disconnect from gain
		 */

		prevNode.disconnect(nextNode);
		prevNode.connect(newNode.value);
		newNode.value.connect(nextNode);
		return newNode;
	}

	//It alredy calls append at => does the connections
	appendAfterNode(value: AudioEffect, node: LinkedNode<AudioEffect>) {
		const newNode = super.appendAfterNode(value, node);

		// const prevNode = newNode.prev == null ? this.source : newNode.prev.value;
		// const nextNode = newNode.next == null ? this.exit : newNode.next.value;

		return newNode;
	}

	slice(index: number) {
		const detached = super.slice(index);

		if (!detached) return null;

		//if it WAS the last element => pop has been executed and has reconnected audio
		if (index == this.length) {
			console.log("This was the last element");
			return detached;
		}

		const prevNode = detached.prev == null ? this.source : detached.prev.value;
		const nextNode = detached.next == null ? this.exit : detached.next.value;

		prevNode.disconnect(detached.value);
		prevNode.connect(nextNode);
		detached.value.disconnect(nextNode);

		return detached;
	}

	// detachEffect(value: AudioEffect) {}
}
