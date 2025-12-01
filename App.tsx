import React, { useState, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { generateCode } from './services/geminiService';

const INITIAL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Mobile App</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white h-screen flex flex-col items-center justify-center p-6">
    <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-gray-700">
        <div class="mb-6 bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
             <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 class="text-3xl font-bold mb-2">Success!</h1>
        <p class="text-gray-400 mb-6">Your app is running perfectly in full-screen mode.</p>
        <button onclick="alert('It works!')" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95">
            Click Me
        </button>
    </div>
</body>
</html>`;

export default function App() {
  const [htmlCode, setHtmlCode] = useState<string>(INITIAL_HTML);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'run'>('edit');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDownload = useCallback(() => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `index.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Help user understand how to get a public URL
    setTimeout(() => {
      alert("App Downloaded!\n\nTo get a public URL:\n1. Go to netlify.com or github.com\n2. Upload this 'index.html' file.\n3. They will give you a public link!");
    }, 500);
  }, [htmlCode]);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const generated = await generateCode(prompt);
      setHtmlCode(generated);
    } catch (error) {
      alert("Failed to generate code.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRun = () => {
    setRefreshTrigger(prev => prev + 1);
    setViewMode('run');
  };

  const handleClear = () => {
      if(window.confirm("Clear editor content?")) {
          setHtmlCode('');
      }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      {/* Main Edit View */}
      <div className={`flex flex-col h-full ${viewMode === 'run' ? 'hidden' : 'flex'}`}>
        <Toolbar 
          onDownload={handleDownload} 
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          onRun={handleRun}
          onClear={handleClear}
        />
        <div className="flex-1 overflow-hidden">
          <Editor 
            code={htmlCode} 
            onChange={setHtmlCode} 
          />
        </div>
      </div>

      {/* Full Screen Run View */}
      {viewMode === 'run' && (
        <Preview 
          code={htmlCode} 
          refreshTrigger={refreshTrigger}
          onClose={() => setViewMode('edit')}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}