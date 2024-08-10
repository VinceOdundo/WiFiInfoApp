import { WIFI_STRENGTH_LEVELS, SECURITY_SCORE_LEVELS } from '../constants';

export const getWifiStrengthLevel = (strength: number): string => {
  if (strength >= WIFI_STRENGTH_LEVELS.EXCELLENT) return 'Excellent';
  if (strength >= WIFI_STRENGTH_LEVELS.GOOD) return 'Good';
  if (strength >= WIFI_STRENGTH_LEVELS.FAIR) return 'Fair';
  return 'Weak';
};

export const getSecurityLevel = (score: number): string => {
  if (score >= SECURITY_SCORE_LEVELS.EXCELLENT) return 'Excellent';
  if (score >= SECURITY_SCORE_LEVELS.GOOD) return 'Good';
  if (score >= SECURITY_SCORE_LEVELS.FAIR) return 'Fair';
  return 'Poor';
};

export const formatDataUsage = (usage: number): string => {
  if (usage < 1024) return `${usage.toFixed(2)} MB`;
  const gbUsage = usage / 1024;
  return `${gbUsage.toFixed(2)} GB`;
};

export const calculateAverageSpeed = (speedTests: SpeedTestResult[]): number => {
  if (speedTests.length === 0) return 0;
  const totalSpeed = speedTests.reduce((sum, test) => sum + test.downloadSpeed, 0);
  return totalSpeed / speedTests.length;
};

