import { useState } from 'react';
import { useAddTodo } from './useAddTodo';
import { ToggleAllButton } from '../ToggleAllButton/ToggleAllButton';

export const AddTodoForm = () => {
  const { addTodo } = useAddTodo();
  const [toDoName, setToDoName] = useState('');

  return (
    <header className="todoapp__header">
      <ToggleAllButton />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!toDoName) {
            return;
          }

          addTodo({
            completed: false,
            title: toDoName,
          });
          setToDoName('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={toDoName}
          onChange={(e) => {
            setToDoName(e.target.value);
          }}
        />
      </form>
    </header>
  );
};
