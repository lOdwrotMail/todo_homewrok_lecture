import React, { useContext } from 'react';
import { useTodos } from './useTodos';

type TodoContextValues = Omit<ReturnType<typeof useTodos>, 'isLoading'> & {
  userId: number;
};

const TodoContext = React.createContext<TodoContextValues | undefined>(
  undefined,
);

type TodosProviderProps = {
  children: React.ReactNode;
  userId: number;
};

export const TodosProvider = ({ children, userId }: TodosProviderProps) => {
  const { isLoading, ...rest } = useTodos(userId);

  if (isLoading) {
    return <div>Loadding...</div>;
  }

  return (
    <TodoContext.Provider value={{ ...rest, userId }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useToDoContext = () => {
  const values = useContext(TodoContext);

  if (!values) {
    throw new Error('TodoContext can be used only in TodosProvider');
  }

  return values;
};
