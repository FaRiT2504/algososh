import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';
const renderer = require('react-test-renderer');

describe('Тест  компонента Button', () => {
  it('Тест кнопки с текстом', () => {
    const tree = renderer
      .create(<Button text='Текст' />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест кнопки без текста', () => {
    const tree = renderer
      .create(<Button text='' />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест заблокированной кнопки', () => {
    const tree = renderer
      .create(<Button disabled={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Тест кнопки с индикацией загрузки', () => {
    const tree = renderer
      .create(<Button disabled={false} isLoader={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Колбэк вызывается корректно при нажатии на кнопку', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled();;
  });
});