import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoService } from '../api/todos';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addTodo = (todo: Todo) => {
    setTodos((current) => [...current, todo]);
  };

  const editTodo = (todo: Todo) => {
    setTodos((current) => current.map((v) => (v.id === todo.id ? todo : v)));
  };

  const removeTodo = (toDoId: number) => {
    setTodos((current) => current.filter((v) => v.id !== toDoId));
  };

  useEffect(() => {
    TodoService.getTodos(userId)
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return {
    todos, addTodo, editTodo, removeTodo, isLoading,
  };
};
