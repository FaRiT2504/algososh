// export interface IStack<T> {
//   push: (item: T) => void;
//   pop: () => void;
//   getElements: () => void
//   clearStack: () => void
// }

// export class Stack<T> implements IStack<T> {
//   private container: T[] = [];

//   push = (item: T): void => {
//     this.container.push(item)
//   };

//   pop = (): void => {
//     this.container.pop()
//   };

//   getElements = (): T[] => {
//     return this.container
//   }

//   clearStack = (): void => {
//     this.container = []
//   }
// }


interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getStack: () => T[];
  clear: () => void;
}
export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  peak = () => this.container[this.container.length - 1];

  getSize = () => this.container.length;
  getStack = () => this.container;
  clear = () => this.container = [];
};