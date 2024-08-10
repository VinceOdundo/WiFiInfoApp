// src/screens/AchievementsScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LottieView from 'lottie-react-native';

const AchievementsScreen: React.FC = () => {
  const theme = useTheme();
  const { achievements, level } = useSelector((state: RootState) => state.achievements);

  const renderAchievement = (achievement: any) => (
    <Card key={achievement.id} containerStyle={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.achievementHeader}>
        <Icon
          name={achievement.unlocked ? 'trophy' : 'lock'}
          type="material-community"
          color={achievement.unlocked ? 'gold' : 'gray'}
          size={24}
        />
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
      </View>
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
      {!achievement.unlocked && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${achievement.progress}%` }]} />
          <Text style={styles.progressText}>{`${achievement.progress}%`}</Text>
        </View>
      )}
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={styles.levelText}>Level {level}</Text>
        <LottieView
          source={require('../assets/level-up-animation.json')}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
        />
      </Card>
      {achievements.map(renderAchievement)}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  progressText: {
    position: 'absolute',
    right: 5,
    top: 2,
    fontSize: 12,
  },
});

export default AchievementsScreen;