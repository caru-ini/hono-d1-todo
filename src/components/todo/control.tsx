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
      <form onSubmit={onSubmit} className='flex items-center w-full'>
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
            className='flex justify-end text-muted-foreground p-1'
          >
            Options
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex gap-2 justify-evenly items-center space-x-4 mt-1 w-full'>
              <label htmlFor='editable' className='flex items-center gap-2'>
                Edit Mode
                <Switch checked={editable} onCheckedChange={() => setEditable((prev) => !prev)} />
              </label>
              <Button variant={'ghost'} className='p-1 w-8 h-8' onClick={reset}>
                <RotateCcw size={16} />
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
