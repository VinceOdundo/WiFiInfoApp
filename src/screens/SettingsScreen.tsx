import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {ListItem, Switch, Text, Button} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/index';
import {updateSettings} from '../store/slices/settingsSlice';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const handleToggle = (setting: keyof typeof settings) => {
    dispatch(updateSettings({[setting]: !settings[setting]}));
  };

  const handleLanguageChange = () => {
    // Implement language selection logic
    Alert.alert('Language Selection', 'Language selection to be implemented');
  };

  const handleDataManagement = () => {
    Alert.alert('Data Management', 'Choose an option', [
      {text: 'Clear App Data', onPress: () => console.log('Clear App Data')},
      {text: 'Export Settings', onPress: () => console.log('Export Settings')},
      {text: 'Import Settings', onPress: () => console.log('Import Settings')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Dark Mode</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={settings.darkMode}
          onValueChange={() => handleToggle('darkMode')}
        />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Notifications</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={settings.notifications}
          onValueChange={() => handleToggle('notifications')}
        />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Data Saving</ListItem.Title>
        </ListItem.Content>
        <Switch
          value={settings.dataSaving}
          onValueChange={() => handleToggle('dataSaving')}
        />
      </ListItem>
      <ListItem bottomDivider onPress={handleLanguageChange}>
        <ListItem.Content>
          <ListItem.Title>Language</ListItem.Title>
          <ListItem.Subtitle>{settings.language}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={handleDataManagement}>
        <ListItem.Content>
          <ListItem.Title>Data Management</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text>Version: 1.0.0</Text>
        <Text>Developer: built by Vince</Text>
        <Button
          title="Privacy Policy"
          type="clear"
          onPress={() => console.log('Open Privacy Policy')}
        />
        <Button
          title="Terms of Service"
          type="clear"
          onPress={() => console.log('Open Terms of Service')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutSection: {
    padding: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SettingsScreen;
