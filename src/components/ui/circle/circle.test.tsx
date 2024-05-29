import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const renderer = require('react-test-renderer');

describe("Тест компонента Circle", () => {

  it('Тест компонента Circle без буквы', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с буквами', () => {
    const tree = renderer.create(<Circle letter='A' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с head', () => {
    const tree = renderer.create(<Circle head='head' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с react-элементом в head', () => {
    const tree = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с tail', () => {
    const tree = renderer.create(<Circle tail='tail' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с react-элементом в tail', () => {
    const tree = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Тест компонента Circle с index', () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle с пропcом isSmall === true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест компонента Circle в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

})