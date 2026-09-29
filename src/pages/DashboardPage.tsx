import React from 'react';
import { useApp } from '../context/AppContext';
import { mockRecentTopics } from '../data/mockData';
import {
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Compass,
  TrendingUp,
  BrainCircuit,
  FolderOpen,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    user,
    documents,
    navigateTo,
    setIsUploadModalOpen,
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Personalized Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            What would you like to study today?
          </p>
        </div>

        {/* Quick Academic Metric Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Pages Indexed</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{user.stats.pagesIndexed.toLocaleString()}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Study Hours</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{user.stats.studyHours}h</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Q&A Accuracy</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">99.4%</span>
          </div>
        </div>
      </div>

      {/* Large Upload Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Document Neural Indexing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Upload your study material
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 max-w-xl leading-relaxed">
              Upload multi-hundred-page textbooks, slide decks, or class notes. StudyPilot analyzes the mathematical definitions, diagrams, and indexes every section for instant source-grounded answers.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-indigo-200/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                End-to-End Encrypted
              </span>
              <span>•</span>
              <span>PDF • Up to 1GB</span>
              <span>•</span>
              <span>Isolated Workspace</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="group cursor-pointer rounded-xl border-2 border-dashed border-indigo-400/40 hover:border-indigo-300 bg-white/5 hover:bg-white/10 p-6 text-center transition-all duration-200"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:scale-105 transition-transform mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Drop your PDF here, or <span className="text-indigo-300 underline">Browse files</span>
              </p>
              <p className="text-xs text-indigo-200/60 mt-1">
                Fast extraction with page-level semantic vectors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Documents
            </h2>
          </div>
          <button
            onClick={() => navigateTo('documents')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View all documents ({documents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.slice(0, 3).map((doc) => {
            const isProcessing = doc.status === 'processing';

            return (
              <div
                key={doc.id}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    {isProcessing ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Processing ({doc.processingProgress}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Processed</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {doc.description}
                  </p>

                  {/* Processing Progress Bar if active */}
                  {isProcessing && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span>Indexing chapters & formulas...</span>
                        <span className="font-mono font-medium">{doc.processingProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${doc.processingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      {doc.totalPages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.lastStudied}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isProcessing) {
                        navigateTo('processing');
                      } else {
                        navigateTo('study', doc.id, 421);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 transition-all duration-150 flex items-center justify-center gap-1.5"
                  >
                    <span>{isProcessing ? 'View Status' : 'Open Document'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Studying Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Continue Studying
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Recent topics & questions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecentTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigateTo('study', 'doc-os-842', 421)}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {topic.subject}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {topic.lastQueried}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {topic.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {topic.documentTitle} • <span className="font-mono">{topic.pages}</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
