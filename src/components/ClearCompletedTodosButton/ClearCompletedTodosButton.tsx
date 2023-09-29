import { useClearCompleted } from './useClearCompleted';

export const ClearCompletedTodosButton = () => {
  const { isProcessing, clearCompleted } = useClearCompleted();

  return (
    <button
      disabled={isProcessing}
      type="button"
      onClick={clearCompleted}
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  );
};
