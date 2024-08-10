export interface WifiInfo {
    ssid: string;
    strength: number;
    ipAddress: string;
    connectedDevices: number;
    dailyDataUsage: number;
    securityScore: number;
  }
  
  export interface Achievement {
    id: string;
    title: string;
    description: string;
    type: keyof typeof ACHIEVEMENT_TYPES;
    unlocked: boolean;
    progress: number;
  }
  
  export interface ActivityLogItem {
    id: string;
    type: 'connection' | 'disconnection' | 'speedTest' | 'securityChange';
    timestamp: Date;
    details: string;
  }
  
  export interface SpeedTestResult {
    downloadSpeed: number;
    uploadSpeed: number;
    latency: number;
    timestamp: Date;
  }