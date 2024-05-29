import { ElementStates } from "../types/element-states";
import { swap, delay } from "./utils";
import { DELAY_IN_MS } from "../constants/delays";

type TStringArray = {
  value: string | undefined
  state: ElementStates
}

export const reverseText = async (text: TStringArray[], setStringValue: React.Dispatch<React.SetStateAction<TStringArray[]>>) => {
  const arr = text;
  let start = 0
  let end = arr.length - 1;

  for (start; start <= end; start++, end--) {
    arr[start].state = ElementStates.Changing
    arr[end].state = ElementStates.Changing
    setStringValue([...arr])

    await delay(DELAY_IN_MS);
    swap(arr, start, end);
    arr[start].state = ElementStates.Modified
    arr[end].state = ElementStates.Modified
    setStringValue([...arr])
  }

};