export * from './chunk';
export * from './document';

export interface Citation {
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  pageRange?: string;
  sectionTitle?: string;
  excerpt: string;
  relevanceScore?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: Citation[];
  quickActions?: string[];
  suggestedFollowUps?: string[];
  examMarks?: number;
  isStreaming?: boolean;
}

export interface PDFPageViewData {
  pageNumber: number;
  totalDocumentPages: number;
  chapterNumber: number;
  chapterTitle: string;
  sectionNumber: string;
  sectionTitle: string;
  heading: string;
  bodyParagraphs: string[];
  highlightText?: string;
  keyTerms?: { term: string; definition: string }[];
  tableOrFigure?: {
    caption: string;
    type: 'table' | 'figure' | 'algorithm';
    content: string;
  };
}

export interface DiagramStep {
  step: number;
  from: string;
  to: string;
  label: string;
  flag?: string;
  description: string;
  status?: 'active' | 'complete' | 'pending';
}

export interface DiagramModel {
  id: string;
  title: string;
  concept: string;
  type: 'sequence' | 'lifecycle' | 'layers' | 'flow';
  sourceDocument: string;
  sourcePages: string;
  description: string;
  confidence: number;
  steps?: DiagramStep[];
  nodes?: { id: string; label: string; sub?: string; state?: string }[];
  connections?: { from: string; to: string; label: string; style?: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourcePage: number;
  topic: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  sourcePage: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  degree: string;
  year: string;
  avatarUrl: string;
  storageUsedGB: number;
  storageTotalGB: number;
  stats: {
    documentsUploaded: number;
    pagesIndexed: number;
    questionsAnswered: number;
    studyHours: number;
  };
}

export interface UserPreferences {
  answerStyle: 'academic' | 'intuitive' | 'concise';
  defaultAnswerLength: 'concise' | 'balanced' | 'detailed';
  preferredLanguage: string;
  aiThinkingMode: 'fast' | 'balanced' | 'deep';
  citationDepth: 'strict-page' | 'chapter-level';
  theme: 'light' | 'dark' | 'system';
  showConfidenceScores: boolean;
  latexMathRendering: boolean;
}

export type ActivePage = 
  | 'landing'
  | 'dashboard'
  | 'documents'
  | 'study'
  | 'copilot'
  | 'diagrams'
  | 'tools'
  | 'processing'
  | 'settings';
