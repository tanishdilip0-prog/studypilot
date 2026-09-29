import { PDFValidationResult } from '../types/document';

/**
 * Format bytes into human-readable string (e.g. 124 MB, 4.2 MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Comprehensive client-side PDF validation
 * - Checks file extension and MIME type
 * - Checks for 0-byte or empty file
 * - Enforces 1GB maximum size limit
 * - Inspects header magic bytes (%PDF) to detect corrupted or renamed non-PDF files
 */
export async function validatePDFFile(file: File): Promise<PDFValidationResult> {
  const fileSize = file.size;
  const fileSizeFormatted = formatFileSize(fileSize);

  // 1. Check empty file
  if (fileSize === 0) {
    return {
      isValid: false,
      error: 'The selected file is empty (0 bytes). Please select a valid academic PDF.',
      fileSize,
      fileSizeFormatted,
    };
  }

  // 2. Check 1GB max limit
  const MAX_SIZE_BYTES = 1024 * 1024 * 1024; // 1 GB
  if (fileSize > MAX_SIZE_BYTES) {
    return {
      isValid: false,
      error: 'The document exceeds the 1GB maximum size limit. Please upload a smaller section or compress the PDF.',
      fileSize,
      fileSizeFormatted,
    };
  }

  // 3. Check extension
  const hasPdfExtension = file.name.toLowerCase().endsWith('.pdf');
  const isPdfMime = file.type === 'application/pdf' || file.type === '';

  if (!hasPdfExtension && file.type !== 'application/pdf') {
    return {
      isValid: false,
      error: 'Unsupported file format. StudyPilot only accepts PDF documents (.pdf).',
      fileSize,
      fileSizeFormatted,
    };
  }

  // 4. Verify magic bytes (%PDF) in file header
  try {
    const headerSlice = file.slice(0, 8);
    const buffer = await headerSlice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const headerString = String.fromCharCode(...bytes);

    if (!headerString.startsWith('%PDF-')) {
      return {
        isValid: false,
        error: 'The file appears to be corrupted or is not a genuine PDF document.',
        fileSize,
        fileSizeFormatted,
      };
    }
  } catch (err) {
    return {
      isValid: false,
      error: 'Unable to read the document. The file may be damaged or locked.',
      fileSize,
      fileSizeFormatted,
    };
  }

  return {
    isValid: true,
    fileSize,
    fileSizeFormatted,
  };
}
