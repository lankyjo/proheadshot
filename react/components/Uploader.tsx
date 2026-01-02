
// Fix: Use named imports for React hooks and event types to fix property access errors.
import { useRef, FC, ChangeEvent } from 'react';
import * as Icons from './Icons';

interface UploaderProps {
  sourceImage: string | null;
  isGenerating: boolean;
  onUpload: (image: string) => void;
}

const Uploader: FC<UploaderProps> = ({ sourceImage, isGenerating, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onUpload(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
      <div 
        onClick={() => !isGenerating && fileInputRef.current?.click()}
        className={`group relative aspect-square w-full border-2 border-cream rounded-3xl transition-all flex flex-col items-center justify-center overflow-hidden
          ${sourceImage ? 'border-solid' : 'border-dashed opacity-70 hover:opacity-100 hover:bg-white/5'}
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
            <p className="text-xs font-black uppercase tracking-widest text-cream">Upload Subject</p>
            <p className="text-[9px] opacity-40 uppercase tracking-tighter mt-1 text-cream">PNG or JPG</p>
          </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isGenerating} />
      </div>
    </div>
  );
};

export default Uploader;
