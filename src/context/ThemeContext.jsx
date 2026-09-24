import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fanhub_theme') || 'dark';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fanhub_fontsize') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('fanhub_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fanhub_fontsize', fontSize);
    const root = document.documentElement;
    root.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeFontSize = (newSize) => {
    if (['small', 'normal', 'large'].includes(newSize)) {
      setFontSize(newSize);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontSize, changeFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
