import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoService } from '../../api/todos';
import { useToDoContext } from '../../context/ToDo.context';

export const useTodoEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { editTodo, removeTodo } = useToDoContext();
  const saveTodo = (todo: Todo) => {
    setIsLoading(true);

    return TodoService.editTodo(todo)
      .then((newTodo) => {
        editTodo(newTodo);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteTodo = (todo: Todo) => {
    setIsLoading(true);
    TodoService.deleteTodo(todo.id)
      .then(() => {
        removeTodo(todo.id);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, saveTodo, deleteTodo };
};
