import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, ListItem, SearchBar} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {debounce} from 'lodash';

interface ActivityLogItem {
  id: string;
  type: 'connection' | 'disconnection' | 'speedTest';
  timestamp: Date;
  details: string;
}

const mockActivityLog: ActivityLogItem[] = [
  {
    id: '1',
    type: 'connection',
    timestamp: new Date(),
    details: 'Connected to HomeWiFi',
  },
  {
    id: '2',
    type: 'speedTest',
    timestamp: new Date(),
    details: 'Speed test: 50 Mbps down, 10 Mbps up',
  },
  {
    id: '3',
    type: 'disconnection',
    timestamp: new Date(),
    details: 'Disconnected from HomeWiFi',
  },
];

const ActivityLogScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLog, setFilteredLog] = useState(mockActivityLog);
  const theme = useTheme();

  const handleSearch = useCallback(
    debounce((text: string) => {
      const filtered = mockActivityLog.filter(
        item =>
          item.details.toLowerCase().includes(text.toLowerCase()) ||
          item.type.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredLog(filtered);
    }, 300),
    [],
  );

  const renderItem = ({item}: {item: ActivityLogItem}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.type}</ListItem.Title>
        <ListItem.Subtitle>{item.details}</ListItem.Subtitle>
        <Text>{item.timestamp.toLocaleString()}</Text>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search activity log..."
        onChangeText={text => {
          setSearchQuery(text);
          handleSearch(text);
        }}
        value={searchQuery}
        platform="default"
      />
      <FlatList
        data={filteredLog}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[styles.list, {backgroundColor: theme.colors.background}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default ActivityLogScreen;
