import { bubbleSort, selectionSort } from "../../utils/sorting-page";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const array = [8, 3, 7, 4, 6, 1].map((value) => ({ value, state: ElementStates.Default }));
const arrayAscend = [1, 3, 4, 6, 7, 8].map((value) => ({ value, state: ElementStates.Modified }))
const arrayDescend = [8, 7, 6, 4, 3, 1].map((value) => ({ value, state: ElementStates.Modified }))
const setArray = jest.fn();
jest.setTimeout(20000);

describe('Алгоритмы сортировки', () => {
  it('Сортировка пузырьком, пустой массив', async () => {
    await bubbleSort([], Direction.Ascending, setArray);
    expect(setArray).toBeCalledTimes(0)
  })
  it('Сортировка пузырьком, по возрастанию', async () => {
    await bubbleSort(array, Direction.Ascending, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayAscend)
  })
  it('Сортировка пузырьком, по убыванию', async () => {
    await bubbleSort(array, Direction.Descending, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayDescend)
  })

  it("Сортировка пузырьком, массив из одного элемента", async () => {
    const reverse = await bubbleSort(
      [{ value: 4, state: ElementStates.Default },],
      Direction.Ascending,
      setArray
    );
    expect(reverse).toEqual([{ value: 4, state: ElementStates.Modified },]);
  });
  it('Сортировка выбором, пустой массив', async () => {
    await selectionSort([{ value: 0, state: ElementStates.Modified },], Direction.Ascending, setArray);
    expect(setArray).toBeCalledTimes(0)
  })
  it('Сортировка выбором, по возрастанию', async () => {
    await selectionSort(array, Direction.Ascending, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayAscend)
  })
  it('Сортировка выбором, по убыванию', async () => {
    await selectionSort(array, Direction.Descending, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayDescend)
  })
  it('Сортировка выбором, массив из одного элемента', async () => {
    await selectionSort([{ value: 1, state: ElementStates.Modified }], Direction.Ascending, setArray);
    expect(setArray).toBeCalledTimes(0)
  })
})