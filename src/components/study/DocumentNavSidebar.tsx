import React, { useState } from 'react';
import { AcademicDocument } from '../../types';
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Bookmark,
  FileText,
  Layers,
} from 'lucide-react';

interface DocumentNavSidebarProps {
  document: AcademicDocument;
  currentPage: number;
  onSelectPage: (page: number) => void;
}

export const DocumentNavSidebar: React.FC<DocumentNavSidebarProps> = ({
  document,
  currentPage,
  onSelectPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch-6': true, // Chapter 6: Deadlocks expanded by default
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const filteredChapters = document.chapters.filter((ch) =>
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.sections?.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 text-xs">
      {/* Document Header */}
      <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="truncate">{document.subject}</span>
        </div>
        <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
          {document.title}
        </h2>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
          <span>{document.totalPages} total pages</span>
          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            p. {currentPage} active
          </span>
        </div>
      </div>

      {/* In-Document Search */}
      <div className="p-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters or topics..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table of Contents Header */}
      <div className="px-4 py-2 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        <span>Table of Contents</span>
        <span>Start Page</span>
      </div>

      {/* Chapters & Sections List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredChapters.map((chapter) => {
          const isExpanded = !!expandedChapters[chapter.id];
          const isCurrentChapter =
            currentPage >= chapter.pageStart && currentPage <= chapter.pageEnd;

          return (
            <div key={chapter.id} className="rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  toggleChapter(chapter.id);
                  onSelectPage(chapter.pageStart);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  isCurrentChapter
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {chapter.sections && chapter.sections.length > 0 ? (
                    isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">
                    {chapter.number}. {chapter.title}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 shrink-0 ml-2">
                  p. {chapter.pageStart}
                </span>
              </button>

              {/* Sections child list */}
              {isExpanded && chapter.sections && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-slate-100 dark:border-slate-800 ml-3">
                  {chapter.sections.map((sec) => {
                    const isSecActive = currentPage === sec.page;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => onSelectPage(sec.page)}
                        className={`w-full flex items-center justify-between py-1 px-2 rounded-md text-[11px] transition-colors ${
                          isSecActive
                            ? 'bg-indigo-600 text-white font-medium shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <span className="truncate">{sec.title}</span>
                        <span className={`font-mono text-[10px] ml-1 ${isSecActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {sec.page}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Jump Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">Jump to Deadlocks:</span>
        <button
          onClick={() => onSelectPage(421)}
          className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] hover:bg-indigo-100 transition-colors"
        >
          p. 421 (Sec 7.4)
        </button>
      </div>
    </div>
  );
};
