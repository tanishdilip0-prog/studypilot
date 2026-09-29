import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentNavSidebar } from '../components/study/DocumentNavSidebar';
import { AcademicPdfViewer } from '../components/study/AcademicPdfViewer';
import { AiAnswerPanel } from '../components/study/AiAnswerPanel';
import {
  FileText,
  Sparkles,
  ListTree,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  SidebarClose,
  SidebarOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

export const StudyPage: React.FC = () => {
  const {
    selectedDocument,
    currentPageNumber,
    setCurrentPageNumber,
    highlightedText,
    setHighlightedText,
    showToast,
  } = useApp();

  const [activeMobileTab, setActiveMobileTab] = useState<'pdf' | 'ai' | 'toc'>('ai');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleJumpToSource = (page: number, excerpt: string) => {
    setCurrentPageNumber(page);
    setHighlightedText(excerpt);
    showToast(`Jumped to Page ${page}: highlighted source excerpt`, 'info');
    // If mobile, switch view to PDF viewer so student sees highlighted text
    if (window.innerWidth < 1024) {
      setActiveMobileTab('pdf');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Mobile / Tablet Tab Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 text-xs font-semibold">
        <button
          onClick={() => setActiveMobileTab('toc')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeMobileTab === 'toc'
              ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ListTree className="w-4 h-4" />
          <span>Contents</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('pdf')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeMobileTab === 'pdf'
              ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>PDF Page {currentPageNumber}</span>
        </button>
        <button
          onClick={() => setActiveMobileTab('ai')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeMobileTab === 'ai'
              ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>AI Answers</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Document TOC (Desktop: 260px wide, or collapsed) */}
        <div
          className={`hidden lg:block transition-all duration-250 ease-in-out shrink-0 ${
            isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64 xl:w-72'
          }`}
        >
          <DocumentNavSidebar
            document={selectedDocument}
            currentPage={currentPageNumber}
            onSelectPage={(page) => {
              setCurrentPageNumber(page);
              setHighlightedText(null);
            }}
          />
        </div>

        {/* Mobile TOC Drawer View */}
        <div className={`lg:hidden w-full h-full ${activeMobileTab === 'toc' ? 'block' : 'hidden'}`}>
          <DocumentNavSidebar
            document={selectedDocument}
            currentPage={currentPageNumber}
            onSelectPage={(page) => {
              setCurrentPageNumber(page);
              setHighlightedText(null);
              setActiveMobileTab('pdf');
            }}
          />
        </div>

        {/* CENTER COLUMN: PDF Viewer (Responsive) */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${
            activeMobileTab === 'pdf' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <AcademicPdfViewer
            documentId={selectedDocument.id}
            currentPage={currentPageNumber}
            totalPages={selectedDocument.totalPages}
            onPageChange={(p) => {
              setCurrentPageNumber(p);
              setHighlightedText(null);
            }}
            highlightQuery={highlightedText}
          />
        </div>

        {/* RIGHT COLUMN: AI Answer Panel (Desktop: 380px–420px wide) */}
        <div
          className={`shrink-0 w-full lg:w-96 xl:w-[420px] ${
            activeMobileTab === 'ai' ? 'block' : 'hidden lg:block'
          }`}
        >
          <AiAnswerPanel
            documentId={selectedDocument.id}
            currentPage={currentPageNumber}
            onJumpToSource={handleJumpToSource}
          />
        </div>
      </div>
    </div>
  );
};
