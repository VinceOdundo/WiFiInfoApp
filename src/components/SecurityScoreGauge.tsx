import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '@rneui/themed';
import {VictoryPie} from 'victory-native';
import {getSecurityLevel} from '../utils/wifiUtils';

interface SecurityScoreGaugeProps {
  score: number;
}

export const SecurityScoreGauge: React.FC<SecurityScoreGaugeProps> = ({
  score,
}) => {
  const {theme} = useTheme();
  const level = getSecurityLevel(score);
  const color =
    level === 'Excellent'
      ? theme.colors.success
      : level === 'Good'
      ? theme.colors.warning
      : level === 'Fair'
      ? theme.colors.warning
      : theme.colors.error;

  return (
    <View style={styles.container}>
      <VictoryPie
        data={[
          {x: 1, y: score},
          {x: 2, y: 100 - score},
        ]}
        colorScale={[color, theme.colors.grey5]}
        width={100}
        height={100}
        innerRadius={30}
        labels={() => null}
      />
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, {color: theme.colors.text}]}>
          {score}
        </Text>
      </View>
      <Text style={[styles.levelText, {color: theme.colors.text}]}>
        {level}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelText: {
    marginTop: 8,
    fontSize: 16,
  },
});
