export enum AgentType {
  PLANNER = 'PLANNER',
  RESEARCHER = 'RESEARCHER',
  CODER = 'CODER',
  QA = 'QA',
  CONTENT = 'CONTENT',
  MULTIMODAL = 'MULTIMODAL',
  DEVOPS = 'DEVOPS',
  DATABASE = 'DATABASE',
  SECURITY = 'SECURITY',
  CLOUD = 'CLOUD'
}

export enum AgentStatus {
  IDLE = 'IDLE',
  WORKING = 'WORKING',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Agent {
  id: AgentType;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  agent: AgentType | 'SYSTEM';
  message: string;
  level: 'info' | 'success' | 'warn' | 'error';
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  language?: string;
}

export interface MetricData {
  time: string;
  cpu: number;
  memory: number;
  tasks: number;
}