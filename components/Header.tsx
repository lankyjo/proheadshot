
// Fix: Use default and named import for React to resolve FC export error.
import React, { FC } from 'react';
import * as Icons from './Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isGenerating: boolean;
}

const Header: FC<HeaderProps> = ({ theme, toggleTheme, isGenerating }) => {
  return (
    <nav className="border-b border-onyx/10 dark:border-cream/10 sticky top-0 z-50 bg-cream/80 dark:bg-onyx/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-onyx dark:bg-cream rounded-full flex items-center justify-center text-cream dark:text-onyx shadow-xl">
            <Icons.Sparkles />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">ProShot</h1>
            <p className="text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase -mt-1">Studio AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            disabled={isGenerating}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-onyx/5 dark:hover:bg-cream/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;