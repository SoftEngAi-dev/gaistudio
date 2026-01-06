import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Play, RotateCcw, Box, Layers, Code2, CheckCircle2, Download, Github, Database, Cloud, Eye, TerminalSquare } from 'lucide-react';
import { INITIAL_AGENTS, MOCK_FILE_SYSTEM } from './constants';
import { Agent, LogEntry, MetricData, AgentStatus } from './types';
import { SimulationService } from './services/simulationService';
import { Terminal } from './components/Terminal';
import { AgentCard } from './components/AgentCard';
import { MetricsChart } from './components/MetricsChart';
import { FileExplorer } from './components/FileExplorer';

export default function App() {
  const [objective, setObjective] = useState("Build an Enterprise SaaS with Firebase Auth, PostgreSQL, and AWS Infra.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string>('text');
  
  const simulationRef = useRef<SimulationService | null>(null);

  const handleStart = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setIsComplete(false);
    setLogs([]);
    setAgents(INITIAL_AGENTS);
    setMetrics([]);
    setSelectedFileContent(null);
    setActiveTab('editor');

    simulationRef.current = new SimulationService(
      INITIAL_AGENTS,
      (updatedAgents) => setAgents(updatedAgents),
      (log) => setLogs(prev => [...prev, log]),
      (cpu, memory) => setMetrics(prev => {
        const newData = [...prev, { time: new Date().toLocaleTimeString(), cpu, memory, tasks: 0 }];
        return newData.slice(-20);
      })
    );

    simulationRef.current.start(objective).then(() => {
      setIsGenerating(false);
      setIsComplete(true);
      // Auto-select landing page for immediate gratification
      const webFolder = MOCK_FILE_SYSTEM[0]?.children?.find(f => f.name === 'apps')?.children?.find(f => f.name === 'web');
      const landingPage = webFolder?.children?.find(f => f.name === 'public')?.children?.find(f => f.name === 'landing-page.html');
      
      if (landingPage) {
        setSelectedFileContent(landingPage.content || null);
        setSelectedFileType(landingPage.language || 'text');
        setActiveTab('preview');
      }
    });
  };

  const handleReset = () => {
    simulationRef.current?.stop();
    setIsGenerating(false);
    setIsComplete(false);
    setAgents(INITIAL_AGENTS);
    setLogs([]);
    setMetrics([]);
    setSelectedFileContent(null);
    setActiveTab('editor');
  };

  const handleFileSelect = (content: string, language: string) => {
    setSelectedFileContent(content);
    setSelectedFileType(language);
    // Auto switch to preview for HTML files
    if (language === 'html' || language === 'markdown') {
        setActiveTab('preview');
    } else {
        setActiveTab('editor');
    }
  };

  const renderPreview = () => {
    if (!selectedFileContent) return null;

    if (selectedFileType === 'html') {
      return (
        <iframe 
          srcDoc={selectedFileContent}
          className="w-full h-full bg-white border-0"
          title="Live Preview"
          sandbox="allow-scripts"
        />
      );
    }

    if (selectedFileType === 'markdown') {
      // Simple simulated markdown rendering
      return (
        <div className="p-8 prose prose-invert max-w-none font-sans overflow-auto h-full bg-gray-900">
           <div className="whitespace-pre-wrap font-sans text-gray-300">
              {selectedFileContent.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mb-4 text-white">{line.replace('# ', '')}</h1>
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-blue-400">{line.replace('## ', '')}</h2>
                  if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>
                  if (line.startsWith('```')) return <div key={i} className="bg-black/50 p-2 my-2 rounded font-mono text-xs opacity-70">Code Block</div>
                  return <p key={i} className="mb-2">{line}</p>
              })}
           </div>
        </div>
      );
    }

    return (
        <div className="flex items-center justify-center h-full text-gray-500">
            Preview not available for this file type.
        </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-100 font-sans">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-950/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 p-1.5 rounded border border-indigo-500/30">
            <Box className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-wide">AutoDev <span className="opacity-50">OS</span></h1>
          </div>
        </div>
        
        {/* Integrations Indicators */}
        <div className="hidden md:flex items-center gap-6 mr-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span>Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span>OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                <span>AWS</span>
            </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono border ${isGenerating ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-green-900/30 bg-green-900/10 text-green-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
            {isGenerating ? 'ORCHESTRATING...' : 'SYSTEM READY'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Agents */}
        <div className="w-72 border-r border-gray-800 bg-[#0A0A0A] flex flex-col">
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Layers className="w-3 h-3" /> Active Agents
            </h2>
            <div className="flex flex-col gap-2 h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
          <div className="p-3 flex-1 flex flex-col justify-end bg-gray-950/30">
            <MetricsChart data={metrics} />
          </div>
        </div>

        {/* Center: Workspace */}
        <div className="flex-1 flex flex-col bg-[#0f0f11]">
          
          {/* Input Area */}
          <div className="p-4 border-b border-gray-800 bg-[#0A0A0A]">
            <div className="max-w-4xl mx-auto w-full flex gap-3">
                <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <input 
                    type="text" 
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    disabled={isGenerating}
                    className="relative w-full bg-black border border-gray-800 rounded-md pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-gray-200 font-mono"
                    placeholder="Describe your full-stack architecture..."
                    />
                    <div className="absolute right-3 top-3.5 text-[10px] text-gray-600 font-mono tracking-tighter">PROMPT</div>
                </div>
                {!isGenerating ? (
                  <button 
                    onClick={handleStart}
                    className="relative px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <Play className="w-3 h-3 fill-current" /> DEPLOY
                  </button>
                ) : (
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/50 rounded-md font-medium text-xs flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> STOP
                  </button>
                )}
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* File Tree */}
            <div className="w-64 border-r border-gray-800 bg-[#0A0A0A] flex flex-col">
              <div className="p-3 border-b border-gray-800 text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2 tracking-wider">
                 <Github className="w-3 h-3" /> Project Files
              </div>
              {isComplete || isGenerating ? (
                <FileExplorer files={MOCK_FILE_SYSTEM} onSelect={handleFileSelect} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-800 text-xs italic p-4 text-center">
                  <Database className="w-8 h-8 mb-2 opacity-20" />
                  <span>Waiting for structure...</span>
                </div>
              )}
            </div>

            {/* Editor / Preview Area */}
            <div className="flex-1 flex flex-col bg-[#111111]">
              <div className="h-9 border-b border-gray-800 bg-[#0A0A0A] flex items-center px-2 justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors ${activeTab === 'editor' ? 'bg-gray-800 text-gray-100' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Code2 className="w-3 h-3" />
                    Code
                  </button>
                  <button 
                     onClick={() => setActiveTab('preview')}
                     className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors ${activeTab === 'preview' ? 'bg-gray-800 text-gray-100' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Eye className="w-3 h-3" />
                    Live Preview
                  </button>
                </div>
                {isComplete && (
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-gray-600">Generated in 12.4s</span>
                     <button className="text-[10px] flex items-center gap-1 text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded">
                       <Download className="w-3 h-3" />
                     </button>
                   </div>
                )}
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                 {selectedFileContent ? (
                   activeTab === 'editor' ? (
                     <div className="h-full overflow-auto custom-scrollbar bg-[#111111]">
                        <pre className="p-6 text-sm font-mono leading-relaxed text-gray-300">
                          <code>{selectedFileContent}</code>
                        </pre>
                     </div>
                   ) : (
                     <div className="h-full bg-white">
                        {renderPreview()}
                     </div>
                   )
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-gray-800">
                     <div className="text-center opacity-40">
                       <TerminalSquare className="w-12 h-12 mx-auto mb-3" />
                       <p className="font-mono text-xs uppercase tracking-widest">Select a file</p>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Bottom Panel: Logs */}
          <div className="h-48 shrink-0 border-t border-gray-800">
            <Terminal logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}