import React, { useState, ChangeEvent } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "../../utils/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export interface IStackArray {
  value: string;
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
    stack.push({ value: input, state: ElementStates.Changing })
    setInput('');
    await delay(SHORT_DELAY_IN_MS);
    stack.peak().state = ElementStates.Default;
    setIsLoading((prevState) => ({ ...prevState, add: false }));
  }

  const deleteItem = async () => {
    setIsLoading((prevState) => ({ ...prevState, delete: true }));
    stack.peak().state = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    stack.pop()
    setIsLoading((prevState) => ({ ...prevState, delete: false }));
  }

  const clearStack = async () => {
    setIsLoading((prevState) => ({ ...prevState, clear: true }));
    stack.clear();
    await delay(SHORT_DELAY_IN_MS);
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
            disabled={stack.getSize() === 0 || (isLoading.add || isLoading.clear)}

          />
          <Button text="Очистить"
            extraClass={`ml-35`}
            isLoader={isLoading.clear}
            onClick={() => clearStack()}
            disabled={stack.getSize() === 0 || (isLoading.add || isLoading.delete)}
          />
        </div>
        <div className={`${styles.circles}`}>
          {stack.getStack().map((item, index) =>
            <Circle key={index} index={index} letter={item.value} state={item.state} head={index === stack.getSize() - 1 ? 'top' : ''} />
          )};
        </div>
      </div>
    </SolutionLayout>
  );
};
