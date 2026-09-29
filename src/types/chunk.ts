export interface DocumentChunk {
  chunkId: string;
  documentId: string;
  pageNumber: number;
  text: string;
  section?: string;
  startIndex?: number;
  endIndex?: number;
  wordCount?: number;
}

export interface ChunkingOptions {
  chunkSize: number; // in characters or words
  chunkOverlap: number;
  splitByParagraphs?: boolean;
}
