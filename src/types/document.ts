import { DocumentChunk } from './chunk';

export type DocumentStatus = 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED' | 'processed' | 'processing' | 'error' | 'uploaded';

export type DocumentProcessingStage =
  | 'UPLOAD'
  | 'VALIDATING'
  | 'EXTRACTING_TEXT'
  | 'IDENTIFYING_PAGES'
  | 'CHUNKING'
  | 'COMPLETED'
  | 'FAILED';

export interface Section {
  id: string;
  title: string;
  page: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  sections?: Section[];
}

export interface ExtractedPage {
  documentId: string;
  pageNumber: number;
  text: string;
  wordCount: number;
  sectionTitle?: string;
}

export interface AcademicDocument {
  id: string;
  title: string;
  subject: string;
  totalPages: number;
  status: DocumentStatus;
  currentStage?: DocumentProcessingStage;
  processingProgress: number; // 0-100
  lastStudied: string;
  uploadedAt: string;
  fileSize: string;
  fileSizeBytes?: number;
  authorOrCourse?: string;
  chapters: Chapter[];
  color: string;
  description: string;
  badge?: string;
  extractedPages?: ExtractedPage[];
  chunks?: DocumentChunk[];
  errorMessage?: string;
}

export interface PDFValidationResult {
  isValid: boolean;
  error?: string;
  pageCount?: number;
  fileSize: number;
  fileSizeFormatted: string;
  isEncrypted?: boolean;
  hasText?: boolean;
}

export interface DocumentSearchResult {
  pageNumber: number;
  section: string;
  excerpt: string;
  matchCount: number;
  chunkId?: string;
}
