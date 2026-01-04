import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';

const DummyAction = [
  { id: '1', title: 'Action One', description: 'This is action one' },
  { id: '2', title: 'Action Two', description: 'This is action two' },
  { id: '3', title: 'Action Three', description: 'This is action three' },
  { id: '4', title: 'Action Four', description: 'This is action four' },
];

const ActionListScreen = ({ navigation }: any) => {
  const [actions, setActions] = useState(DummyAction);

  const addAction = (newAction: {
    id: string;
    title: string;
    description: string;
  }) => {
    setActions(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newAction.title,
        description: newAction.description,
      },
    ]);
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>ActionListScreen</Text> */}
      <FlatList
        data={actions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ActionCard
            title={item.title}
            description={item.description}
            onPress={() =>
              navigation.navigate('ProofList', { action: item })
            }
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddAction', { addAction: addAction })
        }
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
      {/* <Button
        title=" Go to Proof List"
        onPress={() => navigation.navigate('ProofList')}
      /> */}
    </View>
  );
};

export default ActionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2563eb',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
