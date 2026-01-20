import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import ActionCard from '../components/ActionCard';
import { getActions } from '../services/action';
import { useIsFocused } from '@react-navigation/native';

const ActionListScreen = ({ navigation }: any) => {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    loadActions();
  }, [isFocused]);

  const loadActions = async () => {
    try {
      setLoading(true);
      const data = await getActions();
      console.log('Loaded actions:', data);
      setActions(data);
    } catch (error) {
      console.error('Failed to load actions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={actions}
          keyExtractor={item => item._id} // ✅ FIX
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <ActionCard
              title={item?.title}
              description={item?.description}
              onPress={() =>
                navigation.navigate('ProofList', {
                  actionId: item?._id,
                  title: item?.title,
                  description: item?.description,
                })
              }
            />
          )}
        />
      )}

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddAction')}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
      
    </View>
  );
};

export default ActionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ FIX
    backgroundColor: '#fff',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
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
