import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Database,
  Cpu,
} from 'lucide-react';

export const ProcessingPage: React.FC = () => {
  const { navigateTo, showToast, selectedDocument } = useApp();
  const [progress, setProgress] = useState(67);
  const [processedPages, setProcessedPages] = useState(632);
  const totalPages = 942;

  // Simulate ongoing live extraction so it is distinctly alive
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
      setProcessedPages((prev) => {
        if (prev >= totalPages) return totalPages;
        return Math.min(totalPages, prev + 12);
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [totalPages]);

  const steps = [
    { label: 'File uploaded', status: 'done', detail: '48.2 MB received via encrypted TLS 1.3 socket' },
    { label: 'PDF validated', status: 'done', detail: 'Structure intact • Font encoding mapped (Type 1 & TrueType)' },
    { label: 'Text extracted', status: 'done', detail: '348,200 words extracted • Mathematical formulas normalized' },
    { label: 'Sections identified', status: 'done', detail: '9 Chapters • 42 sub-sections mapped to table of contents' },
    {
      label: 'Building search index',
      status: progress >= 100 ? 'done' : 'active',
      detail: `${processedPages} / ${totalPages} pages vectorized into dense embeddings`,
    },
    {
      label: 'Ready to study',
      status: progress >= 100 ? 'done' : 'pending',
      detail: 'Zero-hallucination semantic RAG pipeline ready',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      {/* Non-Blocking Banner Notice */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <p className="text-indigo-950 dark:text-indigo-200 font-medium">
            <strong>Background Indexing Active:</strong> You're free to leave this page. We'll notify you when your document is ready.
          </p>
        </div>
        <button
          onClick={() => navigateTo('dashboard')}
          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold shrink-0 hover:bg-indigo-50 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>

      {/* Main Processing Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
        {/* Title and Progress Percentage */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
                Neural Document Ingestion
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Processing Operating Systems Notes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Silberschatz & Galvin • Core Course Material
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              {progress}%
            </span>
            <span className="block text-[11px] text-slate-400 mt-0.5 font-medium">
              Estimated ~14s remaining
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>{processedPages} / {totalPages} pages processed</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">
              {progress < 100 ? 'Chunking & Embedding...' : 'Complete'}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step-by-Step Interactive Checklist */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pipeline Verification Checklist
          </h4>

          <div className="space-y-2.5">
            {steps.map((st, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border transition-colors flex items-start justify-between gap-3 ${
                  st.status === 'done'
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-slate-100'
                    : st.status === 'active'
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-slate-100'
                    : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {st.status === 'done' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                    {st.status === 'active' && (
                      <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                    )}
                    {st.status === 'pending' && (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-700 block shrink-0" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">
                      {st.label}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {st.detail}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Stats Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Vector Chunks</span>
            <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">2,840</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Formulas Parsed</span>
            <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">142 KaTeX</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">TOC Hierarchy</span>
            <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">9 Chapters</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Index Latency</span>
            <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">&lt; 15 ms</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Processed with AES-256 memory sandbox
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                showToast('Upload suspended safely', 'info');
                navigateTo('dashboard');
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Minimize to Background
            </button>
            <button
              onClick={() => navigateTo('study', 'doc-os-842', 421)}
              className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open Study Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
