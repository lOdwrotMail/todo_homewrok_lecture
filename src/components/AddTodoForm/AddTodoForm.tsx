import React, { useState } from 'react';
import { useAddTodo } from './useAddTodo';

export const AddTodoForm = () => {
  const { addTodo } = useAddTodo();
  const [toDoName, setToDoName] = useState('');

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
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
