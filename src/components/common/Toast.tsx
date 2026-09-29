import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md bg-white/95 dark:bg-slate-900/95 dark:border-slate-800 border-slate-200 text-slate-800 dark:text-slate-100 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-500 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};
