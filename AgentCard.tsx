import React from 'react';
import { Agent, AgentStatus, AgentType } from '../types';
import { BrainCircuit, Code, Search, ShieldCheck, PenTool, Image as ImageIcon, Server, Database, Cloud, Lock } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const getIcon = (type: AgentType) => {
  switch (type) {
    case AgentType.PLANNER: return <BrainCircuit className="w-5 h-5" />;
    case AgentType.RESEARCHER: return <Search className="w-5 h-5" />;
    case AgentType.CODER: return <Code className="w-5 h-5" />;
    case AgentType.QA: return <CheckCircleIcon className="w-5 h-5" />;
    case AgentType.CONTENT: return <PenTool className="w-5 h-5" />;
    case AgentType.MULTIMODAL: return <ImageIcon className="w-5 h-5" />;
    case AgentType.DEVOPS: return <Server className="w-5 h-5" />;
    case AgentType.DATABASE: return <Database className="w-5 h-5" />;
    case AgentType.CLOUD: return <Cloud className="w-5 h-5" />;
    case AgentType.SECURITY: return <Lock className="w-5 h-5" />;
    default: return <BrainCircuit className="w-5 h-5" />;
  }
};

const CheckCircleIcon = (props: any) => <ShieldCheck {...props} />;

const getStatusColor = (status: AgentStatus) => {
  switch (status) {
    case AgentStatus.WORKING: return 'bg-amber-500/10 border-amber-500/50 text-amber-400';
    case AgentStatus.COMPLETED: return 'bg-green-500/10 border-green-500/50 text-green-400';
    case AgentStatus.ERROR: return 'bg-red-500/10 border-red-500/50 text-red-400';
    default: return 'bg-gray-800/50 border-gray-700 text-gray-500';
  }
};

const getPulse = (status: AgentStatus) => {
  if (status === AgentStatus.WORKING) return 'animate-pulse';
  return '';
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className={`p-3 rounded-lg border ${getStatusColor(agent.status)} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getIcon(agent.id)}
          <span className="font-semibold text-sm">{agent.name}</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${
          agent.status === AgentStatus.WORKING ? 'bg-amber-400 animate-ping' :
          agent.status === AgentStatus.COMPLETED ? 'bg-green-400' : 'bg-gray-600'
        }`} />
      </div>
      <div className="text-xs opacity-80 mb-1">{agent.role}</div>
      <div className={`text-xs h-4 overflow-hidden text-ellipsis whitespace-nowrap ${getPulse(agent.status)}`}>
        {agent.status === AgentStatus.IDLE ? 'Waiting...' : 
         agent.status === AgentStatus.COMPLETED ? 'Done' :
         agent.currentTask}
      </div>
    </div>
  );
};
