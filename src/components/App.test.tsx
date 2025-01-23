import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('добавление и удаление задачи', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText('Добавить новую задачу');
  const addButton = screen.getByText('Добавить');

  // Добавление задачи
  fireEvent.change(input, { target: { value: 'Тестовая задача' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  
  // Переключение состояния задачи
  const checkbox = screen.getByLabelText('Тестовая задача');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByText('Тестовая задача')).toHaveStyle('text-decoration: line-through');
  
  // Удаление задачи
  const deleteButton = screen.getByText('Удалить');
  fireEvent.click(deleteButton);
  expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
});

test('фильтрация задач', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Добавить новую задачу');
  const addButton = screen.getByText('Добавить');

  // Добавление нескольких задач
  fireEvent.change(input, { target: { value: 'Тестовая задача 1' } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: 'Тестовая задача 2' } });
  fireEvent.click(addButton);

  // Переключение состояния одной задачи
  const checkbox1 = screen.getByLabelText('Тестовая задача 1');
  fireEvent.click(checkbox1);
  
  expect(screen.getByText('Тестовая задача 1')).toHaveStyle('text-decoration: line-through');
  expect(screen.getByText('Тестовая задача 2')).not.toHaveStyle('text-decoration: line-through');

  // Проверка фильтрации активных и выполненных задач
  expect(screen.getByText('Тестовая задача 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Clear completed'));
  expect(screen.queryByText('Тестовая задача 1')).not.toBeInTheDocument();
});
