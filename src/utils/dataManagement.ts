import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { store } from '../store';

export const clearAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('App data cleared');
  } catch (error) {
    console.error('Error clearing app data:', error);
    throw error;
  }
};

export const exportSettings = async () => {
  try {
    const settings = store.getState().settings;
    const jsonSettings = JSON.stringify(settings);
    const path = `${RNFS.DocumentDirectoryPath}/wifi_app_settings.json`;
    await RNFS.writeFile(path, jsonSettings, 'utf8');
    console.log('Settings exported to:', path);
    return path;
  } catch (error) {
    console.error('Error exporting settings:', error);
    throw error;
  }
};

export const importSettings = async (path: string) => {
  try {
    const jsonSettings = await RNFS.readFile(path, 'utf8');
    const settings = JSON.parse(jsonSettings);
    // Here you would dispatch an action to update the Redux store with the imported settings
    console.log('Settings imported from:', path);
    return settings;
  } catch (error) {
    console.error('Error importing settings:', error);
    throw error;
  }
};

export const generateActivityLogCSV = async (activityLog: any[]) => {
  try {
    const header = 'Date,Type,Details\n';
    const rows = activityLog.map(item => 
      `${item.timestamp.toISOString()},${item.type},${item.details}`
    ).join('\n');
    const csvContent = header + rows;
    const path = `${RNFS.DocumentDirectoryPath}/activity_log.csv`;
    await RNFS.writeFile(path, csvContent, 'utf8');
    console.log('Activity log exported to:', path);
    return path;
  } catch (error) {
    console.error('Error generating activity log CSV:', error);
    throw error;
  }
};