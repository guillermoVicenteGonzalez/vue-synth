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
		console.log(list.last);
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
});
