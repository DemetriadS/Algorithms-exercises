import { enqueue, dequeue, peek } from "./priorityQueus";

describe("PriorityQueue Tests", () => {
  let mockQueue: { item: string | number; priority: number }[];

  beforeEach(() => {
    // Mock data for setup
    mockQueue = [
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ];
  });

  it("should add an item to a queue", () => {
    const updatedQueue = enqueue(mockQueue, 4, 4);

    expect(updatedQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
      { item: 4, priority: 4 },
    ]);

    // Ensure original queue remains unchanged
    expect(mockQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should remove an item from a queue", () => {
    const { updatedQueue, removedItem } = dequeue(mockQueue, 2);

    expect(updatedQueue).toEqual([
      { item: 1, priority: 1 },
      { item: 3, priority: 3 },
    ]);
    expect(removedItem).toBe("test");

    // Ensure original queue remains unchanged
    expect(mockQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should return null when trying to remove an item with a non-existent priority", () => {
    const { updatedQueue, removedItem } = dequeue(mockQueue, 99);

    expect(updatedQueue).toEqual(mockQueue);
    expect(removedItem).not.toBeDefined();
  });

  it("should order the queue correctly when adding items based on priority", () => {
    const updatedQueue = enqueue(mockQueue, "new-item", 2.5);

    expect(updatedQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: "new-item", priority: 2.5 },
      { item: 3, priority: 3 },
    ]);

    // Ensure original queue remains unchanged
    expect(mockQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should show the first item in the queue", () => {
    const firstItem = peek(mockQueue);

    expect(firstItem).toBe(1);

    // Ensure original queue remains unchanged
    expect(mockQueue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should return undefined when peeking an empty queue", () => {
    const emptyQueue: { item: string | number; priority: number }[] = [];
    const firstItem = peek(emptyQueue);

    expect(firstItem).toBeUndefined();
  });
});
