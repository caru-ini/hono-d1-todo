'use client';
import { useState } from 'react';
import { ulid } from 'ulid';
import { TodoControl } from './control';
import { Todo, TodoProps } from './todo';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoProps[]>([
    { text: 'Learn Next.js', completed: false, id: ulid() },
    { text: 'Learn Tailwind CSS', completed: false, id: ulid() },
    { text: 'Build a Todo App', completed: false, id: ulid() },
  ]);

  const [editable, setEditable] = useState<boolean>(false);

  const addTodo = (text: string) => {
    if (!text) return;
    setTodos((prev) => [...prev, { text, completed: false, id: ulid() }]);
  };

  const setCompleted = (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      }),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const reset = () => {
    setTodos([]);
  };

  return (
    <div className='flex flex-col border border-border rounded-xl p-5 gap-2 shadow-md min-w-[30vw] max-h-[800px] overflow-y-auto'>
      <TodoControl addTodo={addTodo} reset={reset} setEditable={setEditable} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          setCompleted={setCompleted}
          removeTodo={removeTodo}
          editable={editable}
        />
      ))}
    </div>
  );
};
