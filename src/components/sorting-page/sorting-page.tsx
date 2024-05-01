import React, { useEffect } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { swap, randomArray, delay } from "../../utils/utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export interface IRandomArray {
  value: number;
  state: ElementStates;
}


export const SortingPage: React.FC = () => {
  const [isLoadingDescSort, setLoadingDescSort] = useState(false);
  const [isLoadingAscSort, setLoadingAscSort] = useState(false);
  const [isLoaderNewArray, setIsLoaderNewArray] = useState(false)
  const [isBubble, setIsbubble] = useState(false);
  const [array, setArray] = useState<IRandomArray[]>([]);

  useEffect(() => {
    setArray(randomArray(3, 17))
  }, []);



  const changeRadio = () => {
    setIsbubble(!isBubble);
  }

  const makeArray = () => {
    setIsLoaderNewArray(true)
    setArray(randomArray(3, 17))
    setIsLoaderNewArray(false)
  }

  const sortedArrayAscend = async (direction: Direction.Ascending) => {
    setLoadingAscSort(true);

    array.map(item => item.state = ElementStates.Default)

    if (!isBubble) {
      setArray(await selectionSort(array, direction, setArray));
    }
    else {
      setArray(await bubbleSort(array, direction, setArray));
    }
    setLoadingAscSort(false);
  }

  const sortedArrayDescend = async (direction: Direction.Descending) => {
    setLoadingDescSort(true);

    array.map(item => item.state = ElementStates.Default)

    if (!isBubble) {
      setArray(await selectionSort(array, direction, setArray));
    }
    else {
      setArray(await bubbleSort(array, direction, setArray));
    }
    setLoadingDescSort(false);
  }

  const selectionSort = async (
    arr: IRandomArray[],
    direction: Direction.Descending | Direction.Ascending,
    setArray: React.Dispatch<React.SetStateAction<IRandomArray[]>>,
  ): Promise<IRandomArray[]> => {
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
    arr[arr.length - 1].state = ElementStates.Modified;
    return arr;
  }

  const bubbleSort = async (
    arr: IRandomArray[],
    direction: Direction.Descending | Direction.Ascending,
    setArray: React.Dispatch<React.SetStateAction<IRandomArray[]>>,
  ): Promise<IRandomArray[]> => {

    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
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



  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.main}`}>
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.radios}`}>
            <RadioInput
              label="Выбор"
              checked={!isBubble}
              value="select"
              onChange={changeRadio}
              disabled={isLoadingAscSort || isLoadingDescSort || isLoaderNewArray}
            />
            <RadioInput
              label="Пузырёк"
              checked={isBubble}
              value="bubble"
              onChange={changeRadio}
              disabled={isLoadingAscSort || isLoadingDescSort || isLoaderNewArray}
            />
          </div>
          <div className={`${styles.buttons}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => sortedArrayAscend(Direction.Ascending)}
              isLoader={isLoadingAscSort}
              disabled={isLoadingDescSort || isLoaderNewArray}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => sortedArrayDescend(Direction.Descending)}
              isLoader={isLoadingDescSort}
              disabled={isLoadingAscSort || isLoaderNewArray}
            />
          </div>
          <Button
            text="Новый массив"
            isLoader={isLoaderNewArray}
            onClick={makeArray}
            disabled={isLoadingAscSort || isLoadingDescSort}
          />
        </div>
        <div className={`${styles.sorting}`}>
          {array.map((item, index) => {
            return <Column key={index} index={item.value} state={item.state} />;
          })

          }
        </div>
      </div>
    </SolutionLayout>
  );
};
















