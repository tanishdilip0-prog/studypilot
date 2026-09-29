import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicDocument } from '../types';
import {
  FileText,
  Search,
  Filter,
  Grid,
  List,
  UploadCloud,
  CheckCircle2,
  Loader2,
  Clock,
  MoreVertical,
  ArrowRight,
  Trash2,
  RefreshCw,
  FolderOpen,
  BookOpen,
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const {
    documents,
    navigateTo,
    setIsUploadModalOpen,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'pages'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeMenuDocId, setActiveMenuDocId] = useState<string | null>(null);

  const subjects = ['All', 'Computer Systems', 'Networking & Telecommunications', 'Data Engineering', 'Theory of Computation'];

  // Filter & Sort
  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'All' || doc.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'pages') return b.totalPages - a.totalPages;
      return 0; // default recent
    });

  const handleAction = (action: string, doc: AcademicDocument) => {
    setActiveMenuDocId(null);
    if (action === 'reindex') {
      showToast(`Re-indexing "${doc.title}"...`, 'info');
      navigateTo('processing');
    } else if (action === 'summary') {
      showToast(`Generating executive summary for "${doc.title}"`, 'success');
      navigateTo('tools');
    } else if (action === 'delete') {
      showToast(`Document "${doc.title}" deleted from cache`, 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Title & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your indexed textbooks, syllabus notes, and research materials
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, subject, or keywords..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 dark:text-slate-200"
          />
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Filter Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="recent">Sort by: Recently Studied</option>
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="pages">Sort by: Page Count (High to Low)</option>
          </select>

          {/* Grid / List Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Content / Results */}
      {filteredDocuments.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No documents yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Upload your first set of notes to start studying with AI grounded answers and citations.
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Notes Now</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => {
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

                    <div className="flex items-center gap-2">
                      {isProcessing ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Indexing ({doc.processingProgress}%)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Processed</span>
                        </span>
                      )}

                      {/* More Menu Button */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenuDocId(activeMenuDocId === doc.id ? null : doc.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuDocId === doc.id && (
                          <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-20 animate-in fade-in">
                            <button
                              onClick={() => handleAction('reindex', doc)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
                              Re-index Document
                            </button>
                            <button
                              onClick={() => handleAction('summary', doc)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                              Generate Summary
                            </button>
                            <button
                              onClick={() => handleAction('delete', doc)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {doc.subject}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {doc.totalPages} pages • {doc.fileSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.lastStudied}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3">
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
                    <span>{isProcessing ? 'View Processing State' : 'Open in Study Mode'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          {filteredDocuments.map((doc) => {
            const isProcessing = doc.status === 'processing';
            return (
              <div
                key={doc.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {doc.subject} • {doc.totalPages} pages • {doc.fileSize} • Last studied {doc.lastStudied}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{doc.processingProgress}%</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Ready</span>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      if (isProcessing) {
                        navigateTo('processing');
                      } else {
                        navigateTo('study', doc.id, 421);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {isProcessing ? 'Status' : 'Study'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
