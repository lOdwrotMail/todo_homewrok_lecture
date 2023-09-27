import { TodoService } from '../../api/todos';
import { useToDoContext } from '../../context/ToDo.context';
import { Todo } from '../../types/Todo';

export const useAddTodo = () => {
  const {
    addTodo: addTodoLocally,
    userId,
    setTemporaryTodo,
  } = useToDoContext();

  const addTodo = (toDo: Omit<Todo, 'id' | 'userId'>) => {
    const todoToSave = { ...toDo, userId };

    setTemporaryTodo(todoToSave);
    TodoService.addTodo(todoToSave)
      .then(addTodoLocally)
      .finally(() => setTemporaryTodo(null));
  };

  return { addTodo };
};
