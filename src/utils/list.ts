export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  getByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  toArray: () => (T | null)[];
  deleteHead: () => void;
  deleteTail: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  public size: number;
  constructor(arr: T[]) {
    this.head = null;
    this.size = 0;
    arr.forEach((element) => this.append(element));
  }

  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    }

    else {
      let cur = this.head;

      while (cur.next !== null) {
        cur = cur.next;
      }

      cur.next = node;
    }
    this.size++;
  }
  getSize() {
    return this.size;
  }
  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    this.size++;
  }

  getByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Enter a valid index');

    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev: Node<T> | null = null;

        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++;
        }

        node.next = curr;
        if (prev) {
          prev.next = node;
        }
      }

      this.size++;
    }
  }
  deleteByIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Invalid index');
    }

    if (index === 0) {
      this.deleteHead();
      return;
    }

    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    current!.next = current!.next!.next;

    this.size--;
  }

  toArray() {
    let result: (T | null)[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail() {
    if (!this.head) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
      this.size = 0;
      return;
    }
    let cur = this.head;
    let prev = null;

    while (cur.next !== null) {
      prev = cur;
      cur = cur.next;
    }

    prev!.next = null;
    this.size--;
  }
}