import React, { useState, useMemo } from 'react';
import { PROJECT_SOURCE_FILES, SourceFileItem } from '../data/sourceRegistry';
import JSZip from 'jszip';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Search, 
  FileText, 
  Folder, 
  FolderOpen,
  Terminal,
  Package,
  Layers,
  FileCode
} from 'lucide-react';

export const SourceCodeView: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>('app.py');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const activeFile = useMemo(() => {
    return PROJECT_SOURCE_FILES.find(f => f.path === selectedPath) || PROJECT_SOURCE_FILES[0];
  }, [selectedPath]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return PROJECT_SOURCE_FILES;
    const q = searchQuery.toLowerCase();
    return PROJECT_SOURCE_FILES.filter(f => 
      f.path.toLowerCase().includes(q) || f.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const lines = useMemo(() => {
    return activeFile.content.split('\n');
  }, [activeFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.path.split('/').pop() || 'file.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add all project source files to zip preserving paths
      PROJECT_SOURCE_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'FINVEXA_Full_Source.zip';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create zip package:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Group files by category
  const categories: SourceFileItem['category'][] = ['Root', 'Analysis', 'Demo', 'Data', 'Templates', 'Static'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
            <span>Feature 6: Production Source Code Inspector</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <span>FINVEXA Source Code</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse the real Python modules, analysis engines, templates, and datasets. Runnable locally via <code className="text-emerald-400 font-mono">python app.py</code>.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-cyan-950/50 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Package className="w-4 h-4 fill-slate-950" />
            <span>{isZipping ? 'Archiving ZIP...' : '📦 Download Full Source (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Code Explorer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left: File Tree Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/70 border-r border-slate-800 p-4 space-y-4 max-h-[750px] overflow-y-auto">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search file names or code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Grouped file listings */}
          <div className="space-y-4 text-xs font-mono">
            {categories.map(cat => {
              const catFiles = filteredFiles.filter(f => f.category === cat);
              if (catFiles.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cat} /</span>
                  </div>
                  <div className="space-y-0.5">
                    {catFiles.map(file => {
                      const isSelected = file.path === selectedPath;
                      return (
                        <button
                          key={file.path}
                          onClick={() => setSelectedPath(file.path)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                            <span className="truncate">{file.path.split('/').pop()}</span>
                          </div>
                          <span className="text-[10px] text-slate-600 uppercase font-sans">{file.language}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer & Line Numbers (8 cols) */}
        <div className="lg:col-span-8 flex flex-col max-h-[750px] overflow-hidden bg-slate-950">
          {/* Code Viewer Action Bar */}
          <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-cyan-400">{activeFile.path}</span>
              <span className="text-[11px] text-slate-500">
                {lines.length} lines • {(activeFile.content.length / 1024).toFixed(1)} KB
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>

          {/* Line Numbers and Code Pre block */}
          <div className="flex-grow overflow-auto p-4 flex text-xs font-mono leading-relaxed bg-[#0b0f19]">
            {/* Line numbers gutter */}
            <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800 shrink-0 space-y-0.5">
              {lines.map((_, i) => (
                <div key={i} className="text-[11px]">{i + 1}</div>
              ))}
            </div>

            {/* Actual code content */}
            <pre className="pl-4 text-slate-200 overflow-x-auto whitespace-pre font-mono flex-grow">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Terminal Command Instructions */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            Run locally in terminal: <code className="text-emerald-400 font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">python app.py</code>
          </span>
        </div>
        <span className="text-slate-500">
          Flask server starts on <code className="text-cyan-400 font-mono">http://127.0.0.1:5000</code>
        </span>
      </div>
    </div>
  );
};
