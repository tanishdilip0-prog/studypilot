import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UploadCloud,
  FileText,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, navigateTo } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF document (.pdf format).');
      return;
    }
    setSelectedFile(file);
  };

  const handleStartProcessing = () => {
    setIsUploadModalOpen(false);
    // Navigate directly to Page 8 (Processing Screen)
    navigateTo('processing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upload Study Material
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Index textbooks, lecture decks, or comprehensive class notes
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelected(e.target.files[0]);
              }
            }}
          />

          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[0.99]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Drop your PDF here, or <span className="text-indigo-600 dark:text-indigo-400 underline">browse files</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Supports large academic notes, slides, and textbooks • Up to 1GB
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span>PDF Format</span>
                <span>•</span>
                <span>500–1000+ Pages Supported</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for neural indexing
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-rose-500 hover:underline px-2 py-1"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {/* Quick presets for demo */}
          <div className="mt-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Or Try A Sample Course Textbook
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setSelectedFile(new File([''], 'Distributed_Systems_Concepts.pdf', { type: 'application/pdf' }));
                }}
                className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span className="font-medium block truncate">Distributed Systems</span>
                <span className="text-[10px] text-slate-400">512 pages • Stanford CS</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFile(new File([''], 'Compiler_Design_Dragon_Book.pdf', { type: 'application/pdf' }));
                }}
                className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span className="font-medium block truncate">Compilers & Lexing</span>
                <span className="text-[10px] text-slate-400">980 pages • MIT 6.035</span>
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Academic Privacy Guarantee:</strong> Your notes are parsed in an isolated sandbox, encrypted at rest with AES-256, and never used to train public LLM models.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStartProcessing}
            disabled={!selectedFile}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-xs transition-colors"
          >
            <span>Start Processing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
