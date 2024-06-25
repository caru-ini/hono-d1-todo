import { TodoList } from '@/components/todo/list';

export default function Home() {
  return (
    <main className='flex h-[calc(100lvh-70px)] w-full flex-col items-center'>
      <div className='flex flex-col items-center space-y-4 p-10'>
        <h1 className='text-4xl'>Hono + D1 Todo App</h1>
        <TodoList />
      </div>
    </main>
  );
}
