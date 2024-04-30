import React, { useState, useCallback, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";
import { Input } from "../ui/input/input";
import styles from './string.module.css'


type TStringArray = {
  value: string | undefined
  state: ElementStates
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('')
  const [stringValue, setStringValue] = useState<TStringArray[]>([])
  const [isLoading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }


  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const stringArray = input.split('').map((item) => {
        return {
          value: item,
          state: ElementStates.Default
        }
      })
      setLoading(true)
      setStringValue(stringArray);
      reverseText(stringArray)
    }, [input]
  );

  const reverseText = async (text: TStringArray[]) => {
    const arr = text;
    let start = 0
    let end = arr.length - 1;

    for (start; start <= end; start++, end--) {
      arr[start].state = ElementStates.Changing
      arr[end].state = ElementStates.Changing
      setStringValue([...arr])

      await new Promise(resolve => setTimeout(resolve, 1000));
      swap(arr, start, end);
      arr[start].state = ElementStates.Modified
      arr[end].state = ElementStates.Modified
      setStringValue([...arr])
    }
    setLoading(false)
  };


  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <Input value={input} onChange={onChange} isLimitText maxLength={11} />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
          disabled={input.length > 0 ? false : true}
        />
      </form>
      <div className={styles.circles}>
        {stringValue &&
          stringValue.map((item, index) => (
            <div key={index}>
              <Circle letter={String(item.value)} state={item.state} />
            </div>
          ))}
      </div>
    </SolutionLayout>

  );
};