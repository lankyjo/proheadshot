import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TemplateType, ExpressionType, BackgroundType, GlassesType, HeadshotConfig } from './types';
import * as Icons from './components/Icons';
import { COLORS, GlassesIcons } from './constants';
import ConfigTabIdentity from './components/ConfigTabIdentity';
import ConfigTabStudio from './components/ConfigTabStudio';
import Header from './components/Header';
import Uploader from './components/Uploader';
import ResultPreview from './components/ResultPreview';

const STORAGE_KEYS = {
  THEME: 'proshot_theme',
  CONFIG: 'proshot_config'
};

const MESSAGES = [
  "Synchronizing facial landmarks...",
  "Applying identity lock...",
  "Simulating 85mm portrait optics...",
  "Calibrating studio environment...",
  "Refining silk and textile textures...",
  "Polishing final raw capture..."
];

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'identity' | 'studio'>('identity');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [config, setConfig] = useState<HeadshotConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      template: TemplateType.FRONT_SMILING,
      expression: ExpressionType.NEUTRAL,
      glasses: GlassesType.NONE,
      backgroundType: BackgroundType.STUDIO,
      backgroundColor: '#0F0F0F',
      isMonochrome: false,
      hasTie: true,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        TASK: Generate a high-fidelity professional corporate 1:1 portrait.
        IDENTITY: The subject MUST be a perfect digital twin of the source image. Match facial geometry, skin texture, and unique features precisely.
        POSE: ${config.template}. 
        EXPRESSION: ${config.expression === ExpressionType.SMILE ? 'authentic corporate smile' : 'professional neutral'}.
        EYEWEAR: ${config.glasses === GlassesType.NONE ? 'strictly no glasses' : 'wearing ' + config.glasses}.
        ENVIRONMENT: ${config.backgroundType === BackgroundType.PLAIN ? 'clean solid studio background color ' + config.backgroundColor : config.backgroundType}.
        CLOTHING: dressed in premium bespoke business attire. Sharp tailored suit jacket. ${config.hasTie ? 'With a silk tie.' : 'Modern open neck shirt.'}
        ARTISTIC: ${config.isMonochrome ? 'High-contrast fine-art black and white photography.' : 'Natural professional skin tones.'}
        TECHNICAL: Sharp focus on the eyes, 85mm lens compression, cinematic three-point lighting, 8K raw quality.
      `.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            { inlineData: { data: sourceImage.split(',')[1], mimeType: 'image/jpeg' } },
            { text: prompt },
          ],
        },
        config: { 
          imageConfig: { 
            aspectRatio: "1:1",
            imageSize: "2K"
          } 
        }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setResultImage(`data:image/png;base64,${part.inlineData.data}`);
      } else {
        throw new Error("Studio failed to deliver asset.");
      }
    } catch (err: any) {
      if (err.message?.includes("429") || err.message?.includes("quota")) {
        setError("Studio Quota Exceeded. Please try again later or check your API configuration.");
      } else {
        setError(err.message || "Studio Error: Generation failed.");
      }
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-cream dark:bg-onyx text-onyx dark:text-cream">
      <Header theme={theme} toggleTheme={toggleTheme} isGenerating={isGenerating} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <Uploader sourceImage={sourceImage} isGenerating={isGenerating} onUpload={setSourceImage} />
          
          <div className="bg-white/5 dark:bg-white/5 rounded-[2.5rem] border border-onyx/5 dark:border-cream/5 shadow-sm overflow-hidden backdrop-blur-md">
            <div className="flex border-b border-onyx/10 dark:border-cream/10">
              <button 
                onClick={() => setActiveTab('identity')} 
                className={`flex-1 py-4 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5'}`}
              >
                01. Identity
              </button>
              <button 
                onClick={() => setActiveTab('studio')} 
                className={`flex-1 py-4 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'studio' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5'}`}
              >
                02. Studio
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'identity' ? (
                <ConfigTabIdentity config={config} setConfig={setConfig} isGenerating={isGenerating} />
              ) : (
                <ConfigTabStudio config={config} setConfig={setConfig} isGenerating={isGenerating} />
              )}
            </div>
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={!sourceImage || isGenerating} 
            className="w-full py-6 bg-onyx dark:bg-cream text-cream dark:text-onyx rounded-[2.5rem] font-black uppercase tracking-widest disabled:opacity-20 hover:scale-[0.98] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 group"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
            ) : (
              <>
                <Icons.Sparkles />
                <span>Generate Portrait</span>
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest text-center rounded-2xl animate-in fade-in duration-300">
              {error}
            </div>
          )}
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <ResultPreview resultImage={resultImage} isGenerating={isGenerating} loadingMsg={loadingMsg} />
        </div>
      </main>

      <footer className="py-12 border-t border-onyx/5 dark:border-cream/5 opacity-30 text-center uppercase tracking-[0.4em] font-bold text-[9px]">
        ProShot • Professional AI Photography Protocol • v3.0 Pro
      </footer>
    </div>
  );
};

export default App;