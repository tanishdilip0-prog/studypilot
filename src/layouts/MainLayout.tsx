import React from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/common/Toast';
import { UploadModal } from '../components/common/UploadModal';

import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { StudyPage } from '../pages/StudyPage';
import { CopilotPage } from '../pages/CopilotPage';
import { DiagramPage } from '../pages/DiagramPage';
import { StudyToolsPage } from '../pages/StudyToolsPage';
import { ProcessingPage } from '../pages/ProcessingPage';
import { SettingsPage } from '../pages/SettingsPage';

export const MainLayout: React.FC = () => {
  const { activePage } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'study':
        return <StudyPage />;
      case 'copilot':
        return <CopilotPage />;
      case 'diagrams':
        return <DiagramPage />;
      case 'tools':
        return <StudyToolsPage />;
      case 'processing':
        return <ProcessingPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  const isFullHeightStudy = activePage === 'study' || activePage === 'copilot';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 flex flex-col min-h-0">
        {renderActivePage()}
      </main>

      {!isFullHeightStudy && <Footer />}

      <Toast />
      <UploadModal />
    </div>
  );
};
