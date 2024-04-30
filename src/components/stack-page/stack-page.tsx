import React, { useState, ChangeEvent, useEffect, FormHTMLAttributes } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "../../utils/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export interface IStackArray {
  letter: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<IStackArray>())
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const pushItem = async () => {
    setIsLoading((prevState) => ({ ...prevState, add: true }));
    stack.push({ letter: input, state: ElementStates.Changing })
    setInput('');
    await new Promise(resolve => setTimeout(resolve, 500));
    stack.peak().state = ElementStates.Default;
    setIsLoading((prevState) => ({ ...prevState, add: false }));
  }

  const deleteItem = async () => {
    setIsLoading((prevState) => ({ ...prevState, delete: true }));
    stack.peak().state = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, 500));
    stack.pop()
    setIsLoading((prevState) => ({ ...prevState, delete: false }));
  }

  const clearStack = async () => {
    setIsLoading((prevState) => ({ ...prevState, clear: true }));
    stack.clear();
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading((prevState) => ({ ...prevState, clear: false }));
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <Input type="text"
            maxLength={4}
            extraClass={styles.input}
            onChange={onChange}
            value={input}
          />
          <Button text="Добавить"
            onClick={() => pushItem()}
            isLoader={isLoading.add}
            disabled={!input || isLoading.delete || isLoading.clear}
          />
          <Button text="Удалить"
            onClick={() => deleteItem()}
            isLoader={isLoading.delete}
            disabled={isLoading.add || isLoading.clear}
          />
          <Button text="Очистить"
            extraClass={`ml-35`}
            isLoader={isLoading.clear}
            onClick={() => clearStack()}
            disabled={isLoading.add || isLoading.delete}
          />
        </div>
        <div className={`${styles.circles}`}>
          {stack.getStack().map((item, index) =>
            <Circle key={index} index={index} letter={item.letter} state={item.state} head={index === stack.getSize() - 1 ? 'top' : ''} />
          )};
        </div>
      </div>
    </SolutionLayout>
  );
};
