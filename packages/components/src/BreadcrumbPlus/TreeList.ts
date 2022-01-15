/* eslint-disable */
import equals from 'ramda/es/equals';
// 后进先出
class Stack<T> {
  stackList: T[] = [];
  // 入队
  inStack(...data: T[]) {
    this.stackList.unshift(...data);
  }
  // 出列
  outStack() {
    return this.stackList.shift();
  }
}

class TreeNode<T> {
  data: Partial<T>;
  parent: TreeNode<T> | null = null;
  children: TreeNode<T>[] = [];
  constructor(data: T) {
    this.data = data;
  }
}

type LikeTree<T> = Partial<T> & {
  children?: T[];
};
interface TreeListOptions<T> {
  pickData: (data: LikeTree<T>) => Partial<T>;
  rootValue: Partial<T>;
}
type TreeTraverseCallback<T> = (data: TreeNode<T>) => boolean;

class Tree<T> {
  _root: TreeNode<T> | null = null;
  options: TreeListOptions<T>;

  private getParent(formatData: Partial<T>): TreeNode<T> | undefined {
    let parent: TreeNode<T> | undefined = undefined;
    this.traverse((node) => {
      const match = equals(node.data, formatData);
      if (match) {
        parent = node;
        return true;
      }
      return false;
    });
    return parent;
  }
  add(data: Partial<T>, toData?: Partial<T>) {
    const node = new TreeNode(data);
    if (!this._root) {
      this._root = node;
      return this;
    }
    if (toData) {
      const parent = this.getParent(toData);
      if (parent) {
        node.parent = parent;
        parent.children.push(node);
      } else {
        throw new Error('没有找到父元素');
      }
    }
  }
  // 深度优先遍历
  traverse(callback: TreeTraverseCallback<T>) {
    const stack = new Stack<TreeNode<T> | null>();
    let found = false;
    stack.inStack(this._root);
    let curNode = stack.outStack();
    while (!found && curNode) {
      found = callback(curNode);
      if (!found) {
        stack.inStack(...curNode.children);
        curNode = stack.outStack();
      }
    }
  }

  constructor(list: LikeTree<T>[], options: TreeListOptions<T>) {
    this.options = options;
    this.add(options.rootValue);
    list.forEach((item) => {
      this.covertToTree(item);
    });
  }

  private covertToTree<T>(data: LikeTree<T>) {
    const { rootValue, pickData } = this.options;

    const run = (data: LikeTree<T>, parentData?: LikeTree<T>) => {
      // @ts-ignore
      const nodeData = pickData(data);
      // @ts-ignore
      const children = data.children || data.routes;
      // @ts-ignore
      this.add(nodeData, parentData);
      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          // @ts-ignore
          run(child, nodeData);
        }
      }
    };
    // @ts-ignore
    run(data, rootValue);
  }

  getNode(cb: TreeTraverseCallback<T>): TreeNode<T> | undefined {
    let res: TreeNode<T> | undefined = undefined;
    this.traverse((node) => {
      let match = cb(node);
      if (match) {
        res = node;
      }
      return match;
    });
    return res;
  }

  findPath(cb: TreeTraverseCallback<T>) {
    const node = this.getNode(cb);
    if (!node) return [];
    const res = [node];
    let curNode = node?.parent;
    while (curNode !== null) {
      res.push(curNode);
      curNode = curNode?.parent;
    }
    return res
      .map((node) => node?.data)
      .filter((item) => !equals(item, this.options.rootValue))
      .reverse();
  }
}

export default Tree;
