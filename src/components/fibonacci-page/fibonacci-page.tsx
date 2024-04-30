import React, { useState, ChangeEvent, useCallback, FormEvent } from "react";
import styles from './fibonacci-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

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

  const delay = async (num: number, setFibonacciArray: React.Dispatch<React.SetStateAction<number[]>>) => {
    const arr = await makeFibonacciArray(num);
    for (let i = 0; i < arr.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFibonacciArray(arr.slice(0, i + 1));
    }
  }

  const onSubmit = async (e: FormEvent) => {
    if (!input) return;
    setLoading(true);
    e.preventDefault();
    const number = Number(input)
    await delay(number, setFibonacciArray);
    setLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <form className={styles.form} onSubmit={onSubmit}>
        <Input type="number"
          placeholder="Введите число"
          onChange={onChange}
          value={input}
          max={19}
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button text="Рассчитать"
          isLoader={isLoading}
          disabled={!input}
          type="submit"
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
