import React, { FC } from 'react';
import * as Icons from './Icons';

interface DeployModalProps {
  onClose: () => void;
}

const DeployModal: FC<DeployModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-onyx/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-cream dark:bg-onyx border border-onyx/10 dark:border-cream/10 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="p-8 border-b border-onyx/5 dark:border-cream/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-onyx dark:bg-cream text-cream dark:text-onyx rounded-2xl flex items-center justify-center">
              <Icons.Ship />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Publish Studio</h2>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-onyx dark:text-cream">Production Readiness Center</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-onyx/5 dark:hover:bg-cream/5 flex items-center justify-center transition-colors">
            <Icons.Close />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
          {/* FAQ Section: Will I be charged? */}
          <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Will I be charged? (The "Free Tier" breakdown)
            </h3>
            <div className="space-y-2">
              <p className="text-[10px] leading-relaxed opacity-70 uppercase font-bold">
                If you use the "Deploy App" button:
              </p>
              <ul className="text-[9px] space-y-2 opacity-60 font-medium uppercase tracking-tighter">
                <li>• <span className="text-onyx dark:text-cream font-black">Hosting:</span> Google Cloud Run is free for the first 2 million requests/month.</li>
                <li>• <span className="text-onyx dark:text-cream font-black">AI Model:</span> Gemini Flash/Pro has a free tier (with rate limits).</li>
                <li>• <span className="text-onyx dark:text-cream font-black">Billing Info:</span> Required to prevent bots, but you won't be charged unless you exceed these massive limits.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-onyx/30 dark:text-cream/30">Step 1: Setup Google Cloud</h3>
            <div className="bg-onyx/5 dark:bg-cream/5 p-6 rounded-2xl border border-onyx/10 dark:border-cream/10 space-y-4">
              <p className="text-[11px] font-medium leading-relaxed">
                To proceed with the <span className="font-bold">"Deploy app"</span> button, you must link a billing account in the Google Cloud Console.
              </p>
              <a 
                href="https://console.cloud.google.com/billing" 
                target="_blank" 
                className="block w-full p-4 bg-onyx dark:bg-cream text-cream dark:text-onyx rounded-xl font-black uppercase tracking-widest text-[10px] text-center hover:scale-[0.98] transition-all"
              >
                Open Billing Console
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-onyx/30 dark:text-cream/30">Step 2: Alternatives (No Credit Card)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border border-onyx/10 dark:border-cream/10 rounded-2xl space-y-2">
                <h4 className="text-[10px] font-black uppercase">Vercel / Netlify</h4>
                <p className="text-[9px] opacity-60 leading-relaxed uppercase tracking-tighter">100% free for hobbyists. Simply sync your GitHub repo. No credit card required for standard deployment.</p>
              </div>
              <div className="p-6 border border-onyx/10 dark:border-cream/10 rounded-2xl space-y-2">
                <h4 className="text-[10px] font-black uppercase">GitHub Pages</h4>
                <p className="text-[9px] opacity-60 leading-relaxed uppercase tracking-tighter">The industry standard for free static sites. Great for portfolios.</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase text-red-500 mb-2">Key Security</h4>
            <p className="text-[9px] text-red-500/80 leading-relaxed uppercase tracking-widest font-bold">
              When using Cloud Run, the API key is secured by Google. If using Vercel/GitHub, ensure your API_KEY is stored as a "Secret" or "Environment Variable" to keep it hidden.
            </p>
          </div>
        </div>

        <div className="p-8 bg-onyx/5 dark:bg-cream/5 flex justify-end">
          <button onClick={onClose} className="px-8 py-4 bg-onyx dark:bg-cream text-cream dark:text-onyx rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeployModal;