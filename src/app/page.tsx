import { TodoList } from '@/components/todo/list';

export default function Home() {
  return (
    <main className='flex flex-col items-center w-full justify-center h-[calc(100lvh-70px)]'>
      <div className='flex flex-col items-center space-y-4 p-10'>
        <h1 className='text-4xl'>Hono + R2 Todo App</h1>
        <TodoList />
      </div>
    </main>
  );
}
