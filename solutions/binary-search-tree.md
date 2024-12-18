# Problem restatement in your own words

You have a collection of numbers in an array like this: [1, 3, 4, 5]. If you want to add a new number (2) to this list, you would have to sort the entire array again to maintain order: [1, 2, 3, 4, 5].
Binary search tree method can offer a more efficient way to manage data.
When inserting a number, instead of sorting the entire list again, you only need to make a few adjustments. Each node in a binary search tree contains a piece of data and pointers to the left and right subtrees.
For each new number you want to add, you start from the root of the tree, compare the new number to the current node's value and if the new number is smaller, you go to the left subtree and if it's larger, you go to the right subtree. If the left or right subtree doesn't exist, you create a new node with the new number and link it to the current node.

# Detailed step-by-step solution outline and complexity analysis

1. Class structure
   Has three properties:
   - currentNodeValue: A number that stores the data of the current node.
   - leftNode: A reference to the left child node.
   - rightNode: A reference to the right child node.
     Constructor:
   - has parameter data and sets currentNodeValue to the provided data and leftNode and rightNode as undefined.
2. Methods
   - data getter: returns currentNodeValue of the node.
   - right getter: returns rightNode of the node.
   - left getter: returns leftNode of the node.
   - insert method with parameter item – the value to insert into the tree
     - start at the Root: if item is less than or equal to currentNodeValue:
       - Check if leftNode exists:
         - if true, call insert(item) on the left subtree.
         - if false, create a new BinarySearchTree instance with item and assign it to leftNode.
     - if item is greater than currentNodeValue:
       - Check if rightNode exists:
         - if true, call insert(item) on the right subtree.
         - if false, create a new BinarySearchTree instance with item and assign it to rightNode.
   - each method with parameter callback that takes a number as an argument.
     - traverse the left subtree and if leftNode exists, recursively call each method on leftNode.
     - then we process the current node and we execute callback with currentNodeValue.
     - traverse the right subtree and if rightNode exists, recursively call each on rightNode.
3. Complexity analysis
   Time complexity:
   - the insert method has a linear time complexity because every insertion goes through each level of the tree sequentially so, we will have a complexity of O(n)
   - same goes for the each method, O(n) because every node is visited exactly once during the traversal - left subtree, current node, right subtree.
     Space complexity
   - Complexity will be O(n), because the space used by the BinarySearchTree is linear with n number of elements. This is because each node requires space for its currentNodeValue, leftNode, and rightNode.

# Final TypeScript solution code

```typescript
export class BinarySearchTree {
  currentNodeValue: number;
  leftNode: BinarySearchTree | undefined;
  rightNode: BinarySearchTree | undefined;

  constructor(data: number) {
    this.currentNodeValue = data;
    this.leftNode = undefined;
    this.rightNode = undefined;
  }

  public get data(): number {
    return this.currentNodeValue;
  }

  public get right(): BinarySearchTree | undefined {
    return this.rightNode;
  }

  public get left(): BinarySearchTree | undefined {
    return this.leftNode;
  }

  public insert(item: number): void {
    if (item <= this.currentNodeValue) {
      if (this.leftNode) {
        this.leftNode.insert(item);
      } else {
        this.leftNode = new BinarySearchTree(item);
      }
    } else {
      if (this.rightNode) {
        this.rightNode.insert(item);
      } else {
        this.rightNode = new BinarySearchTree(item);
      }
    }
  }
  public each(callback: (data: number) => void): void {
    if (this.leftNode) {
      this.leftNode.each(callback);
    }
    callback(this.currentNodeValue);
    if (this.rightNode) {
      this.rightNode.each(callback);
    }
  }
}
```

# A short paragraph on challenges and optimizations

- Just a small delay in acommodating with exercism. Stumbled upon problems in running the test locally.
