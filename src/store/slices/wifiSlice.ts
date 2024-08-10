import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WifiState {
  ssid: string;
  strength: number;
  ipAddress: string;
  connectedDevices: number;
  dailyDataUsage: number;
  securityScore: number;
}

const initialState: WifiState = {
  ssid: '',
  strength: 0,
  ipAddress: '',
  connectedDevices: 0,
  dailyDataUsage: 0,
  securityScore: 0,
};

const wifiSlice = createSlice({
  name: 'wifi',
  initialState,
  reducers: {
    updateWifiInfo: (state, action: PayloadAction<Partial<WifiState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateWifiInfo } = wifiSlice.actions;
export default wifiSlice.reducer;
