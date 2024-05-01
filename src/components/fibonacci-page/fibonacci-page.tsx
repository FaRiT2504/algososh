import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from './fibonacci-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([])
  const [isLoading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const makeFibonacciArray = async (num: number) => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < num + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const fibonacciDelay = async (num: number, setFibonacciArray: React.Dispatch<React.SetStateAction<number[]>>) => {
    const arr = await makeFibonacciArray(num);
    for (let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibonacciArray(arr.slice(0, i + 1));
    }
  }

  const onSubmit = async (e: FormEvent) => {
    if (!input) return;
    setLoading(true);
    e.preventDefault();
    const number = Number(input)
    await fibonacciDelay(number, setFibonacciArray);
    setLoading(false);
  };


  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="number"
          placeholder="Введите число"
          onChange={onChange}
          value={input}
          maxLength={2}
          max={19}
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button
          text="Рассчитать"
          isLoader={isLoading}
          type="submit"
          disabled={input.length > 0 && Number(input) < 20 ? false : true}
        />
      </form>

      <ul className={styles.circles}>
        {
          fibonacciArray.map((number, index) => {
            return <Circle key={index} letter={String(number)} index={index} />
          })
        }
      </ul>

    </SolutionLayout>
  );
};
