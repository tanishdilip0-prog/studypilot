import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockFlashcards, mockQuizQuestions } from '../data/mockData';
import {
  FileText,
  HelpCircle,
  BrainCircuit,
  BarChart3,
  PenTool,
  GitBranch,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Award,
} from 'lucide-react';

export const StudyToolsPage: React.FC = () => {
  const { navigateTo, selectedDocument, showToast } = useApp();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Flashcards tool interactive state
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz tool interactive state
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizScore, setShowQuizScore] = useState(false);

  // Exam answer mark selector
  const [examMarks, setExamMarks] = useState<number>(5);

  const tools = [
    {
      id: 'summarize',
      title: 'Summarize Notes',
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900',
      description: 'Turn selected pages into concise revision notes with mathematical theorems and key formulas.',
      cta: 'Summarize Chapter',
    },
    {
      id: 'questions',
      title: 'Generate Questions',
      icon: <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-900',
      description: 'Create targeted professor-style practice questions and test bank items from your notes.',
      cta: 'Generate Question Bank',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: <BrainCircuit className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
      bg: 'bg-violet-50 dark:bg-violet-950/60 border-violet-100 dark:border-violet-900',
      description: 'Generate active recall flashcards with spaced repetition metadata from any chapter.',
      cta: 'Study Flashcards',
    },
    {
      id: 'quiz',
      title: 'Quiz Me',
      icon: <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900',
      description: 'Test your knowledge with multiple-choice questions and instant explanation feedback.',
      cta: 'Start Practice Quiz',
    },
    {
      id: 'exam',
      title: 'Exam Answer',
      icon: <PenTool className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900',
      description: 'Generate structured answers based on university mark allocations (2-mark, 5-mark, 13-mark).',
      cta: 'Format Exam Answer',
    },
    {
      id: 'diagram',
      title: 'Generate Diagram',
      icon: <GitBranch className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-100 dark:border-rose-900',
      description: 'Visualize difficult concepts into architectural diagrams and sequence flows.',
      cta: 'Open Diagram Studio',
    },
  ];

  const handleToolClick = (id: string) => {
    if (id === 'diagram') {
      navigateTo('diagrams');
    } else {
      setActiveModal(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Academic Study Toolkit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Study Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          High-yield academic synthesis tools tailored specifically for university exam prep, revision notes, and self-testing.
        </p>
      </div>

      {/* 6 Study Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t) => (
          <div
            key={t.id}
            className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className={`w-12 h-12 rounded-xl ${t.bg} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                {t.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleToolClick(t.id)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Workbench for Tools */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                  {activeModal === 'flashcards' && '🧠 Active Recall Flashcards'}
                  {activeModal === 'quiz' && '📊 Practice Quiz: Deadlocks & Memory'}
                  {activeModal === 'exam' && '✍️ University Exam Mark Formatter'}
                  {activeModal === 'summarize' && '📝 Chapter Summary Generator'}
                  {activeModal === 'questions' && '❓ Targeted Question Bank'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Context: {selectedDocument.title}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6">
              {/* Tool 1: Flashcards */}
              {activeModal === 'flashcards' && (
                <div className="space-y-4 text-center">
                  <div className="text-xs text-slate-400 font-mono">
                    Card {currentFcIndex + 1} of {mockFlashcards.length} • Difficulty: {mockFlashcards[currentFcIndex].difficulty}
                  </div>

                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="cursor-pointer min-h-[200px] p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/60 border-2 border-indigo-200 dark:border-indigo-900/60 flex flex-col items-center justify-center shadow-xs transition-all hover:border-indigo-400"
                  >
                    <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider mb-2">
                      {isFlipped ? 'ANSWER (CLICK TO FLIP)' : 'QUESTION (CLICK TO REVEAL)'}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white whitespace-pre-line leading-relaxed">
                      {isFlipped
                        ? mockFlashcards[currentFcIndex].back
                        : mockFlashcards[currentFcIndex].front}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentFcIndex((prev) => (prev > 0 ? prev - 1 : mockFlashcards.length - 1));
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      <ChevronLeft className="w-4 h-4 inline mr-1" /> Previous
                    </button>
                    <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
                    >
                      Flip Card
                    </button>
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentFcIndex((prev) => (prev < mockFlashcards.length - 1 ? prev + 1 : 0));
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Next <ChevronRight className="w-4 h-4 inline ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tool 2: Quiz Me */}
              {activeModal === 'quiz' && (
                <div className="space-y-4">
                  {mockQuizQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedQuizAnswers[q.id] === oIdx;
                          const isCorrect = q.correctIndex === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                setSelectedQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                              }}
                              className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                isSelected
                                  ? showQuizScore
                                    ? isCorrect
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                                    : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-300'
                                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      {showQuizScore && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 italic">
                          💡 {q.explanation} (Source: Page {q.sourcePage})
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setShowQuizScore(true)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                    >
                      Submit & Check Answers
                    </button>
                  </div>
                </div>
              )}

              {/* Tool 3: Exam Answer Mark Formatter */}
              {activeModal === 'exam' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-2">
                      Select Target Mark Value:
                    </label>
                    <div className="flex gap-2">
                      {[2, 5, 13, 16].map((marks) => (
                        <button
                          key={marks}
                          onClick={() => setExamMarks(marks)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                            examMarks === marks
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {marks} Marks
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Sample Formatted Structure for {examMarks} Marks:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {examMarks === 2 && '• Concise 2-line definition • Single key example or condition.'}
                      {examMarks === 5 && '• Formal definition (1 mark) • Core numbered points with diagrams/formulas (3 marks) • Primary real-world limitation or exception (1 mark).'}
                      {examMarks >= 13 && '• Section I: System Model & Mathematical Notation • Section II: Exhaustive proofs and edge-cases • Section III: Comparative Trade-off Table • Section IV: Practical Kernel Implementation.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      navigateTo('study', selectedDocument.id, 421);
                      showToast(`Opening Study Session formatted for ${examMarks}-mark answers`, 'success');
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                  >
                    Open Study Mode with {examMarks}-Mark Setting
                  </button>
                </div>
              )}

              {/* Tool 4: Summarize & Questions */}
              {(activeModal === 'summarize' || activeModal === 'questions') && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Generating structured outputs from Chapter 6: Deadlocks (pp. 410–484)...
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      StudyPilot will extract all definitions, theorems, and professor notes into a 2-page cheat-sheet.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      showToast('Generated summary copied to active study notebook!', 'success');
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                  >
                    Generate & Download PDF Cheat Sheet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
