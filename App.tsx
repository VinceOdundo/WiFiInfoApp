import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/store/index';
import AppNavigator from './src/navigation/AppNavigator';
import {
  configureBackgroundTasks,
  configureNotifications,
} from './src/services/backgroundTasks';
import './i18n';

const App: React.FC = () => {
  const {theme} = useTheme();

  useEffect(() => {
    configureBackgroundTasks();
    configureNotifications();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={
                theme.mode === 'dark' ? 'light-content' : 'dark-content'
              }
              backgroundColor={theme.colors.background}
            />
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
