
// Fix: Use named imports for React FC to avoid property access errors.
import { FC } from 'react';
import * as Icons from './Icons';

interface ResultPreviewProps {
  resultImage: string | null;
  isGenerating: boolean;
  loadingMsg: string;
}

const ResultPreview: FC<ResultPreviewProps> = ({ resultImage, isGenerating, loadingMsg }) => {
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
    <div className="flex-1 bg-white/5 rounded-[4rem] border-2 border-white/10 shadow-inner relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 lg:p-12">
      {!isGenerating && !resultImage && (
        <div className="text-center relative z-10 max-w-sm px-4">
          <div className="w-24 h-24 border-2 border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-pulse text-cream/30">
            <Icons.Sparkles />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic opacity-80 text-cream">Studio Ready</h3>
          <p className="text-[10px] font-bold opacity-30 leading-relaxed uppercase tracking-[0.2em] text-cream">
            Configure settings, then press Generate to create your 8K headshot.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-0 z-30 bg-onyx/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center">
          <div className="relative w-32 h-32 mb-10">
            <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
            <div className="absolute inset-0 border-4 border-cream rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-6 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
              <Icons.Sparkles />
            </div>
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-cream">Processing</h3>
          <p className="text-cream font-black text-[9px] tracking-[0.4em] uppercase animate-pulse">{loadingMsg}</p>
        </div>
      )}

      {resultImage && !isGenerating && (
        <div className="w-full flex flex-col items-center justify-center relative z-10">
          <div className="relative group w-full max-w-md aspect-square bg-cream p-1 rounded-[2.5rem] shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-onyx/10 relative">
              <img src={resultImage} alt="ProShot Headshot" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-onyx/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-sm gap-4">
                <button onClick={handleDownload} className="bg-cream text-onyx w-48 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Icons.Download /> Save
                </button>
                <button onClick={handleView} className="bg-white/10 text-white border border-white/20 w-48 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <Icons.View /> View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPreview;
