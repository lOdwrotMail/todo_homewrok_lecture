import { useToDoContext } from '../../context/ToDo.context';
import { Todo } from '../../types/Todo';

export const useAddTodo = () => {
  const { addTodo: addTodoLocally, userId } = useToDoContext();
  const addTodo = (toDo: Omit<Todo, 'id' | 'userId'>) => {
    addTodoLocally({ ...toDo, userId, id: Math.ceil(Math.random() * 10000) });
  };

  return { addTodo };
};
