
// Fix: Use named imports for React FC to avoid property access errors.
import { FC } from 'react';
import { TemplateType, ExpressionType, GlassesType, HeadshotConfig } from '../types';
import * as Icons from './Icons';
import { GlassesIcons } from '../constants';

interface ConfigTabIdentityProps {
  config: HeadshotConfig;
  setConfig: (config: HeadshotConfig) => void;
  isGenerating: boolean;
}

const ConfigTabIdentity: FC<ConfigTabIdentityProps> = ({ config, setConfig, isGenerating }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Pose Selection */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3">Portrait Template</label>
        <div className="space-y-2">
          {Object.values(TemplateType).map((t) => (
            <button
              key={t}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, template: t })}
              className={`w-full p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-between
                ${config.template === t 
                  ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream' 
                  : 'bg-transparent border-onyx/10 dark:border-cream/10 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
            >
              {t}
              {config.template === t && <Icons.Check />}
            </button>
          ))}
        </div>
      </div>

      {/* Expression */}
      <div className="grid grid-cols-2 gap-2">
        {[ExpressionType.SMILE, ExpressionType.NEUTRAL].map((exp) => (
          <button
            key={exp}
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, expression: exp })}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
              ${config.expression === exp 
                ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream' 
                : 'bg-transparent border-onyx/10 dark:border-cream/10 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
          >
            {exp}
          </button>
        ))}
      </div>

      {/* Tie Selection */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3">Formal Attire</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, hasTie: true })}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
              ${config.hasTie 
                ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream shadow-md' 
                : 'bg-transparent border-onyx/10 dark:border-cream/10 text-onyx/40 dark:text-cream/40 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
          >
            <Icons.Tie />
            <span className="text-[7px] font-bold uppercase tracking-widest">Formal Tie</span>
          </button>
          <button
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, hasTie: false })}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
              ${!config.hasTie 
                ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream shadow-md' 
                : 'bg-transparent border-onyx/10 dark:border-cream/10 text-onyx/40 dark:text-cream/40 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
          >
            <Icons.NoTie />
            <span className="text-[7px] font-bold uppercase tracking-widest">No Tie</span>
          </button>
        </div>
      </div>

      {/* Eyewear */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3">Eyewear Selection</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(GlassesType).map((g) => (
            <button
              key={g}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, glasses: g })}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all group
                ${config.glasses === g 
                  ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx border-onyx dark:border-cream shadow-md' 
                  : 'bg-transparent border-onyx/10 dark:border-cream/10 text-onyx/40 dark:text-cream/40 hover:border-onyx/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
            >
              <div className="scale-50 group-hover:scale-75 transition-transform">
                {GlassesIcons[g]}
              </div>
              <span className="text-[7px] font-bold uppercase text-center leading-tight tracking-tighter">
                {g === GlassesType.NONE ? 'None' : g.split(' ')[1]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigTabIdentity;
