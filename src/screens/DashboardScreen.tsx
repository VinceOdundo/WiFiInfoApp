import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Card, Button} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {RootState} from '../store/index.ts';
import {updateWifiInfo} from '../store/slices/wifiSlice.ts';
import {fetchWifiInfo, runSpeedTest} from '../services/wifiService.ts';

const DashboardScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const wifiInfo = useSelector((state: RootState) => state.wifi);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await fetchWifiInfo();
      dispatch(updateWifiInfo(info));
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSpeedTest = async () => {
    const result = await runSpeedTest();
    // Update state with speed test result
  };

  const speedData = [
    {x: 1, y: 10},
    {x: 2, y: 15},
    {x: 3, y: 8},
    {x: 4, y: 20},
    {x: 5, y: 12},
  ];

  return (
    <ScrollView style={styles.container}>
      <Card
        containerStyle={[styles.card, {backgroundColor: theme.colors.surface}]}>
        <Card.Title>WiFi Information</Card.Title>
        <Card.Divider />
        <Text style={styles.infoText}>SSID: {wifiInfo.ssid}</Text>
        <Text style={styles.infoText}>
          Signal Strength: {wifiInfo.strength} dBm
        </Text>
        <Text style={styles.infoText}>IP Address: {wifiInfo.ipAddress}</Text>
        <Text style={styles.infoText}>
          Connected Devices: {wifiInfo.connectedDevices}
        </Text>
        <Text style={styles.infoText}>
          Daily Data Usage: {wifiInfo.dailyDataUsage} MB
        </Text>
        <Text style={styles.infoText}>
          Security Score: {wifiInfo.securityScore}/100
        </Text>
      </Card>

      <Card
        containerStyle={[styles.card, {backgroundColor: theme.colors.surface}]}>
        <Card.Title>Speed Graph</Card.Title>
        <Card.Divider />
        <VictoryChart>
          <VictoryLine data={speedData} />
          <VictoryAxis label="Time" />
          <VictoryAxis dependentAxis label="Speed (Mbps)" />
        </VictoryChart>
        <Button title="Run Speed Test" onPress={handleSpeedTest} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DashboardScreen;
