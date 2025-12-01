import React, { useState } from 'react';
import { ToolbarProps } from '../types';

export const Toolbar: React.FC<ToolbarProps> = ({ 
  onDownload, 
  onGenerate, 
  isGenerating, 
  onRun, 
  onClear 
}) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await onGenerate(prompt);
  };

  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-3 md:px-4 sticky top-0 z-40 shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <span className="font-bold text-slate-200 hidden md:block">Code Studio</span>
      </div>

      {/* Center: Search/Generate */}
      <div className="flex-1 max-w-xl mx-2 md:mx-4">
        <form onSubmit={handleGenerate} className="relative group">
          <input
            type="text"
            className="block w-full pl-3 pr-10 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-950 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs md:text-sm transition-all"
            placeholder="Describe app..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button 
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute inset-y-1 right-1 px-2 md:px-3 flex items-center justify-center text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
          >
            {isGenerating ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors hidden sm:block"
          title="Clear Editor"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>

        <button
          onClick={onDownload}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Download Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>

        <button
          onClick={onRun}
          className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-400/20 transition-all active:scale-95"
          title="Run App (Full Screen)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span className="hidden sm:inline">RUN</span>
          <span className="sm:hidden">RUN</span>
        </button>
      </div>
    </div>
  );
};