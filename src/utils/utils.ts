import { ElementStates } from "../types/element-states"

export const swap = <T>(arr: T[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
export const delay = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export interface IRandomArray {
  value: number;
  state: ElementStates;
  small?: ISmall;
  stringValue?: string;
}
interface ISmall {
  value: string;
  type: 'top' | 'bottom';
}

export const randomArray = (minSize: number, maxSize: number): IRandomArray[] => {
  const arrayLength = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  const array = [];
  for (let i = 0; i < arrayLength; i++) {
    const randomNum = Math.ceil(Math.random() * 100);
    array.push(randomNum);
  }
  const object = array.map((num) => {
    return {
      value: num,
      state: ElementStates.Default,
    };
  });
  return object;
};