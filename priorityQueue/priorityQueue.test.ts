import { enqueue, dequeue, peek } from "./priorityQueus";

describe("PriorityQueue Tests", () => {
  let queue: { item: number | string; priority: number }[];

  beforeEach(() => {
    queue = [];
  });

  it("should add an item to a queue", () => {
    queue = [
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
    ];
    enqueue(queue, 3, 3);
    expect(queue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should remove an item from a queue", () => {
    enqueue(queue, 3, 3);
    enqueue(queue, 1, 1);
    enqueue(queue, 2, 2);
    enqueue(queue, "test", 33);
    dequeue(queue, 2);
    dequeue(queue, 3);
    expect(queue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 33 },
    ]);
  });

  it("should order correctly the queue based on priority", () => {
    enqueue(queue, 3, 3);
    enqueue(queue, 1, 1);
    enqueue(queue, "test", 2);
    expect(queue).toEqual([
      { item: 1, priority: 1 },
      { item: "test", priority: 2 },
      { item: 3, priority: 3 },
    ]);
  });

  it("should show the first item in the queue", () => {
    enqueue(queue, 3, 3);
    enqueue(queue, 1, 1);
    enqueue(queue, 2, 2);
    expect(peek(queue)).toBe(1);
  });
});
