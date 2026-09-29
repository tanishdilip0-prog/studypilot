import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ShieldCheck, Cpu, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 text-xs py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white">
              <BookOpen className="w-3 h-3" />
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">StudyPilot</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span>AI Academic Study Platform for 500–1000+ Page Notes</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Private & Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              Zero-Shot RAG Citation Engine
            </span>
            <button
              onClick={() => navigateTo('settings')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Preferences
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 StudyPilot Systems Inc. Engineered for academic excellence.</p>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Structured for Stanford, MIT & Oxford academic curricula.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
