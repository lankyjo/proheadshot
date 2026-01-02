
// Fix: Use named imports for React FC to avoid property access errors.
import { FC } from 'react';
import * as Icons from './Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isGenerating: boolean;
}

const Header: FC<HeaderProps> = ({ theme, toggleTheme, isGenerating }) => {
  return (
    <nav className="border-b border-white/10 sticky top-0 z-50 bg-onyx/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-onyx shadow-xl">
            <Icons.Sparkles />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-cream">ProShot</h1>
            <p className="text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase -mt-1 text-cream">Studio AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            disabled={isGenerating}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all disabled:opacity-30"
          >
            {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
