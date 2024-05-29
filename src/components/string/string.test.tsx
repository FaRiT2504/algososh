import { reverseText } from "../../utils/string";
import { ElementStates } from "../../types/element-states";

describe("Тест алгоритма разворачивания строки", () => {
  const setArray = jest.fn()
  it('Строка с чётным количеством символов', async () => {
    const string = 'abcd';
    const stringRevers = 'dcba';
    const stringArray = string.trim().split("").map((value) => ({ value, state: ElementStates.Default }));
    const reversedArray = stringRevers.trim().split("").map((value) => ({ value, state: ElementStates.Modified }));
    await reverseText(stringArray, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArray)
  })
  it('Строка с нечетным количеством символов', async () => {
    const string = 'abcde';
    const stringRevers = 'edcba';
    const reversedArray = stringRevers.trim().split("").map((value) => ({ value, state: ElementStates.Modified }));
    const stringArray = string.trim().split("").map((value) => ({ value, state: ElementStates.Default }));
    await reverseText(stringArray, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArray)
  })
  it('Строка с одним символом', async () => {
    const string = '1';
    const stringRevers = '1';
    const reversedArray = stringRevers.trim().split("").map((value) => ({ value, state: ElementStates.Modified }));
    const stringArray = string.trim().split("").map((value) => ({ value, state: ElementStates.Default }));
    await reverseText(stringArray, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArray)
  })
  it('Пустая строка', async () => {
    const string = '';
    const stringArray = string.trim().split("").map((value) => ({ value, state: ElementStates.Default }));
    await reverseText(stringArray, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })


});