'use client';

import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export interface TodoProps {
  text: string;
  completed: boolean;
  id: string;
}

interface TodoItemProps extends TodoProps {
  setCompleted: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
  editable: boolean;
}

export const Todo = ({
  text,
  completed,
  id,
  setCompleted,
  removeTodo,
  editable,
}: TodoItemProps) => {
  return (
    <div className='flex items-center justify-between space-x-4 rounded-sm bg-secondary/50 shadow-sm'>
      <div className='flex items-center space-x-2 p-3' onClick={() => setCompleted(id, !completed)}>
        <Checkbox
          checked={completed}
          onClick={() => {
            setCompleted(id, !completed);
          }}
        />
        <p className='text-lg'>{text}</p>
      </div>
      <div className='flex items-center pr-2'>
        {editable && (
          <Button variant='ghost' className='rounded-full' onClick={() => removeTodo(id)}>
            <Trash size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};
