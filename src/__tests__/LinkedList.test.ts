import { LinkedList } from "@/models/LinkedList";
import { describe, expect, test } from "vitest";

describe("Linked list", () => {
	test("should create", () => {
		const list = new LinkedList<number>();
		expect(list).toBeDefined();
		expect(list.first).toBe(null);
		expect(list.length).toBe(0);
	});

	test("should be able to append", () => {
		const list = new LinkedList<number>();
		const initialLength = list.length;
		list.append(2);
		expect(list.first).toBeDefined();
		expect(list.first).not.toBe(null);
		expect(list.first?.value).toBe(2);
		expect(list.length).toBe(initialLength + 1);
	});

	test("should be able to pop", () => {
		const list = new LinkedList<number>();
		list.append(2);
		const popped = list.pop();
		expect(popped).toBeDefined();
		expect(popped?.value).toBeDefined();
		expect(popped?.value).toBe(2);
		expect(list.length).toBe(0);
		expect(list.first).toBe(null);
		expect(list.last).toBe(null);
	});

	test("should be able to append more than one node", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		expect(list.length).toBe(3);

		let currentNode = list.first;
		let cont = 0;
		while (currentNode != null) {
			expect(currentNode.value).toBe(values[cont]);
			cont++;
			currentNode = currentNode.next;
		}
	});

	test("should be able to get node by index", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		expect(list.getNodeByIndex(1)?.value).toBe(values[1]);
		expect(list.getValueByIndex(1)).toBe(values[1]);
	});

	test("should be able to pop more than one node", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		expect(list.last?.value).toBe(values[2]);
		let detached = list.pop();
		expect(detached?.value).toBe(values[2]);
		expect(list.last?.value).toBe(values[1]);

		detached = list.pop();
		expect(detached?.value).toBe(values[1]);
		expect(list.last?.value).toBe(values[0]);
	});

	test("should have random access", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		list.appendAt(10, 1);
		expect(list.getValueByIndex(1)).toBe(10);
		expect(list.length).toBe(4);

		list.appendAt(5, 0);

		expect(list.first?.value).toBe(5);
		expect(list.length).toBe(5);
	});

	test("should be able to slice with random access", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const sliceIndex = 1;
		const detached = list.slice(sliceIndex);
		expect(detached).toBeDefined();
		expect(detached?.value).toBe(values[sliceIndex]);
		expect(list.length).toBe(values.length - 1);
		expect(list.last?.value).toBe(6);

		const firstNode = list.slice(0);
		expect(firstNode).toBeDefined();
		expect(list.length).toBe(values.length - 2);
	});

	test("should return index of node", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const testNode = list.getNodeByIndex(1);
		const indexOfNode = list.getIndexByNode(testNode);
		expect(indexOfNode).toBe(1);
	});

	test("should return index of value", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const value = 4;
		expect(list.getIndexByValue(value)).toBe(1);
		expect(list.getIndexByValue(2)).toBe(0);
		expect(list.getIndexByValue(6)).toBe(2);
		expect(list.getIndexByValue(10)).toBe(-1);
	});

	test("Should append new value after a specific existing node", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const nodeIndex = 0;

		const testNode = list.getNodeByIndex(nodeIndex);
		list.appendAfterNode(10, testNode);

		expect(list.length).toBe(4);
		expect(list.getValueByIndex(nodeIndex + 1)).toBe(10);
	});

	test("Should append new node after an existing value", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const valueIndex = 0;

		list.getNodeByIndex(valueIndex);
		list.appendAfterValue(10, 2);

		expect(list.length).toBe(4);
		expect(list.getValueByIndex(valueIndex + 1)).toBe(10);
		expect(list.length).toBe(4);
		const res = list.appendAfterValue(8, 8);
		expect(res).toBe(null);

		list.appendAfterValue(11, 6);

		expect(list.last?.value).toBe(11);
	});

	test("should be able to retrieve node with a value", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		expect(list.getNodeByValue(2)).toBe(null);

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const retrievedNode = list.getNodeByValue(2);
		expect(retrievedNode).toBeDefined();
		expect(retrievedNode?.value).toBe(2);
	});

	test("should be able to detach a node by its value", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}

		const detached = list.detachNodeByValue(4);
		expect(detached).toBeDefined();
		expect(list.length).toBe(values.length - 1);
		expect(detached?.value).toBe(4);

		list.detachNodeByValue(2);
		expect(list.first?.value).toBe(6);
		expect(list.first).toBe(list.last);
	});

	test("should be able to detach a node by node reference", () => {
		const list = new LinkedList<number>();
		const values = [2, 4, 6];

		for (let i = 0; i < values.length; i++) {
			list.append(values[i]);
		}
		const testNode = list.getNodeByValue(2);

		const detached = list.detachNode(testNode);
		expect(detached).toBeDefined();
		expect(detached?.value).toBe(2);
		expect(list.length).toBe(values.length - 1);
		expect(list.first?.value).toBe(4);
		expect(list.last?.value).toBe(6);
	});
});
