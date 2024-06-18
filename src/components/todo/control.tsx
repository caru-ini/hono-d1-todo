'use client';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TodoControlProps {
  addTodo: (text: string) => void;
  reset: () => void;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoControl = ({ addTodo, reset, setEditable }: TodoControlProps) => {
  const [newTodo, setNewTodo] = useState<string>('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  };
  return (
    <div className='flex items-center space-x-4 bg-secondary rounded-sm p-2 shadow-sm'>
      <form onSubmit={onSubmit} className='flex items-center space-x-2 w-full'>
        <Input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
          className='w-full'
        />
        <Button role='submit'>Add</Button>
      </form>
      <Button variant={'destructive'} onClick={reset}>
        Reset
      </Button>
      <Button variant={'default'} onClick={() => setEditable((prev) => !prev)}>
        <Pencil size={24} />
      </Button>
    </div>
  );
};
