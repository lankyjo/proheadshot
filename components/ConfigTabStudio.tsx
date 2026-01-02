
// Fix: Use named imports for React FC to avoid property access errors.
import { FC } from 'react';
import { BackgroundType, HeadshotConfig } from '../types';
import { COLORS } from '../constants';

interface ConfigTabStudioProps {
  config: HeadshotConfig;
  setConfig: (config: HeadshotConfig) => void;
  isGenerating: boolean;
}

const ConfigTabStudio: FC<ConfigTabStudioProps> = ({ config, setConfig, isGenerating }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Environment */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3">Backdrop Scene</label>
        <div className="grid grid-cols-1 gap-2">
          {Object.values(BackgroundType).map((bg) => (
            <button
              key={bg}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, backgroundType: bg })}
              className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                ${config.backgroundType === bg 
                  ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream' 
                  : 'bg-transparent border-onyx/10 dark:border-cream/10 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop Color */}
      {(config.backgroundType === BackgroundType.STUDIO || config.backgroundType === BackgroundType.PLAIN) && (
        <div className="p-4 bg-onyx/5 dark:bg-cream/5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Tone & Hue</p>
            <div className="relative group flex items-center gap-2">
              <label className="text-[8px] font-bold uppercase opacity-30">Custom</label>
              <div className="w-6 h-6 rounded-full border border-onyx/20 dark:border-cream/20 relative overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-transform bg-white">
                <input 
                  type="color" 
                  disabled={isGenerating}
                  value={config.backgroundColor}
                  onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                  className="absolute w-20 h-20 -top-5 -left-5 cursor-pointer opacity-0"
                />
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.backgroundColor }} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                disabled={isGenerating}
                onClick={() => setConfig({ ...config, backgroundColor: c })}
                className={`w-6 h-6 rounded-full border transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed
                  ${config.backgroundColor === c ? 'border-onyx dark:border-cream scale-110 shadow-lg' : 'border-white/20'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Monochrome Toggle */}
      <div className="flex items-center justify-between p-4 border border-onyx/10 dark:border-cream/10 rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest">Noir Finish</p>
        <button
          disabled={isGenerating}
          onClick={() => setConfig({ ...config, isMonochrome: !config.isMonochrome })}
          className={`w-12 h-6 rounded-full p-1 transition-colors relative disabled:opacity-30 disabled:cursor-not-allowed
            ${config.isMonochrome ? 'bg-onyx dark:bg-cream' : 'bg-onyx/10 dark:bg-cream/10'}`}
        >
          <div className={`w-4 h-4 rounded-full transition-transform
            ${config.isMonochrome ? 'translate-x-6 bg-cream dark:bg-onyx' : 'translate-x-0 bg-onyx dark:bg-cream'}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default ConfigTabStudio;
