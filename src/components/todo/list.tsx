'use client';
import useTodos from '@/hooks/useTodos';
import { TodoControl } from './control';
import { Todo } from './todo';

export const TodoList = () => {
  const { todos, editable, setEditable, addTodo, setDone, removeTodo, reset } = useTodos();

  return (
    <div className='flex max-h-[800px] min-w-[30vw] flex-col gap-2 overflow-y-auto rounded-xl border border-border p-5 shadow-md'>
      <TodoControl addTodo={addTodo} reset={reset} setEditable={setEditable} editable={editable} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          setDone={setDone}
          removeTodo={removeTodo}
          editable={editable}
        />
      ))}
    </div>
  );
};
