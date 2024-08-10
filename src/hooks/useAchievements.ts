import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateAchievement, updateLevel } from '../store/slices/achievementsSlice';

export const useAchievements = () => {
  const dispatch = useDispatch();
  const { achievements, level } = useSelector((state: RootState) => state.achievements);

  const checkAchievements = (wifiInfo: any) => {
    // This is a placeholder. In a real app, you'd implement logic to check for achievements
    // based on the user's actions and WiFi usage.
    const newAchievements = achievements.map(achievement => {
      if (achievement.id === 'speedDemon' && wifiInfo.downloadSpeed > 100) {
        return { ...achievement, unlocked: true };
      }
      return achievement;
    });

    newAchievements.forEach(achievement => {
      if (achievement.unlocked) {
        dispatch(updateAchievement(achievement));
      }
    });

    const unlockedCount = newAchievements.filter(a => a.unlocked).length;
    const newLevel = Math.floor(unlockedCount / 5) + 1;
    if (newLevel !== level) {
      dispatch(updateLevel(newLevel));
    }
  };

  return { achievements, level, checkAchievements };
};