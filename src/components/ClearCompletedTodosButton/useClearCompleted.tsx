import { useState } from 'react';
import { useToDoContext } from '../../context/ToDo.context';
import { TodoService } from '../../api/todos';

export const useClearCompleted = () => {
  const { todos, setProcessedTodoIds, removeTodo } = useToDoContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const clearCompleted = () => {
    const completedTodos = todos.filter((v) => v.completed);

    setIsProcessing(true);
    setProcessedTodoIds(completedTodos.map((v) => v.id));

    Promise.allSettled(
      completedTodos.map((v) => TodoService.deleteTodo(v.id)),
    )
      .then((result) => {
        result.forEach((v, index) => {
          if (v.status === 'fulfilled') {
            removeTodo(completedTodos[index].id);
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

  return { clearCompleted, isProcessing };
};
