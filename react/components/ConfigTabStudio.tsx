
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
    <div className="space-y-6">
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3 text-cream">Backdrop Scene</label>
        <div className="grid grid-cols-1 gap-2">
          {Object.values(BackgroundType).map((bg) => (
            <button
              key={bg}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, backgroundType: bg })}
              className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
                ${config.backgroundType === bg 
                  ? 'bg-cream text-onyx border-cream' 
                  : 'bg-transparent border-white/10 text-cream/60 hover:border-white/30 disabled:opacity-30'}`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded-2xl space-y-4">
        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 text-cream">Tone & Hue</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, backgroundColor: c })}
              className={`w-6 h-6 rounded-full border transition-all hover:scale-110
                ${config.backgroundColor === c ? 'border-cream scale-110 shadow-lg' : 'border-white/20'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-white/10 rounded-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-cream">Noir Finish</p>
        <button
          disabled={isGenerating}
          onClick={() => setConfig({ ...config, isMonochrome: !config.isMonochrome })}
          className={`w-12 h-6 rounded-full p-1 transition-colors relative
            ${config.isMonochrome ? 'bg-cream' : 'bg-white/10'}`}
        >
          <div className={`w-4 h-4 rounded-full transition-transform
            ${config.isMonochrome ? 'translate-x-6 bg-onyx' : 'translate-x-0 bg-cream'}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default ConfigTabStudio;
