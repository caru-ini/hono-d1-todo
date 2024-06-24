'use client';

import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export interface TodoProps {
  text: string;
  done: boolean;
  id: number;
}

interface TodoItemProps extends TodoProps {
  setDone: (id: number, done: boolean) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  editable: boolean;
}

export const Todo = ({ text, done, id, setDone, removeTodo, editable }: TodoItemProps) => {
  return (
    <div className='flex items-center justify-between space-x-4 rounded-sm bg-secondary/50 shadow-sm'>
      <div className='flex items-center space-x-2 p-3' onClick={async () => setDone(id, !done)}>
        <Checkbox
          checked={done}
          onChange={async () => {
            setDone(id, !done);
          }}
        />
        <p className={clsx('text-lg', done && 'line-through')}>{text}</p>
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
