import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
}

interface AchievementsState {
  achievements: Achievement[];
  level: number;
}

const initialState: AchievementsState = {
  achievements: [],
  level: 1,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    updateAchievement: (state, action: PayloadAction<Achievement>) => {
      const index = state.achievements.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.achievements[index] = action.payload;
      } else {
        state.achievements.push(action.payload);
      }
    },
    updateLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { updateAchievement, updateLevel } = achievementsSlice.actions;
export default achievementsSlice.reducer;
