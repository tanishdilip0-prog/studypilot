import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockCopilotChat } from '../data/mockData';
import { ChatMessage } from '../types';
import { AIService } from '../services/aiService';
import {
  Bot,
  Sparkles,
  Send,
  BookOpen,
  FileText,
  Lightbulb,
  HelpCircle,
  ListPlus,
  BookMarked,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const CopilotPage: React.FC = () => {
  const { selectedDocument, navigateTo } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(mockCopilotChat);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickActionCards = [
    { title: 'Explain simpler', icon: <Sparkles className="w-4 h-4 text-amber-500" />, desc: 'Deconstruct jargon into straightforward language' },
    { title: 'Give an analogy', icon: <Lightbulb className="w-4 h-4 text-indigo-500" />, desc: 'Real-world comparisons that make concepts click' },
    { title: 'Give an example', icon: <FileText className="w-4 h-4 text-emerald-500" />, desc: 'Concrete code or numerical calculation example' },
    { title: 'Create MCQs', icon: <HelpCircle className="w-4 h-4 text-violet-500" />, desc: 'Active recall questions for exam practice' },
    { title: 'Summarize', icon: <BookMarked className="w-4 h-4 text-blue-500" />, desc: 'High-yield revision bullet points' },
    { title: 'Create revision notes', icon: <ListPlus className="w-4 h-4 text-rose-500" />, desc: 'Formula sheet and structured cramming guide' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `copilot-user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      if (text.toLowerCase().includes('analogy') || text.toLowerCase().includes('simpler')) {
        const reply = await AIService.executeQuickAction('Explain simpler', 'Virtual Memory', selectedDocument.id);
        setMessages((prev) => [...prev, reply]);
      } else {
        const reply = await AIService.askQuestion(selectedDocument.id, text, 512);
        setMessages((prev) => [...prev, reply]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)] flex flex-col animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Study Copilot
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive academic tutoring grounded in your syllabus notes
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(mockCopilotChat)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* 3-Column Layout: Left (Context) | Center (Chat Stream) | Right (Quick Actions) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 pt-6">
        {/* LEFT COLUMN: Context Info (3 cols) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 overflow-y-auto pr-1">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Current Context</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedDocument.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedDocument.subject}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
              <span className="text-[11px] font-semibold text-indigo-900 dark:text-indigo-200 block">
                Active Pages Scope:
              </span>
              <p className="text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300 mt-0.5">
                Pages 510–524 (Virtual Memory & Paging)
              </p>
            </div>

            <button
              onClick={() => navigateTo('study', selectedDocument.id, 512)}
              className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 transition-colors"
            >
              <span>View Source in PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Syllabus Terms */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Extracted Key Terms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Demand Paging', 'TLB Hit Ratio', 'Page Fault Trap', 'Working Set Model', 'Thrashing', 'Frame Allocation'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSendMessage(`Explain ${term} in detail with exam points.`)}
                  className="px-2 py-1 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Copilot Conversation (6 cols) */}
        <div className="lg:col-span-6 flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-indigo-600 text-white p-3 text-xs font-medium shadow-xs">
                    {msg.content}
                    <span className="block text-[9px] text-indigo-200 text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : (
                  <div className="max-w-[95%] w-full space-y-2">
                    <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line shadow-2xs">
                      {msg.content}

                      {/* Source Citation */}
                      {msg.citations && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">
                            Context Reference:
                          </span>
                          {msg.citations.map((c, i) => (
                            <div
                              key={i}
                              onClick={() => navigateTo('study', c.documentId, c.pageNumber)}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium cursor-pointer hover:underline"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{c.documentTitle} • {c.pageRange}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 p-3 text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-950/40 rounded-xl w-fit">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Copilot is formulating an academic explanation...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your Copilot a question..."
                className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto">
          <div className="px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Study Actions
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              One-click transformations for fast learning
            </p>
          </div>

          <div className="space-y-2">
            {quickActionCards.map((act) => (
              <button
                key={act.title}
                onClick={() => handleSendMessage(act.title)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/20 text-left transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {act.icon}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {act.title}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  {act.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
