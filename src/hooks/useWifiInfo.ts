import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateWifiInfo } from '../store/slices/wifiSlice';
import { fetchWifiInfo, WifiInfo } from '../services/wifiService';

export const useWifiInfo = () => {
  const dispatch = useDispatch();
  const wifiInfo = useSelector((state: RootState) => state.wifi);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshWifiInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await fetchWifiInfo();
      dispatch(updateWifiInfo(info));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWifiInfo();
    const interval = setInterval(refreshWifiInfo, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { wifiInfo, loading, error, refreshWifiInfo };
};

