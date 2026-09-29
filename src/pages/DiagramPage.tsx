import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AIService } from '../services/aiService';
import { DiagramModel } from '../types';
import { mockDiagrams } from '../data/mockData';
import {
  GitBranch,
  Sparkles,
  Download,
  RotateCcw,
  BookmarkPlus,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Share2,
} from 'lucide-react';

export const DiagramPage: React.FC = () => {
  const { showToast } = useApp();
  const [prompt, setPrompt] = useState('Explain the TCP three-way handshake.');
  const [currentDiagram, setCurrentDiagram] = useState<DiagramModel>(mockDiagrams[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(3);

  const presets = [
    'Explain the TCP three-way handshake.',
    'Operating System Process State Lifecycle',
    'Deadlock Resource Allocation Graph Cycle',
  ];

  const handleGenerate = async (queryText?: string) => {
    const text = queryText || prompt;
    if (!text.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const diagram = await AIService.generateDiagram(text);
      setCurrentDiagram(diagram);
      setActiveStep(diagram.steps ? diagram.steps.length : 1);
      showToast(`Generated: ${diagram.title}`, 'success');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    showToast('Vector SVG diagram downloaded to your device', 'success');
  };

  const handleAddToNotes = () => {
    showToast('Diagram attached to your active study guide', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Visual Synthesis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Generate a Diagram
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Turn dense syllabus explanations into clean architectural flowcharts, sequence diagrams, and protocol handshakes.
        </p>
      </div>

      {/* Input Box Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Describe the concept you want to visualize
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Explain the TCP three-way handshake."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={!prompt.trim() || isGenerating}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs shadow-xs transition-colors shrink-0"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4" />
                <span>Generate Diagram</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-400 font-medium">Try asking:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setPrompt(preset);
                handleGenerate(preset);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Diagram Viewer */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden">
        {/* Diagram Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50/70 dark:bg-slate-950/70 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
              Generated Visual Model • {currentDiagram.type.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {currentDiagram.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerate()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG</span>
            </button>
            <button
              onClick={handleAddToNotes}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Add to Notes</span>
            </button>
          </div>
        </div>

        {/* Diagram Canvas Body */}
        <div className="p-6 sm:p-10 flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-950/30 min-h-[380px]">
          {/* 1. Sequence Diagram: TCP 3-Way Handshake */}
          {currentDiagram.type === 'sequence' && currentDiagram.steps && (
            <div className="w-full max-w-2xl space-y-6">
              {/* Host Headers */}
              <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-700 dark:text-slate-200 px-4">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-center w-44 shadow-2xs">
                  💻 Client Host
                  <span className="block text-[10px] font-normal text-slate-500">Port 54321 • SYN_SENT</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center w-44 shadow-2xs">
                  🖥️ Server Host
                  <span className="block text-[10px] font-normal text-slate-500">Port 443 • LISTEN</span>
                </div>
              </div>

              {/* Handshake Step 1: Client -> SYN -> Server */}
              <div className="relative p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs hover:border-indigo-400 transition-all">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                    Client ──► SYN (Synchronize Sequence) ──► Server
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                    SYN=1, Seq=x
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Client generates random Initial Sequence Number (ISN) $x$ and requests connection state initialization.
                </p>
              </div>

              {/* Handshake Step 2: Client <- SYN + ACK <- Server */}
              <div className="relative p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs hover:border-emerald-400 transition-all">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                    Client ◄── SYN + ACK (Acknowledge + Sync) ◄── Server
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                    SYN=1, ACK=1, Seq=y, Ack=x+1
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Server confirms receipt of $x$ by demanding $x+1$, chooses its own sequence number $y$, and transitions to SYN_RCVD.
                </p>
              </div>

              {/* Handshake Step 3: Client -> ACK -> Server */}
              <div className="relative p-4 rounded-xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900/60 shadow-xs hover:border-violet-400 transition-all">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px]">3</span>
                    Client ──► ACK (Connection Established) ──► Server
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold">
                    ACK=1, Seq=x+1, Ack=y+1
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Client acknowledges server's sequence number $y$. Sockets on both ends transition to ESTABLISHED state; payload data may now be transmitted.
                </p>
              </div>
            </div>
          )}

          {/* 2. Lifecycle Diagram: OS 5-State Model */}
          {currentDiagram.type === 'lifecycle' && currentDiagram.nodes && (
            <div className="w-full max-w-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {currentDiagram.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-indigo-500 uppercase block font-semibold">
                      State
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {node.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {node.sub}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200 text-center">
                <strong>Transitions:</strong> New ──(admitted)──► Ready ◄──(interrupt / dispatch)──► Running ──(exit)──► Terminated. (I/O blocks send Running to Waiting).
              </div>
            </div>
          )}

          {/* 3. Resource Allocation Graph: Deadlock Cycle */}
          {currentDiagram.type === 'flow' && (
            <div className="w-full max-w-2xl p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                  ⚠️ Circular Dependency Detected
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  P1 holds R1 and requests R2; P2 holds R2 and requests R1.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center space-y-2">
                <div>(Process P1) ────[Requests]────► (Resource R2)</div>
                <div>▲                                       │</div>
                <div>[Held By]                               [Held By]</div>
                <div>│                                       ▼</div>
                <div>(Resource R1) ◄───[Requests]──── (Process P2)</div>
              </div>
            </div>
          )}
        </div>

        {/* Diagram Footer with Source Grounding */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Based on: {currentDiagram.sourceDocument}
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">
              {currentDiagram.sourcePages}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verification Confidence: <strong>{currentDiagram.confidence}%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
