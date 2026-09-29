import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Sliders,
  Sparkles,
  Palette,
  Shield,
  Trash2,
  Download,
  Save,
  CheckCircle2,
  HardDrive,
  GraduationCap,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    user,
    preferences,
    updatePreferences,
    theme,
    toggleTheme,
    showToast,
  } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [university, setUniversity] = useState(user.university);
  const [answerStyle, setAnswerStyle] = useState(preferences.answerStyle);
  const [defaultLength, setDefaultLength] = useState(preferences.defaultAnswerLength);
  const [aiMode, setAiMode] = useState(preferences.aiThinkingMode);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information saved', 'success');
  };

  const handleSaveStudyPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      answerStyle,
      defaultAnswerLength: defaultLength,
      aiThinkingMode: aiMode,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your academic profile, AI reasoning depth, citations, and theme.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Profile */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student Profile
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <button
                  type="button"
                  onClick={() => showToast('Avatar updated', 'info')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Change Photo
                </button>
                <span className="block text-[11px] text-slate-400 mt-1">
                  JPG or PNG up to 5MB
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Academic Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  University & Department
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Study Preferences */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Study & Exam Preferences
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Answer Style
              </label>
              <select
                value={answerStyle}
                onChange={(e) => setAnswerStyle(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="academic">Academic & Rigorous (Proofs & Formulas)</option>
                <option value="intuitive">Intuitive & Explanatory (Analogies first)</option>
                <option value="concise">Concise Revision Points</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Default Answer Length
              </label>
              <select
                value={defaultLength}
                onChange={(e) => setDefaultLength(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="concise">Concise (2-Mark Quick Answer)</option>
                <option value="balanced">Balanced (5-Mark Standard Question)</option>
                <option value="detailed">Detailed (13/16-Mark Comprehensive)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Preferred Study Language
              </label>
              <input
                type="text"
                disabled
                value="English (Academic US)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                AI Reasoning Engine Mode
              </label>
              <select
                value={aiMode}
                onChange={(e) => setAiMode(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="fast">Fast Recall (Ultra-low latency)</option>
                <option value="balanced">Balanced Synthesis</option>
                <option value="deep">Deep Chain-of-Thought (Mathematical proofs)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveStudyPrefs}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Update Study Preferences
            </button>
          </div>
        </div>

        {/* Section 3: Appearance */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Appearance
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Interface Color Scheme
              </p>
              <p className="text-[11px] text-slate-400">
                Currently using {theme === 'dark' ? 'Dark' : 'Light'} theme for high-contrast reading
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (theme !== 'light') toggleTheme();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  theme === 'light'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => {
                  if (theme !== 'dark') toggleTheme();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  theme === 'dark'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Storage & Privacy */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Storage & Data Governance
            </h3>
          </div>

          {/* Storage Quota */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Document Vector Storage
              </span>
              <span className="font-mono text-slate-500">
                {user.storageUsedGB} GB of {user.storageTotalGB} GB used (21.9%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${(user.storageUsedGB / user.storageTotalGB) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={() => showToast('Exporting student notes archive (.zip)...', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All Notes & Citations</span>
            </button>

            <button
              onClick={() => showToast('Cached index vectors cleared', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cached Embeddings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
