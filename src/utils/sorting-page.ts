import { swap, delay } from "./utils";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { Direction } from "../types/direction";
type TRandomArray = {
  value: number;
  state: ElementStates;
}
// type TStringArray = {
//   value: string | undefined
//   state: ElementStates
// }
export const bubbleSort = async (
  arr: TRandomArray[],
  direction: Direction.Descending | Direction.Ascending,
  setArray: React.Dispatch<React.SetStateAction<TRandomArray[]>>,
): Promise<TRandomArray[]> => {

  const length = arr.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (
        direction === Direction.Ascending
          ? arr[j].value > arr[j + 1].value
          : arr[j].value < arr[j + 1].value
      ) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    setArray([...arr]);
  }
  return arr;
}


export const selectionSort = async (
  text: TRandomArray[],
  direction: Direction.Descending | Direction.Ascending,
  setArray: React.Dispatch<React.SetStateAction<TRandomArray[]>>,
): Promise<TRandomArray[]> => {
  const arr = text;
  let end = arr.length - 1;
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    arr[minIndex].state = ElementStates.Changing;
    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (direction === Direction.Descending ? arr[j].value > arr[minIndex].value
        : arr[j].value < arr[minIndex].value) {
        minIndex = j;

      }
      arr[j].state = ElementStates.Default;
      setArray([...arr]);
    }
    if (minIndex !== i) {
      arr[minIndex].state = ElementStates.Modified;
      arr[i].state = ElementStates.Default;
      swap(arr, i, minIndex);
    }
    else {
      arr[i].state = ElementStates.Modified;
    }
    setArray([...arr]);
  }
  // sss
  arr[end].state = ElementStates.Modified;
  return arr;
}