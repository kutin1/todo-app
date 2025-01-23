import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskInput from './TaskInput';

test('добавление новой задачи', () => {
  const addTask = jest.fn();
  const { getByPlaceholderText, getByText } = render(<TaskInput addTask={addTask} />);
  
  const input = getByPlaceholderText('Добавить новую задачу');
  const button = getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(button);

  expect(addTask).toHaveBeenCalledWith('Новая задача');
  expect(input).toHaveValue('');
});
