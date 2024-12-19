type ElementWithPriority = { item: number | string; priority: number };

const enqueue = (
  queue: ElementWithPriority[],
  item: number | string,
  priority: number
) => {
  const newItem = { item, priority };

  // Find the correct position to insert the new item based on priority
  const insertIndex = queue.findIndex(
    (existingItem) => newItem.priority < existingItem.priority
  );

  // Insert the item at the determined position, or add it to the end if no such position exists
  if (insertIndex === -1) {
    queue.push(newItem);
  } else {
    queue.splice(insertIndex, 0, newItem);
  }
};

const dequeue = (queue: ElementWithPriority[], priority: number) => {
  if (queue.length === 0) {
    return null;
  }
  // Find the index of the item with the desired priority
  const index = queue.findIndex((item) => item.priority === priority);
  if (index !== -1) {
    return queue.splice(index, 1)[0].item; // Return only the item's value
  }

  return null;
};

const peek = (queue: ElementWithPriority[]) => {
  return queue.length === 0 ? undefined : queue[0].item;
};

export { enqueue, dequeue, peek };
