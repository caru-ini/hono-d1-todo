'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export interface TodoProps {
  text: string;
  done: boolean;
  id: number;
}

interface TodoItemProps extends TodoProps {
  updateTodo: (
    id: number,
    val: {
      done?: boolean;
      text?: string;
    },
  ) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  editable: boolean;
}

export const Todo = ({ text, done, id, updateTodo, removeTodo, editable }: TodoItemProps) => {
  const [newText, setNewText] = useState(text);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewText(e.target.value);
  return (
    <div className='flex items-center justify-between space-x-4 rounded-sm bg-secondary/50 shadow-sm'>
      <div
        className='flex items-center space-x-2 p-3'
        onClick={async () => {
          if (!editable) {
            await updateTodo(id, { done: !done });
          }
        }}
      >
        <Checkbox
          checked={done}
          onClick={async () => {
            await updateTodo(id, { done: !done });
          }}
        />
        {editable ? (
          <Input
            value={newText}
            onChange={handleInputChange}
            onBlur={async () => {
              await updateTodo(id, { text: newText });
            }}
          />
        ) : (
          <p className={clsx('select-none text-lg', done && 'line-through')}>{text}</p>
        )}
      </div>
      <div className='flex items-center pr-2'>
        {editable && (
          <Button
            variant='ghost'
            className='rounded-full'
            onClick={async () => await removeTodo(id)}
          >
            <Trash size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};
