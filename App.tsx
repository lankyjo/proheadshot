
// Fix: Use named imports for React hooks and components to fix property access errors.
import { useState, useCallback, FC } from 'react';
import { HeadshotConfig, TemplateType, ExpressionType, BackgroundType, GlassesType } from './types';
import * as Icons from './components/Icons';
import Header from './components/Header';
import Uploader from './components/Uploader';
import ConfigTabIdentity from './components/ConfigTabIdentity';
import ConfigTabStudio from './components/ConfigTabStudio';
import ResultPreview from './components/ResultPreview';
import { generateProfessionalHeadshot } from './services/gemini';

const MESSAGES = [
  "Locking identity landmarks...",
  "Preserving unique features...",
  "Setting studio lighting...",
  "Calibrating indoor environment...",
  "Refining silk textures...",
  "Finalizing 8K raw portrait..."
];

const App: FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'identity' | 'studio'>('identity');

  const [config, setConfig] = useState<HeadshotConfig>({
    template: TemplateType.FRONT_SMILING,
    expression: ExpressionType.NEUTRAL,
    glasses: GlassesType.NONE,
    backgroundType: BackgroundType.STUDIO,
    backgroundColor: '#0F0F0F',
    isMonochrome: false,
    hasTie: true,
  });

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  }, [theme]);

  const handleGenerate = async () => {
    if (!sourceImage) return;
    setIsGenerating(true);
    setError(null);
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMsg(MESSAGES[msgIndex % MESSAGES.length]);
      msgIndex++;
    }, 2500);

    try {
      const result = await generateProfessionalHeadshot(sourceImage, config);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "Studio error. Please try again.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 text-onyx dark:text-cream selection:bg-onyx selection:text-cream dark:selection:bg-cream dark:selection:text-onyx">
      <Header theme={theme} toggleTheme={toggleTheme} isGenerating={isGenerating} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <Uploader sourceImage={sourceImage} isGenerating={isGenerating} onUpload={setSourceImage} />
          
          <div className="bg-white/5 dark:bg-white/5 rounded-[2.5rem] border border-onyx/5 dark:border-cream/5 backdrop-blur-sm overflow-hidden">
            <div className="flex border-b border-onyx/10 dark:border-cream/10">
              <button onClick={() => setActiveTab('identity')} disabled={isGenerating} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5'}`}>01. Identity</button>
              <button onClick={() => setActiveTab('studio')} disabled={isGenerating} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'studio' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5'}`}>02. Studio</button>
            </div>
            <div className="p-6">
              {activeTab === 'identity' ? <ConfigTabIdentity config={config} setConfig={setConfig} isGenerating={isGenerating} /> : <ConfigTabStudio config={config} setConfig={setConfig} isGenerating={isGenerating} />}
            </div>
          </div>

          <button onClick={handleGenerate} disabled={!sourceImage || isGenerating} className={`w-full py-6 rounded-[2.5rem] font-black text-lg tracking-[0.2em] uppercase shadow-2xl flex items-center justify-center gap-4 transition-all group overflow-hidden ${!sourceImage || isGenerating ? 'opacity-30 cursor-not-allowed' : 'bg-onyx dark:bg-cream text-cream dark:text-onyx hover:scale-[0.98]'}`}>
            {isGenerating ? <div className="w-5 h-5 border-[3px] border-cream/30 border-t-cream rounded-full animate-spin" /> : <><Icons.Sparkles /> Generate</>}
          </button>
          
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest text-center rounded-xl">{error}</div>}
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <ResultPreview resultImage={resultImage} isGenerating={isGenerating} loadingMsg={loadingMsg} />
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Ratio: 1:1', 'Optics: 85mm', `Scene: ${config.backgroundType.split(' ')[0]}`, 'Engine: Pro V2'].map((s) => (
              <div key={s} className="p-4 bg-white/5 border border-onyx/5 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center text-center">
                 <p className="text-[9px] font-black uppercase tracking-widest">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 mt-12 border-t border-onyx/5 opacity-30 text-center uppercase tracking-[0.4em] font-bold text-[9px]">
        ProShot AI • Professional Studio Protocol
      </footer>
    </div>
  );
};

export default App;
