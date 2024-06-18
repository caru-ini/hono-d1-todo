import ToggleTheme from './toggletheme';

export const Header = () => {
  return (
    <header className='sticky flex justify-between items-center p-4 backdrop-blur-xl w-full border-b-2  border-border z-50'>
      <h1 className='text-2xl'>Hono + R2 Todo App</h1>
      <div className='flex items-center space-x-4'>
        <ToggleTheme></ToggleTheme>
      </div>
    </header>
  );
};
