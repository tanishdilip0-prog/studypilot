import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Compass,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, setIsUploadModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="relative overflow-hidden pt-8 pb-16 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/15 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs shadow-xs text-xs font-medium text-indigo-700 dark:text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Next-Gen Academic RAG for 500–1000+ Page Notes</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 dark:text-slate-400">v1.0 Live</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Turn <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">1000 pages</span> of notes into answers in seconds.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Upload your academic notes, ask questions, and study with an AI assistant that works with your own material.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <span>Upload Your Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('study', 'doc-os-842', 421)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all duration-150 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Explore Demo Session</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                No credit card needed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                100% private & student-owned
              </span>
            </div>
          </div>

          {/* Hero Visual Mock Interface */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 to-slate-100/30 dark:from-slate-800/80 dark:to-slate-900/30 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-md">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              {/* Mock Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-medium text-slate-400">
                    StudyPilot — Operating Systems Notes (842 Pages)
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
                    ● Grounded in Page 421
                  </span>
                </div>
              </div>

              {/* Mock Dual Pane (PDF Document on Left, AI Question & Answer on Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                {/* Left: Mock PDF Document Preview */}
                <div className="lg:col-span-6 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      📄 Chapter 7: Deadlocks & Synchronization
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">
                      Page 421 of 842
                    </span>
                  </div>

                  {/* Academic PDF Page Body */}
                  <div className="font-serif text-slate-700 dark:text-slate-300 text-xs leading-relaxed space-y-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                    <div className="font-sans font-bold text-sm text-slate-900 dark:text-white border-b pb-1">
                      7.4 Deadlock Prevention
                    </div>
                    <p>
                      As established in Section 7.2, deadlock requires all four Coffman criteria to hold concurrently: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.
                    </p>
                    <div className="p-2.5 rounded bg-indigo-50/80 dark:bg-indigo-950/40 border-l-3 border-indigo-600 text-indigo-950 dark:text-indigo-200 font-medium">
                      "Deadlock prevention is a set of techniques used to ensure that at least one of the necessary conditions for deadlock cannot occur."
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      By imposing a total resource ordering function {"$F: R \\to \\mathbb{N}$"}, any cycle in the resource allocation graph is rendered mathematically impossible.
                    </p>
                  </div>
                </div>

                {/* Right: AI Answer Panel */}
                <div className="lg:col-span-6 p-5 flex flex-col justify-between bg-white dark:bg-slate-900">
                  <div className="space-y-4">
                    {/* User Question */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200 shrink-0">
                        AM
                      </div>
                      <div className="p-2.5 rounded-xl rounded-tl-xs bg-slate-100 dark:bg-slate-800/70 text-xs font-medium text-slate-900 dark:text-slate-100">
                        What is deadlock prevention?
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-2">
                        <div className="p-3.5 rounded-xl rounded-tl-xs bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                          <p className="font-semibold text-indigo-950 dark:text-indigo-200 mb-1">
                            Deadlock Prevention:
                          </p>
                          <p>
                            Deadlock prevention is a set of techniques used to ensure that at least one of the four necessary Coffman conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) cannot occur.
                          </p>
                        </div>

                        {/* Grounded Citation Chip */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-medium">Source:</span>
                          <button
                            onClick={() => navigateTo('study', 'doc-os-842', 421)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Operating Systems Notes • Pages 421–424</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                          </button>
                        </div>

                        {/* Quick Prompts */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            Explain simpler
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            Give example
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 font-medium">
                            Make it a 5-mark answer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mock Input Box */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        placeholder="Ask anything about this document..."
                        className="w-full text-xs py-2.5 pl-3 pr-20 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                        onClick={() => navigateTo('study', 'doc-os-842', 421)}
                      />
                      <button
                        onClick={() => navigateTo('study', 'doc-os-842', 421)}
                        className="absolute right-1.5 top-1.5 px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-semibold"
                      >
                        Ask AI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Cards as Specified */}
          <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Engineered for 1000+ Page Academic Syllabi
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Built specifically for university courses where traditional chatbots fail to locate precise citations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  1. Ask Your Notes
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Get answers based on your uploaded study material. Every response is grounded in your exact professor lecture notes.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  2. Find the Source
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  See the page and section where the answer came from. One click highlights the passage inside the built-in PDF viewer.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  3. Study Smarter
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Generate summaries, questions, and explanations. Convert heavy chapters into 5-mark and 13-mark university exam answers.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  4. AI Study Copilot
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Ask follow-up questions while studying. Request intuitive analogies, code walkthroughs, and active-recall flashcards.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Trust Bar */}
          <div className="mt-16 text-center pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trusted for Rigorous Engineering & Science Curricula
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Operating Systems</span>
              <span>•</span>
              <span>Computer Networks</span>
              <span>•</span>
              <span>Database Internals</span>
              <span>•</span>
              <span>Distributed Systems</span>
              <span>•</span>
              <span>Algorithms (CLRS)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
