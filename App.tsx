
import React, { useState, useRef, useEffect } from 'react';
import { 
  HeadshotConfig, 
  TemplateType, 
  ExpressionType, 
  BackgroundType, 
  GlassesType 
} from './types';
import { Icons, COLORS, GlassesIcons } from './constants';
import { generateProfessionalHeadshot } from './services/gemini';

const App: React.FC = () => {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const messages = [
    "Locking identity landmarks...",
    "Preserving unique features...",
    "Setting studio lighting...",
    "Calibrating indoor environment...",
    "Refining silk textures...",
    "Finalizing 8K raw portrait..."
  ];

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setIsGenerating(true);
    setError(null);
    
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMsg(messages[msgIndex % messages.length]);
      msgIndex++;
    }, 2500);

    try {
      const result = await generateProfessionalHeadshot(sourceImage, config);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate headshot. Studio error.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `headshot_${Date.now()}.png`;
    link.click();
  };

  const handleView = () => {
    if (!resultImage) return;
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<img src="${resultImage}" style="max-width: 100%; height: auto; display: block; margin: auto;" />`);
      newTab.document.title = "View Headshot";
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 text-onyx dark:text-cream selection:bg-onyx selection:text-cream dark:selection:bg-cream dark:selection:text-onyx">
      {/* Navigation */}
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section: Image Source - 1:1 Preview filling the container */}
          <div className="bg-white/5 dark:bg-white/5 p-4 rounded-[2.5rem] border border-onyx/5 dark:border-cream/5 backdrop-blur-sm">
            <div 
              onClick={() => !isGenerating && fileInputRef.current?.click()}
              className={`group relative aspect-square w-full border-2 border-onyx dark:border-cream rounded-3xl transition-all flex flex-col items-center justify-center overflow-hidden
                ${sourceImage ? 'border-solid' : 'border-dashed opacity-70 hover:opacity-100 hover:bg-onyx/5 dark:hover:bg-cream/5'}
                ${isGenerating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              {sourceImage ? (
                <div className="w-full h-full relative">
                  <img src={sourceImage} className="w-full h-full object-cover" alt="Source" />
                  <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-cream">
                    <Icons.Upload />
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2">Replace Photo</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="mb-4 flex justify-center opacity-50"><Icons.Upload /></div>
                  <p className="text-xs font-black uppercase tracking-widest">Upload Subject</p>
                  <p className="text-[9px] opacity-40 uppercase tracking-tighter mt-1">PNG or JPG preferred</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isGenerating} />
            </div>
          </div>

          {/* Section: Customization with Tabs (Scrolling Stopped) */}
          <div className="bg-white/5 dark:bg-white/5 rounded-[2.5rem] border border-onyx/5 dark:border-cream/5 backdrop-blur-sm overflow-hidden">
            <div className="flex border-b border-onyx/10 dark:border-cream/10">
              <button 
                onClick={() => setActiveTab('identity')}
                disabled={isGenerating}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeTab === 'identity' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5 disabled:opacity-30 disabled:cursor-not-allowed'}`}
              >
                01. Identity
              </button>
              <button 
                onClick={() => setActiveTab('studio')}
                disabled={isGenerating}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeTab === 'studio' ? 'bg-onyx dark:bg-cream text-cream dark:text-onyx' : 'hover:bg-onyx/5 dark:hover:bg-cream/5 disabled:opacity-30 disabled:cursor-not-allowed'}`}
              >
                02. Studio
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'identity' && (
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

                  {/* Tie Selection - Icon Grid Style */}
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
              )}

              {activeTab === 'studio' && (
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

                  {/* Backdrop Color & Personal Color Picker */}
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
                              ${config.backgroundColor === c ? 'border-onyx dark:bg-cream scale-110 shadow-lg' : 'border-white/20'}`}
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
              )}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!sourceImage || isGenerating}
            className={`w-full py-6 rounded-[2.5rem] font-black text-lg tracking-[0.2em] uppercase shadow-2xl flex items-center justify-center gap-4 transition-all group relative overflow-hidden
              ${!sourceImage || isGenerating 
                ? 'bg-onyx/10 dark:bg-cream/10 text-onyx/20 dark:text-cream/20 cursor-not-allowed border border-onyx/10 dark:border-cream/10' 
                : 'bg-onyx dark:bg-cream text-cream dark:text-onyx hover:scale-[0.98] active:scale-95'}`}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-[3px] border-cream/30 dark:border-onyx/30 border-t-cream dark:border-t-onyx rounded-full animate-spin" />
            ) : (
              <>
                <Icons.Sparkles />
                Generate
              </>
            )}
          </button>
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-500 text-[9px] font-black uppercase tracking-widest text-center rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Right Preview: Result */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex-1 bg-white/5 dark:bg-onyx/5 rounded-[4rem] border-2 border-onyx/10 dark:border-cream/10 shadow-inner relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 lg:p-12">
            
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {!isGenerating && !resultImage && (
              <div className="text-center relative z-10 max-w-sm px-4">
                <div className="w-24 h-24 border-2 border-onyx/10 dark:border-cream/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-pulse text-onyx/30 dark:text-cream/30">
                  <Icons.Sparkles />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic opacity-80">Studio Ready</h3>
                <p className="text-[10px] font-bold opacity-30 leading-relaxed uppercase tracking-[0.2em]">
                  Configure settings, then press Generate to create your 8K headshot.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 z-30 bg-cream/90 dark:bg-onyx/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center">
                <div className="relative w-32 h-32 mb-10">
                  <div className="absolute inset-0 border-4 border-onyx/5 dark:border-cream/5 rounded-full" />
                  <div className="absolute inset-0 border-4 border-onyx dark:border-cream rounded-full border-t-transparent animate-[spin_1.2s_linear_infinite]" />
                  <div className="absolute inset-6 bg-onyx/5 dark:bg-cream/5 rounded-full flex items-center justify-center animate-pulse">
                    <Icons.Sparkles />
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Processing</h3>
                <p className="text-onyx dark:text-cream font-black text-[9px] tracking-[0.4em] uppercase animate-pulse">{loadingMsg}</p>
                
                <div className="mt-16 w-full max-w-[200px] h-0.5 bg-onyx/10 dark:bg-cream/10 rounded-full overflow-hidden">
                   <div className="h-full bg-onyx dark:bg-cream animate-[load_15s_ease-out_forwards]" />
                </div>
              </div>
            )}

            {resultImage && !isGenerating && (
              <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-700 relative z-10">
                <div className="relative group w-full max-w-md aspect-square bg-onyx dark:bg-cream p-1 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.01]">
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-onyx/10 relative">
                    <img 
                      src={resultImage} 
                      alt="ProShot Headshot" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Static Corner Icons for Mobile/UX */}
                    <button 
                      onClick={handleView}
                      className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg hover:bg-white/40 transition-all z-20"
                      title="Maximize"
                    >
                      <Icons.Maximize />
                    </button>
                    
                    <button 
                      onClick={handleDownload}
                      className="absolute bottom-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg hover:bg-white/40 transition-all z-20"
                      title="Download"
                    >
                      <Icons.Download />
                    </button>

                    <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-sm gap-4">
                      <button 
                        onClick={handleDownload}
                        className="bg-cream text-onyx w-48 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Icons.Download />
                        Save Headshot
                      </button>
                      
                      <button 
                        onClick={handleView}
                        className="bg-white/10 text-white border border-white/20 w-48 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Icons.View />
                        View Headshot
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={handleDownload}
                      className="group bg-onyx dark:bg-cream text-cream dark:text-onyx px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:opacity-80 transition-all flex items-center gap-3"
                    >
                      <span>Export High-Res</span>
                      <Icons.Check />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Metadata Ribbon */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Ratio', val: '1:1 Sq', icon: '📐' },
              { label: 'Optics', val: '85mm f/1.2', icon: '📷' },
              { label: 'Backdrop', val: config.backgroundType.split(' ')[0], icon: '💡' },
              { label: 'Identity', val: 'Lock V2.4', icon: '✨' },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-white/5 dark:bg-white/5 border border-onyx/5 dark:border-cream/5 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center text-center group hover:bg-onyx dark:hover:bg-cream transition-all">
                 <p className="text-[7px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:text-cream dark:group-hover:text-onyx transition-colors">{s.label}</p>
                 <p className="text-[9px] font-black uppercase tracking-widest group-hover:text-cream dark:group-hover:text-onyx transition-colors">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 mt-12 border-t border-onyx/5 dark:border-cream/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">
            <a href="#" className="hover:opacity-100 transition-opacity">Protocol</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Archive</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes load {
          0% { width: 0%; }
          100% { width: 99%; }
        }
      `}</style>
    </div>
  );
};

export default App;
