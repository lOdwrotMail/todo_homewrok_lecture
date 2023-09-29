import cn from 'classnames';
import { useToggleCompletedTodos } from './useToggleCompletedTodos';
import { useToDoContext } from '../../context/ToDo.context';

export const ToggleAllButton = () => {
  const { toggleCompletedTodos, isProcessing } = useToggleCompletedTodos();
  const { todos } = useToDoContext();
  const allTodosCompleted = todos.every((v) => v.completed);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={toggleCompletedTodos}
      type="button"
      disabled={isProcessing}
      className={cn('todoapp__toggle-all', {
        active: allTodosCompleted && !isProcessing,
      })}
      data-cy="ToggleAllButton"
    />
  );
};
