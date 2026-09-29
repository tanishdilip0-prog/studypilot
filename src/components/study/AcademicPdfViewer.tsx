import React, { useState, useEffect } from 'react';
import { PDFPageViewData } from '../../types';
import { DocumentService } from '../../services/documentService';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  Highlighter,
  Download,
  RotateCw,
  FileText,
  Bookmark,
} from 'lucide-react';

interface AcademicPdfViewerProps {
  documentId: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  highlightQuery?: string | null;
}

export const AcademicPdfViewer: React.FC<AcademicPdfViewerProps> = ({
  documentId,
  currentPage,
  totalPages,
  onPageChange,
  highlightQuery,
}) => {
  const [pageData, setPageData] = useState<PDFPageViewData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [pageSearch, setPageSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    DocumentService.getPageContent(documentId, currentPage).then((data) => {
      if (isMounted) {
        setPageData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [documentId, currentPage]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(150, Math.max(75, prev + delta)));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isHighlighted = (text: string) => {
    if (!highlightQuery && !pageSearch) return false;
    const query = (pageSearch || highlightQuery || '').toLowerCase();
    return text.toLowerCase().includes(query);
  };

  return (
    <div className="h-full flex flex-col bg-slate-200/70 dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 select-text">
      {/* Top PDF Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 text-xs shadow-2xs z-10">
        {/* Page Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-300 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  onPageChange(val);
                }
              }}
              className="w-12 text-center py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-300 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 border-x border-slate-200 dark:border-slate-800 px-3">
          <button
            onClick={() => handleZoom(-15)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-mono text-[11px] text-slate-500">
            {zoomLevel}%
          </span>
          <button
            onClick={() => handleZoom(15)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
          >
            Fit
          </button>
        </div>

        {/* Tools (Search, Bookmark, Highlighting) */}
        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                placeholder="Find in page..."
                className="w-24 text-[11px] bg-transparent focus:outline-none text-slate-800 dark:text-slate-200"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setPageSearch('');
                }}
                className="text-[10px] text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              title="Search in current page"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-500'
            }`}
            title="Bookmark this page"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Vector Chunk
          </span>
        </div>
      </div>

      {/* Realistic Academic PDF Canvas Sheet */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
        <div
          className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-xl rounded-md transition-all duration-200 flex flex-col justify-between"
          style={{
            width: `${Math.round(680 * (zoomLevel / 100))}px`,
            minHeight: `${Math.round(880 * (zoomLevel / 100))}px`,
            padding: `${Math.round(48 * (zoomLevel / 100))}px`,
          }}
        >
          {pageData ? (
            <div className="space-y-5 text-slate-800 dark:text-slate-200">
              {/* PDF Running Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 text-[10px] font-serif uppercase tracking-widest text-slate-400">
                <span>CHAPTER {pageData.chapterNumber}: {pageData.chapterTitle.toUpperCase()}</span>
                <span>SECTION {pageData.sectionNumber}</span>
              </div>

              {/* Main Academic Title */}
              <div className="pt-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-slate-950 dark:text-white">
                  {pageData.heading}
                </h1>
                <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-400 mt-2 mb-4" />
              </div>

              {/* Body Paragraphs with Active Highlight Sync */}
              <div className="space-y-4 font-serif text-sm leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
                {pageData.bodyParagraphs.map((para, idx) => {
                  const highlighted = isHighlighted(para);
                  return (
                    <p
                      key={idx}
                      className={`transition-colors duration-200 p-1.5 rounded ${
                        highlighted
                          ? 'bg-amber-100/90 dark:bg-amber-950/70 border-l-4 border-amber-500 font-medium text-slate-900 dark:text-amber-100'
                          : ''
                      }`}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Academic Table or Diagram Box in PDF */}
              {pageData.tableOrFigure && (
                <div className="my-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                  <div className="text-[11px] font-sans font-bold text-slate-900 dark:text-white mb-2">
                    {pageData.tableOrFigure.caption}
                  </div>
                  <pre className="whitespace-pre-wrap text-slate-600 dark:text-slate-400 overflow-x-auto leading-relaxed">
                    {pageData.tableOrFigure.content}
                  </pre>
                </div>
              )}

              {/* Key Concept Callout Box */}
              {pageData.keyTerms && pageData.keyTerms.length > 0 && (
                <div className="p-3.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600 text-xs font-sans space-y-1">
                  <span className="font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wide text-[10px] block">
                    Core Mathematical Invariant
                  </span>
                  {pageData.keyTerms.map((kt, i) => (
                    <p key={i} className="text-slate-700 dark:text-slate-300">
                      <strong className="text-indigo-900 dark:text-indigo-300">{kt.term}:</strong> {kt.definition}
                    </p>
                  ))}
                </div>
              )}

              {/* PDF Running Footer */}
              <div className="pt-8 mt-auto border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-serif text-slate-400">
                <span>Silberschatz & Galvin • Operating System Principles</span>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                  {pageData.pageNumber}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-2">
              <FileText className="w-8 h-8 animate-pulse text-indigo-500" />
              <span className="text-xs">Rendering PDF Vector Page...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
