import { TodoProps } from '@/components/todo/todo';
import { client } from '@/lib/hono';
import { useEffect, useState } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const [editable, setEditable] = useState<boolean>(false);

  const fetchTodos = async () => {
    const res = await client.api.todos.$get();
    setTodos((await res.json()) as TodoProps[]);
  };

  const addTodo = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed.length) return;
    await client.api.todos.$post({ json: { text: trimmed } });
    fetchTodos();
  };

  const setDone = async (id: number, done: boolean) => {
    // @ts-ignore
    await client.api.todos[':id'].$put({ param: { id: id.toString() }, json: { done } });
    fetchTodos();
  };

  const removeTodo = async (id: number) => {
    await client.api.todos[':id'].$delete({ param: { id: id.toString() } });
    fetchTodos();
  };

  const reset = () => {
    for (const todo of todos) {
      removeTodo(todo.id);
    }
    setTodos([]);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    editable,
    setEditable,
    addTodo,
    setDone,
    removeTodo,
    reset,
  };
};

export default useTodos;
