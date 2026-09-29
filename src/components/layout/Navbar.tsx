import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';
import {
  BookOpen,
  LayoutDashboard,
  Files,
  GraduationCap,
  Bot,
  GitBranch,
  Wrench,
  Sun,
  Moon,
  Bell,
  UploadCloud,
  Settings,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    theme,
    toggleTheme,
    user,
    setIsUploadModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'documents', label: 'My Documents', icon: <Files className="w-4 h-4" /> },
    { id: 'study', label: 'Study Sessions', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'copilot', label: 'Copilot', icon: <Bot className="w-4 h-4" /> },
    { id: 'diagrams', label: 'AI Diagrams', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'tools', label: 'Study Tools', icon: <Wrench className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                    Study<span className="text-indigo-600 dark:text-indigo-400">Pilot</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                    AI
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & User */}
          <div className="flex items-center gap-2.5">
            {/* Quick Upload Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors duration-150"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Notes</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-950" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      Study Updates
                    </span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                      Mark all read
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            Operating Systems Notes indexed
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                            842 pages ready for deep semantic Q&A.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            Quiz Ready: Deadlocks & Synchronization
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                            3 active recall questions prepared.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <button
              onClick={() => handleNavClick('settings')}
              className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  {user.name.split(' ')[0]}
                </span>
                <span className="block text-[10px] text-slate-400 leading-none">
                  Stanford CS
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                activePage === item.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsUploadModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
            >
              <UploadCloud className="w-4 h-4" />
              Upload PDF Notes
            </button>
            <button
              onClick={() => handleNavClick('settings')}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <Settings className="w-4 h-4" />
              Settings & Preferences
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
