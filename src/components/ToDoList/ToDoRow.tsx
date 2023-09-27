import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useTodoEdit } from './useTodoEdit';

type ToDoRowProps = {
  todo: Todo;
  isDisabled?: boolean;
};

export const ToDoRow = ({ todo, isDisabled }: ToDoRowProps) => {
  const { isLoading, saveTodo, deleteTodo } = useTodoEdit();
  const [isEdited, setIsEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => saveTodo({ ...todo, completed: !todo.completed })}
        />
      </label>
      {isEdited && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveTodo({ ...todo, title: editedTitle }).then(() => {
              setEditedTitle('');
              setIsEdited(false);
            });
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </form>
      )}
      {!isEdited && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEdited(true);
              setEditedTitle(todo.title);
            }}
          >
            {editedTitle || todo.title}
          </span>
          {
            !isLoading && !isDisabled
            && (
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo)}
              >
                ×
              </button>
            )
          }
        </>
      )}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isLoading || isDisabled,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
