# Problem restatement in your own words

The problem is about finding the maximum sum of a path in a binary tree.

- A path is any sequence of connected nodes where each node can appear at most once.
- A path in a binary tree can go:
  - From a node to one of its children.
  - Through both children, forming a "V-shape" path.
  - A path containing only the node itself.
- The sum of a path is the total value of all the nodes in the sequence.

Given the root of a binary tree, the task is to calculate the largest possible path sum that can be formed, considering all possible paths in the tree.

# Detailed step-by-step solution outline and complexity analysis

To solve the problem we need to:

- Traversing the tree using post-order traversal (left, right, root).
- At each node, calculate:
  _ The max path sum starting from this node extending to its left or right subtree.
  _ The max path sum through this node including its left and right children. \* The global maximum path sum to track the best sum found so far.
  Create a helper function to compute the max gain from each subtree.

Steps:

1. Define a globalMax that starts at -Infinity. This will ensure that any valid path sum in the binary tree will replace it, regardless of how negative the node values might be.
2. Define and node and if the current node is null, return 0 since there was nothing added to the node.
3. Recursively compute the maximum gain for the left and right subtrees.
4. Calculate the maximum path sum passing through the current node:
   node + leftGain + rightGain.
5. Update globalMax to store the highest path sum encountered so far.
6. Return the maximum gain to the parent node.

Example walkthrough:

Input: root = [1, 2, 3];
For node 2, left gain = 0, right gain = 0 → local max = 2.
For node 3, left gain = 0, right gain = 0 → local max = 3.
For node 1, left gain = 2, right gain = 3 → local max = 6 → update globalMax = 6.
Output: 6.

Complexity Analysis

- Time Complexity: O(n), where n is the number of nodes in the tree. Each node is visited exactly once.
- Space Complexity: O(h), where h is the height of the tree. This accounts for the recursion stack.

# First iteration

```typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const maxPathSum = (root: TreeNode | null): number => {
  const globalMax = { value: -Infinity };

  getMaxGain(root, globalMax);
  return globalMax.value;
};

const getMaxGain = (
  node: TreeNode | null,
  globalMax: { value: number }
): number => {
  if (node === null) return 0;

  const leftGain = Math.max(getMaxGain(node.left, globalMax), 0);
  const rightGain = Math.max(getMaxGain(node.right, globalMax), 0);

  // Calculate the local maximum path sum at the current node
  const localMax = node.val + leftGain + rightGain;

  // Update the global maximum path sum if needed
  globalMax.value = Math.max(globalMax.value, localMax);

  // Return the maximum gain if continuing the path through this node
  return node.val + Math.max(leftGain, rightGain);
};
```

# Final TypeScript solution code

```typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const maxPathSum = (root: TreeNode | null): number => {
  const globalMax = initializeGlobalMax();

  getMaxGain(root, globalMax);
  return globalMax.value;
};

// Helper to initialize the global maximum object
const initializeGlobalMax = (): { value: number } => {
  return { value: -Infinity };
};

// Helper to calculate the global maximum path sum
const getMaxGain = (node: TreeNode | null, globalMax: { value: number }) => {
  if (node === null) return 0;

  const leftGain = getMaxGainFromSubtree(node.left, globalMax);
  const rightGain = getMaxGainFromSubtree(node.right, globalMax);

  const localMax = computeLocalMax(node.val, leftGain, rightGain);

  updateGlobalMax(globalMax, localMax);

  return computeMaxGainThroughNode(node.val, leftGain, rightGain);
};

// Helper to calculate the maximum gain from a subtree
const getMaxGainFromSubtree = (
  subtree: TreeNode | null,
  globalMax: { value: number }
): number => {
  return Math.max(getMaxGain(subtree, globalMax), 0);
};

// Helper to compute the local maximum at the current node
const computeLocalMax = (
  nodeVal: number,
  leftGain: number,
  rightGain: number
) => {
  return nodeVal + leftGain + rightGain;
};

// Helper to update the global maximum value if needed
const updateGlobalMax = (globalMax: { value: number }, localMax: number) => {
  globalMax.value = Math.max(globalMax.value, localMax);
};

// Helper to compute the maximum gain if continuing the path through the current node
const computeMaxGainThroughNode = (
  nodeVal: number,
  leftGain: number,
  rightGain: number
) => {
  return nodeVal + Math.max(leftGain, rightGain);
};
```

# A short paragraph on challenges and optimizations

- Implementing the maxPathSum algorithm presented challenges in managing the recursive traversal of the tree while ensuring the global maximum was updated correctly.
- At the start i tried passing and returning a single value, this leading to incorrent update and after that got to using an object to maintain a global maximum value.
- At start i did not realize that negative gains should be ignored. And have added negative values, resulting in lower sums and incorrect outputs.
- Another challenge was getting my head around identifying and correctly handling edge cases, such as trees with all negative values, single-node trees, or null trees.
- As it can be seen in the differences from first iteration and the second one, the code was optimized by separating concerns into helper functions, making the logic more easier to understand.
