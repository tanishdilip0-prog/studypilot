import React, { createContext, useContext, useState, useEffect } from 'react';
import { AcademicDocument, ActivePage, UserPreferences, UserProfile } from '../types';
import { defaultPreferences, mockDocuments, mockUser } from '../data/mockData';

interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  navigateTo: (page: ActivePage, documentId?: string, pageNumber?: number) => void;
  documents: AcademicDocument[];
  selectedDocument: AcademicDocument;
  setSelectedDocument: (doc: AcademicDocument) => void;
  currentPageNumber: number;
  setCurrentPageNumber: (page: number) => void;
  highlightedText: string | null;
  setHighlightedText: (text: string | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: UserProfile;
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  addNewDocument: (doc: AcademicDocument) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [documents, setDocuments] = useState<AcademicDocument[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<AcademicDocument>(mockDocuments[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(421);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Keep default light for academic clarity unless toggled or preferred
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(theme === 'light' ? 'Switched to Dark Mode' : 'Switched to Light Mode', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const navigateTo = (page: ActivePage, documentId?: string, pageNumber?: number) => {
    if (documentId) {
      const doc = documents.find((d) => d.id === documentId);
      if (doc) {
        setSelectedDocument(doc);
      }
    }
    if (pageNumber !== undefined) {
      setCurrentPageNumber(pageNumber);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
    showToast('Preferences updated successfully', 'success');
  };

  const addNewDocument = (newDoc: AcademicDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocument(newDoc);
    showToast(`"${newDoc.title}" indexed and ready!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        documents,
        selectedDocument,
        setSelectedDocument,
        currentPageNumber,
        setCurrentPageNumber,
        highlightedText,
        setHighlightedText,
        theme,
        toggleTheme,
        user,
        preferences,
        updatePreferences,
        toast,
        showToast,
        isUploadModalOpen,
        setIsUploadModalOpen,
        addNewDocument,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
