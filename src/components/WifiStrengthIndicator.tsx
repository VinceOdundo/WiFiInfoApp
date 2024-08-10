import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {getWifiStrengthLevel} from '../utils/wifiUtils';

interface WifiStrengthIndicatorProps {
  strength: number;
}

export const WifiStrengthIndicator: React.FC<WifiStrengthIndicatorProps> = ({
  strength,
}) => {
  const level = getWifiStrengthLevel(strength);
  const color =
    level === 'Excellent'
      ? 'green'
      : level === 'Good'
      ? 'lime'
      : level === 'Fair'
      ? 'orange'
      : 'red';

  return (
    <View style={styles.container}>
      <Icon name="wifi" type="font-awesome" color={color} size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
