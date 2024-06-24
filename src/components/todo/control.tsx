'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

interface TodoControlProps {
  addTodo: (text: string) => void;
  reset: () => void;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
}

export const TodoControl = ({ addTodo, reset, setEditable, editable }: TodoControlProps) => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  };
  return (
    <div className='flex flex-col items-center gap-x-4 rounded-sm p-2'>
      <form onSubmit={onSubmit} className='flex w-full items-center'>
        <Input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
          className='w-full rounded-r-none'
        />
        <Button role='submit' className='rounded-l-none'>
          Add
        </Button>
      </form>
      <Accordion type={'single'} collapsible className='w-full'>
        <AccordionItem value='options'>
          <AccordionTrigger
            onClick={() => setShowOptions((prev) => !prev)}
            className='flex justify-end p-1 text-muted-foreground'
          >
            Options
          </AccordionTrigger>
          <AccordionContent>
            <div className='mt-1 flex w-full items-center justify-evenly gap-2 space-x-4'>
              <label htmlFor='editable' className='flex items-center gap-2'>
                Edit Mode
                <Switch checked={editable} onCheckedChange={() => setEditable((prev) => !prev)} />
              </label>
              <Button variant={'ghost'} className='size-8 p-1' onClick={reset}>
                <RotateCcw size={16} />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
