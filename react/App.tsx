
// Fix: Use named imports for React hooks and components to fix property access errors.
import { useState, FC } from 'react';
import { HeadshotConfig, TemplateType, ExpressionType, BackgroundType, GlassesType } from './types';
import Header from './components/Header';
import Uploader from './components/Uploader';
import ResultPreview from './components/ResultPreview';
import ConfigTabIdentity from './components/ConfigTabIdentity';
import ConfigTabStudio from './components/ConfigTabStudio';
import { generateProfessionalHeadshot } from './services/gemini';

const App: FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleGenerate = async () => {
    if (!sourceImage) return;
    setIsGenerating(true);
    try {
      const result = await generateProfessionalHeadshot(sourceImage, config);
      setResultImage(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-onyx text-onyx dark:text-cream">
      <Header theme="dark" toggleTheme={() => {}} isGenerating={isGenerating} />
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <Uploader sourceImage={sourceImage} isGenerating={isGenerating} onUpload={setSourceImage} />
          <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10">
            <div className="flex border-b border-white/10">
              <button onClick={() => setActiveTab('identity')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeTab === 'identity' ? 'bg-white/10' : ''}`}>Identity</button>
              <button onClick={() => setActiveTab('studio')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeTab === 'studio' ? 'bg-white/10' : ''}`}>Studio</button>
            </div>
            <div className="p-6">
              {activeTab === 'identity' ? <ConfigTabIdentity config={config} setConfig={setConfig} isGenerating={isGenerating} /> : <ConfigTabStudio config={config} setConfig={setConfig} isGenerating={isGenerating} />}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={isGenerating || !sourceImage} className="w-full py-6 bg-onyx dark:bg-cream text-cream dark:text-onyx rounded-3xl font-black uppercase tracking-[0.2em] disabled:opacity-30">
            {isGenerating ? 'Processing...' : 'Generate Headshot'}
          </button>
        </div>
        <div className="lg:col-span-8">
          <ResultPreview resultImage={resultImage} isGenerating={isGenerating} loadingMsg="Refining Portrait..." />
        </div>
      </main>
    </div>
  );
};

export default App;
