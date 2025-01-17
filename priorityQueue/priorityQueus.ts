type ElementWithPriority<T> = { item: T; priority: number };
type DequeueResult<T> = {
  updatedQueue: ElementWithPriority<T>[];
  removedItem: T | undefined;
};

const enqueue = <T>(
  queue: ElementWithPriority<T>[],
  item: number | string,
  priority: number
) => {
  const newItem = { item, priority };

  // Find the correct position to insert the new item based on priority
  const insertIndex = queue.findIndex(
    (existingItem) => newItem.priority < existingItem.priority
  );

  if (insertIndex === -1) {
    return [...queue, newItem];
  } else {
    return [
      ...queue.slice(0, insertIndex),
      newItem,
      ...queue.slice(insertIndex),
    ];
  }
};

const dequeue = <T>(
  queue: ElementWithPriority<T>[],
  priority: number
): DequeueResult<T> => {
  if (queue.length === 0) {
    return { updatedQueue: queue, removedItem: undefined };
  }
  // Find the index of the item with the desired priority
  const index = queue.findIndex((item) => item.priority === priority);
  if (index !== -1) {
    const removedItem = queue[index].item;

    // Create a new queue without the item at the found index
    const updatedQueue = queue.filter((_, i) => i !== index);
    return { updatedQueue, removedItem };
  }

  return { updatedQueue: queue, removedItem: undefined };
};

const peek = <T>(queue: ElementWithPriority<T>[]) => {
  return queue.length === 0 ? undefined : queue[0].item;
};

export { enqueue, dequeue, peek };
