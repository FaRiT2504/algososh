import React from "react";
import { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { randomArray } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "../../utils/list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";

const list = new LinkedList(randomArray(1, 6));

export const ListPage: React.FC = () => {
  const [array, setArray] = useState(list.toArray());
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [deleteWithIndexTail, setDeleteWithIndexTail] = useState(false);
  const [addWithIndexHead, setAddWithIndexHead] = useState(false);
  const [IsLoading, setIsLoading] = useState({
    addToHead: false,
    addToTail: false,
    addWithIndex: false,
    deleteHead: false,
    deleteWithIndex: false,
    deleteTail: false,
  });


  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  const addToHead = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    if (inputValue && list.size < 6) {
      setIsLoading({ ...IsLoading, addToHead: true });
      setInputValue('');
      list.prepend({
        value: +inputValue,
        state: ElementStates.Default
      })
      array[0]!.small = {
        value: inputValue,
        type: 'top'
      };
      await new Promise(resolve => setTimeout(resolve, 1000));
      array[0]!.small = undefined;
      setIsLoading({ ...IsLoading, addToHead: false });
      list.toArray()[0]!.state = ElementStates.Modified;
      setArray(list.toArray());
      await new Promise(resolve => setTimeout(resolve, 1000));
      list.toArray()[0]!.state = ElementStates.Default;
      setArray(list.toArray());
    }
  }

  const addToTail = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    if (inputValue && list.size < 6) {
      setIsLoading({ ...IsLoading, addToTail: true });
      setInputValue('');
      list.append({
        value: +inputValue,
        state: ElementStates.Default
      })
      array[array.length - 1]!.small = {
        value: inputValue,
        type: 'top'
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      array[array.length - 1]!.small = undefined;
      setIsLoading({ ...IsLoading, addToTail: false });
      list.toArray()[list.toArray().length - 1]!.state = ElementStates.Modified;
      setArray(list.toArray());
      await new Promise(resolve => setTimeout(resolve, 500));
      list.toArray()[list.toArray().length - 1]!.state = ElementStates.Default;
      setArray(list.toArray());
    }

  }

  const deleteHead = async () => {
    setIsLoading({ ...IsLoading, deleteHead: true });
    list.deleteHead();
    array[0]!.stringValue = " ";

    array[0]!.small = {
      value: String(array[0]?.value),
      type: 'bottom'
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    array[0]!.small = undefined;
    setArray(list.toArray());
    setIsLoading({ ...IsLoading, deleteHead: false });
  }

  const deleteTail = async () => {
    setIsLoading({ ...IsLoading, deleteTail: true });
    list.deleteTail();
    array[array.length - 1]!.stringValue = " ";
    array[array.length - 1]!.small = {
      value: String(array[0]?.value),
      type: 'bottom'
    };
    await new Promise(resolve => setTimeout(resolve, 500));
    array[array.length - 1]!.small = undefined;
    setArray(list.toArray());
    setIsLoading({ ...IsLoading, deleteTail: false });
  }

  const addWithIndex = async () => {
    if (isNaN(Number(inputValue))) {
      return null;
    }
    setIsLoading({ ...IsLoading, addWithIndex: true });
    setAddWithIndexHead(true);
    setInputValue('');
    setInputIndex('');

    list.getByIndex({
      value: +inputValue,
      state: ElementStates.Default
    }, +inputIndex);

    for (let i = 0; i <= +inputIndex; i++) {
      array[i]!.small = {
        value: inputValue,
        type: 'top',
      };
      array[i]!.state = ElementStates.Changing;
      await new Promise(resolve => setTimeout(resolve, 500));
      if (i > 0) {
        array[i - 1]!.small = undefined;
        setAddWithIndexHead(false);
      }
      setArray([...array]);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    array[+inputIndex]!.small = undefined;
    array[+inputIndex]!.state = ElementStates.Default;
    list.toArray().forEach((item) => item!.state = ElementStates.Default)

    array.splice(+inputIndex, 0, {
      value: +inputValue,
      state: ElementStates.Modified,
      small: undefined,
    })
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, 500));

    setArray(list.toArray());
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading({ ...IsLoading, addWithIndex: false });
  }

  const delWithIndex = async () => {
    setIsLoading({ ...IsLoading, deleteWithIndex: true });
    setInputValue('');
    setInputIndex('');

    list.deleteByIndex(+inputIndex);
    for (let i = 0; i <= +inputIndex; i++) {
      array[i]!.state = ElementStates.Changing;
      setArray([...array]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (+inputIndex === array.length - 1) {
      setDeleteWithIndexTail(true);
    }

    list.toArray().forEach((item) => item!.state = ElementStates.Default);

    array[+inputIndex]!.stringValue = " ";
    array[+inputIndex]!.state = ElementStates.Default;
    array[+inputIndex]!.small = {
      value: `${array[+inputIndex]!.value}`,
      type: "bottom"
    }
    setArray([...array]);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(list.toArray());
    setArray(list.toArray());
    setDeleteWithIndexTail(false);
    setIsLoading({ ...IsLoading, deleteWithIndex: false });
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.main}`}>
        <div className={`${styles.wrapper}`} >
          <Input
            extraClass={`${styles.input}`}
            onChange={onChangeValue}
            maxLength={4}
            value={inputValue}
            placeholder="Введите значение"
          />
          <Button
            isLoader={IsLoading.addToHead}
            text="Добавить в head"
            onClick={addToHead}
            disabled={!inputValue}
          />
          <Button
            isLoader={IsLoading.addToTail}
            text="Добавить в tail"
            onClick={addToTail}
            disabled={!inputValue}
          />
          <Button
            isLoader={IsLoading.deleteHead}
            text="Удалить из head"
            onClick={deleteHead}
            disabled={(list.getSize() === 0)}
          />
          <Button
            isLoader={IsLoading.deleteTail}
            text="Удалить из tail"
            onClick={deleteTail}
            disabled={(list.getSize() === 0)}
          />
        </div>
        <div className={`${styles.wrapper}`}>
          <Input
            extraClass={`${styles.input}`}
            type="number"
            onChange={onChangeIndex}
            maxLength={4}
            value={inputIndex}
            placeholder="Введите индекс"
          />
          <Button
            isLoader={IsLoading.addWithIndex}
            text="Добавить по индексу"
            extraClass={`${styles.button}`}
            onClick={addWithIndex}
            disabled={!inputIndex || !inputValue || (+inputIndex > list.getSize()) || (+inputIndex === list.getSize()) || (list.getSize() === 0)}
          />
          <Button
            isLoader={IsLoading.deleteWithIndex}
            text="Удалить по индексу"
            extraClass={`${styles.button}`}
            onClick={delWithIndex}
            disabled={!inputIndex || (+inputIndex > list.getSize()) || (+inputIndex === list.getSize()) || list.getSize() !== 0}
          />
        </div>
        <div className={`${styles.circles}`}>
          {array.map((item, index, arr) => (
            <div className={`${styles.item}`}>
              <Circle
                key={index}
                index={index}
                letter={!(item!.stringValue) ? `${item?.value}` : item?.stringValue}
                head={index === 0 && !IsLoading.addToHead && !addWithIndexHead ? 'head' : ''}
                tail={index === array.length - 1 && !IsLoading.deleteTail && !deleteWithIndexTail ? 'tail' : ''}
                state={!item ? ElementStates.Default : item.state}
              />
              {arr.length - 1 !== index ?
                (
                  <ArrowIcon />)
                : null}

              {item?.small && (
                <Circle
                  extraClass={item.small.type === 'top'
                    ? styles.top
                    : styles.bottom}
                  letter={item.small.value}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              )}
            </div>

          ))}
        </div>
      </div>

    </SolutionLayout>
  );
};