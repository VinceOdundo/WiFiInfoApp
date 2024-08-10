import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';

import DashboardScreen from '../screens/DashboardScreen.tsx';
import ActivityLogScreen from '../screens/ActivityLogScreen.tsx/index.ts';
import AchievementsScreen from '../screens/AchievementsScreen.tsx/index.ts';
import SettingsScreen from '../screens/SettingsScreen.tsx/index.ts';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'dashboard' : 'dashboard-outline';
            } else if (route.name === 'Activity Log') {
              iconName = focused ? 'history' : 'history-outline';
            } else if (route.name === 'Achievements') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return (
              <Icon
                name={iconName}
                type="material-community"
                size={size}
                color={color}
              />
            );
          },
        })}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Activity Log" component={ActivityLogScreen} />
        <Tab.Screen name="Achievements" component={AchievementsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
