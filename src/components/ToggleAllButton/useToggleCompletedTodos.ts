import { useState } from 'react';
import { TodoService } from '../../api/todos';
import { useToDoContext } from '../../context/ToDo.context';

export const useToggleCompletedTodos = () => {
  const { todos, setProcessedTodoIds } = useToDoContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const { editTodo } = useToDoContext();

  const toggleCompletedTodos = () => {
    const completedTodos = todos.filter((v) => v.completed);

    setIsProcessing(true);
    setProcessedTodoIds(completedTodos.map((v) => v.id));

    Promise.allSettled(
      completedTodos.map((v) => {
        return TodoService.editTodo({ ...v, completed: false });
      }),
    )
      .then((result) => {
        result.forEach((v) => {
          if (v.status === 'fulfilled') {
            editTodo(v.value);
          } else {
            // Here should be error case handling
          }
        });
      })
      .finally(() => {
        setProcessedTodoIds([]);
        setIsProcessing(false);
      });
  };

  return { toggleCompletedTodos, isProcessing };
};
