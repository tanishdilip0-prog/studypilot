import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Citation } from '../../types';
import { AIService } from '../../services/aiService';
import {
  Sparkles,
  Send,
  FileText,
  CornerDownLeft,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Award,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface AiAnswerPanelProps {
  documentId: string;
  currentPage: number;
  onJumpToSource: (page: number, excerpt: string) => void;
}

export const AiAnswerPanel: React.FC<AiAnswerPanelProps> = ({
  documentId,
  currentPage,
  onJumpToSource,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the standard benchmark prompt requested
  useEffect(() => {
    let isMounted = true;
    setIsThinking(true);
    AIService.askQuestion(documentId, 'What is deadlock prevention?', 421).then((initialAnswer) => {
      if (isMounted) {
        setMessages([
          {
            id: 'msg-init-user',
            role: 'user',
            content: 'What is deadlock prevention?',
            timestamp: '10:24 AM',
          },
          initialAnswer,
        ]);
        setIsThinking(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [documentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (queryText?: string) => {
    const text = queryText || inputValue;
    if (!text.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const response = await AIService.askQuestion(documentId, text, currentPage);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    if (isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-qa-${Date.now()}`,
      role: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const response = await AIService.executeQuickAction(action, 'Deadlock prevention', documentId);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800/80 text-xs">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-none">
              StudyPilot AI
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              ● Grounded in Operating Systems Notes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800">
            RAG Active
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* User Message */}
            {msg.role === 'user' ? (
              <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-indigo-600 text-white p-3 shadow-xs font-medium leading-relaxed">
                {msg.content}
                <span className="block text-[9px] text-indigo-200 text-right mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ) : (
              /* AI Message */
              <div className="max-w-full w-full space-y-3">
                <div className="rounded-2xl rounded-tl-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-2xs">
                  {/* Mark Badge if applicable */}
                  {msg.examMarks && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
                      <Award className="w-3 h-3" />
                      <span>{msg.examMarks}-Mark Exam Answer Structure</span>
                    </div>
                  )}

                  {/* Answer Content */}
                  <div className="prose prose-xs dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                    {msg.content}
                  </div>

                  {/* Grounded Sources Section */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Sources</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cite, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => onJumpToSource(cite.pageNumber, cite.excerpt)}
                            className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-400 transition-all text-left shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <div>
                              <span className="font-semibold block text-[11px]">
                                📄 {cite.documentTitle}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                {cite.pageRange || `Page ${cite.pageNumber}`} • {cite.sectionTitle}
                              </span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 shrink-0 ml-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions row: Copy & Quick Academic Buttons */}
                  <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                </div>

                {/* Academic Exam Action Buttons (Under AI response) */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => handleQuickAction('Explain simpler')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
                  >
                    Explain simpler
                  </button>
                  <button
                    onClick={() => handleQuickAction('Give example')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
                  >
                    Give example
                  </button>
                  <button
                    onClick={() => handleQuickAction('Make it a 5-mark answer')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 font-medium text-[11px] transition-colors"
                  >
                    Make it a 5-mark answer
                  </button>
                  <button
                    onClick={() => handleQuickAction('Make it a 13-mark answer')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 font-medium text-[11px] transition-colors"
                  >
                    Make it a 13-mark answer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* AI Thinking Animation State */}
        {isThinking && (
          <div className="flex items-start gap-2.5 max-w-[85%] animate-in fade-in">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-xs bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-200 text-xs flex items-center gap-2">
              <span className="font-medium">StudyPilot is reading your notes...</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask anything about this document..."
            className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 dark:text-slate-100 resize-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Press Enter to send • Shift+Enter for newline</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
            Strict Zero-Hallucination Mode
          </span>
        </div>
      </div>
    </div>
  );
};
