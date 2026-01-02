
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
    <div className="space-y-6">
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3 text-cream">Portrait Template</label>
        <div className="space-y-2">
          {Object.values(TemplateType).map((t) => (
            <button
              key={t}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, template: t })}
              className={`w-full p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-between
                ${config.template === t 
                  ? 'bg-cream text-onyx border-cream' 
                  : 'bg-transparent border-white/10 text-cream/60 hover:border-white/30 disabled:opacity-30'}`}
            >
              {t}
              {config.template === t && <Icons.Check />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[ExpressionType.SMILE, ExpressionType.NEUTRAL].map((exp) => (
          <button
            key={exp}
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, expression: exp })}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
              ${config.expression === exp 
                ? 'bg-cream text-onyx border-cream' 
                : 'bg-transparent border-white/10 text-cream/60 hover:border-white/30 disabled:opacity-30'}`}
          >
            {exp}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
          <button
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, hasTie: true })}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
              ${config.hasTie 
                ? 'bg-cream text-onyx border-cream' 
                : 'bg-transparent border-white/10 text-cream/40 hover:border-white/30'}`}
          >
            <Icons.Tie />
            <span className="text-[7px] font-bold uppercase">Tie</span>
          </button>
          <button
            disabled={isGenerating}
            onClick={() => setConfig({ ...config, hasTie: false })}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
              ${!config.hasTie 
                ? 'bg-cream text-onyx border-cream' 
                : 'bg-transparent border-white/10 text-cream/40 hover:border-white/30'}`}
          >
            <Icons.NoTie />
            <span className="text-[7px] font-bold uppercase">No Tie</span>
          </button>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-3 text-cream">Eyewear</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(GlassesType).map((g) => (
            <button
              key={g}
              disabled={isGenerating}
              onClick={() => setConfig({ ...config, glasses: g })}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
                ${config.glasses === g 
                  ? 'bg-cream text-onyx border-cream' 
                  : 'bg-transparent border-white/10 text-cream/40 hover:border-white/30'}`}
            >
              <div className="scale-50">{GlassesIcons[g]}</div>
              <span className="text-[7px] font-bold uppercase text-center">{g === GlassesType.NONE ? 'None' : g.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigTabIdentity;
