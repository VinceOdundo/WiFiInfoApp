import WifiManager from 'react-native-wifi-reborn';
import NetInfo from '@react-native-community/netinfo';
import { NativeModules, Platform } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

const { AndroidWifiModule } = NativeModules;

export interface WifiInfo {
  ssid: string;
  strength: number;
  ipAddress: string;
  connectedDevices: number;
  dailyDataUsage: number;
  securityScore: number;
}

export const fetchWifiInfo = async (): Promise<WifiInfo> => {
  try {
    const ssid = await WifiManager.getCurrentWifiSSID();
    const strength = await WifiManager.getCurrentSignalStrength();
    const netInfo = await NetInfo.fetch();
    const ipAddress = netInfo.details?.ipAddress || '';

    let connectedDevices = 0;
    let dailyDataUsage = 0;

    if (Platform.OS === 'android') {
      connectedDevices = await AndroidWifiModule.getConnectedDevices();
      dailyDataUsage = await AndroidWifiModule.getDailyDataUsage();
    }

    const securityScore = await assessWifiSecurity();

    return {
      ssid,
      strength,
      ipAddress,
      connectedDevices,
      dailyDataUsage,
      securityScore,
    };
  } catch (error) {
    console.error('Error fetching WiFi info:', error);
    throw error;
  }
};

export const runSpeedTest = async (): Promise<{ downloadSpeed: number; uploadSpeed: number }> => {
  const testFileUrl = 'https://speed.cloudflare.com/__down?bytes=20000000'; // 20 MB file
  const uploadUrl = 'https://speed.cloudflare.com/__up';
  
  try {
    const startTime = Date.now();
    const response = await axios.get(testFileUrl);
    const endTime = Date.now();
    
    const fileSizeInBits = response.data.length * 8;
    const durationInSeconds = (endTime - startTime) / 1000;
    const downloadSpeed = fileSizeInBits / durationInSeconds / 1000000; // Convert to Mbps

    // Upload test
    const uploadData = Buffer.alloc(10000000); // 10 MB of random data
    const uploadStartTime = Date.now();
    await axios.post(uploadUrl, uploadData);
    const uploadEndTime = Date.now();

    const uploadDurationInSeconds = (uploadEndTime - uploadStartTime) / 1000;
    const uploadSpeed = (uploadData.length * 8) / uploadDurationInSeconds / 1000000; // Convert to Mbps

    return {
      downloadSpeed: parseFloat(downloadSpeed.toFixed(2)),
      uploadSpeed: parseFloat(uploadSpeed.toFixed(2)),
    };
  } catch (error) {
    console.error('Error running speed test:', error);
    throw error;
  }
};

export const scanNearbyNetworks = async (): Promise<string[]> => {
  try {
    const networks = await WifiManager.loadWifiList();
    return networks.map(network => network.SSID);
  } catch (error) {
    console.error('Error scanning nearby networks:', error);
    throw error;
  }
};

export const assessWifiSecurity = async (): Promise<number> => {
  try {
    const wifiInfo = await AndroidWifiModule.getWifiInfo();
    const encryptionType = wifiInfo.capabilities;
    const frequency = wifiInfo.frequency;

    let securityScore = 0;

    // Check encryption type
    if (encryptionType.includes('WPA3')) {
      securityScore += 50;
    } else if (encryptionType.includes('WPA2')) {
      securityScore += 40;
    } else if (encryptionType.includes('WPA')) {
      securityScore += 30;
    } else if (encryptionType.includes('WEP')) {
      securityScore += 10;
    }

    // Check frequency (5GHz is generally more secure than 2.4GHz)
    if (frequency > 5000) {
      securityScore += 20;
    } else {
      securityScore += 10;
    }

    // Check signal strength (stronger signal is less susceptible to attacks)
    const signalStrength = await WifiManager.getCurrentSignalStrength();
    if (signalStrength > -50) {
      securityScore += 20;
    } else if (signalStrength > -60) {
      securityScore += 15;
    } else if (signalStrength > -70) {
      securityScore += 10;
    } else {
      securityScore += 5;
    }

    // Normalize score to 0-100 range
    return Math.min(100, securityScore);
  } catch (error) {
    console.error('Error assessing WiFi security:', error);
    throw error;
  }
};

