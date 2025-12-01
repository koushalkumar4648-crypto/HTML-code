import React from 'react';
import { EditorProps } from '../types';

export const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full p-4 bg-slate-950 text-slate-300 font-mono text-sm md:text-base resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="<!-- Write HTML here -->"
        />
      </div>
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[10px] md:text-xs text-slate-500 flex justify-between items-center safe-area-bottom">
        <span className="uppercase font-semibold tracking-wider">HTML Mode</span>
        <span>{code.length} chars</span>
      </div>
    </div>
  );
};