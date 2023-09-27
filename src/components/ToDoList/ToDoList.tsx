import React from 'react';
import { useToDoContext } from '../../context/ToDo.context';
import { ToDoRow } from './ToDoRow';
import { Todo } from '../../types/Todo';

export const ToDoList = () => {
  const { todos, temporaryTodo } = useToDoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map((todo) => (
        <ToDoRow key={todo.id} todo={todo} />
      ))}
      {temporaryTodo && <ToDoRow todo={temporaryTodo as Todo} isDisabled />}
    </section>
  );
};
