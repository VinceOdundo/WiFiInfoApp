import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import LottieView from 'lottie-react-native';

interface SpeedTestButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export const SpeedTestButton: React.FC<SpeedTestButtonProps> = ({
  onPress,
  isLoading,
}) => {
  return (
    <Button
      title={isLoading ? '' : 'Run Speed Test'}
      onPress={onPress}
      disabled={isLoading}
      buttonStyle={styles.button}
      icon={
        isLoading ? (
          <LottieView
            source={require('../assets/speed-test-animation.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 10,
  },
  lottie: {
    width: 30,
    height: 30,
  },
});
