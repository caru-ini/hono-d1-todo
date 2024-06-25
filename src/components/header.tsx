import ToggleTheme from './toggletheme';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 flex h-[70px] w-full items-center justify-between border-b-2  border-border p-4 backdrop-blur-xl'>
      <h1 className='text-2xl'>Hono + D1 Todo App</h1>
      <div className='flex items-center space-x-4'>
        <ToggleTheme />
      </div>
    </header>
  );
};
