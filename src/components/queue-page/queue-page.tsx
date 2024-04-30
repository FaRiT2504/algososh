import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Queue } from "../../utils/queue";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";

interface IQueueArray {
  value?: string;
  state: ElementStates;
  head?: string;
}

const arr = Array.from({ length: 7 }, () => ({ value: '', state: ElementStates.Default }));

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [queue] = useState(new Queue<IQueueArray>(7));
  const [arrayQueue, setArrayQueue] = useState<(IQueueArray | null)[]>(arr);
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const addValue = async () => {
    if (input !== '' && queue.getTail() < 7) {
      setIsLoading((prevState) => ({ ...prevState, add: true }));
      setInput('');
      arrayQueue[queue.getTail()] = { value: '', state: ElementStates.Changing };
      await new Promise(resolve => setTimeout(resolve, 500));
      queue.enqueue({ value: input, state: ElementStates.Default });
      setArrayQueue(queue.getElements())
      setIsLoading((prevState) => ({ ...prevState, add: false }));
    };

  };

  const deleteValue = async () => {
    setIsLoading((prevState) => ({ ...prevState, delete: true }));
    arrayQueue[queue.getHead()] = { value: arrayQueue[queue.getHead() - 1]?.value, state: ElementStates.Changing };
    await new Promise(resolve => setTimeout(resolve, 500));
    queue.dequeue();
    setArrayQueue(queue.getElements())
    setIsLoading((prevState) => ({ ...prevState, delete: false }));

    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.getLength() === 0) {
      arrayQueue[arrayQueue.length - 1] = { value: '', state: ElementStates.Default, head: 'head' };
      setArrayQueue([...arrayQueue]);
      console.log(arrayQueue);

    };
  };

  const clearQueue = async () => {
    setIsLoading((prevState) => ({ ...prevState, clear: true }));
    queue.clear();
    setArrayQueue(queue.getElements())
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading((prevState) => ({ ...prevState, clear: false }));
  };

  const head = (index: number) => {
    return index === queue.getHead() && !queue.isEmpty() ? "head" : null;
  };
  const tail = (index: number) => {
    return index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : null;
  };


  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.main}`}>
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.button}`}>
            <Input
              onChange={onChange}
              maxLength={4}
              value={input}
            />
            <Button
              text="Добавить"
              disabled={!input || isLoading.delete || isLoading.clear}
              isLoader={isLoading.add}
              onClick={addValue}
            />
            <Button
              text="Удалить"
              disabled={queue.isEmpty() || (isLoading.add || isLoading.clear)}
              isLoader={isLoading.delete}
              onClick={deleteValue}
            />
          </div>
          <Button
            text="Очистить"
            disabled={queue.isEmpty() || (isLoading.add || isLoading.delete)}
            isLoader={isLoading.clear}
            onClick={clearQueue}
          />
        </div>

        <div className={styles.circles}>
          {arrayQueue &&
            arrayQueue.map((item, index) => (

              <Circle
                key={index}
                letter={item?.value}
                state={item?.state}
                index={index}
                head={head(index)}
                tail={tail(index)}
              />

            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};