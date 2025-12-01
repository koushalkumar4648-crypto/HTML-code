import React, { useEffect, useRef } from 'react';
import { PreviewProps } from '../types';

export const Preview: React.FC<PreviewProps> = ({ code, refreshTrigger, onClose, onDownload }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // HTML Execution
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [refreshTrigger, code]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col h-screen w-screen">
      {/* Top Bar for Preview */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shadow-lg shrink-0">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-sm font-bold text-white tracking-wide">
             Live Preview
           </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onDownload}
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all"
            title="Download App"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>

          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-full font-medium transition-all border border-slate-700"
          >
            Back to Code
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-white">
        <iframe
          ref={iframeRef}
          title="preview"
          className="absolute inset-0 w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
        />
      </div>
    </div>
  );
};