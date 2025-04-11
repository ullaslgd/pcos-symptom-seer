
import React, { useEffect } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Toggle 
      aria-label="Toggle dark mode"
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className="rounded-full w-10 h-10 p-0"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Toggle>
  );
};

export default ThemeToggle;
