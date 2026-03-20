import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ActionCard from '../components/ActionCard';
import { getActions } from '../services/action';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Loading from '../components/Loading';
import {
  getActionsCache,
  hasChanged,
  isStale,
  setActionsCache,
} from '../services/storage';

const ActionListScreen = ({ navigation }: any) => {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      void loadActionsWithCache();
    }
  }, [isFocused]);

  const loadActionsWithCache = async () => {
    setLoading(true);

    const cache = await getActionsCache();

    if (cache.exists) {
      setActions(cache.data);
      setLoading(false);
    }

    const shouldFetchFromApi = !cache.exists || isStale(cache.fetchedAt, 60_000);

    if (!shouldFetchFromApi) {
      setLoading(false);
      return;
    }

    try {
      const data = await getActions();
      const changed = hasChanged(cache.signature, data);

      if (changed || !cache.exists) {
        setActions(data);
      }

      await setActionsCache(data);
    } catch (error) {
      console.error('Failed to load actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={require('../assets/action.jpg')}
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>No action found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading text="Loading actions..." />
      ) : (
        <FlatList
          data={actions}
          keyExtractor={item => item._id}
          contentContainerStyle={
            actions.length === 0
              ? styles.emptyListContainer
              : styles.listContent
          }
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
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddAction')}
      >
        <FontAwesome6 iconStyle="solid" name="plus" size={22} color="#fff" />
      </Pressable>
    </View>
  );
};

export default ActionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: 0.6,
    color: '#2E2942',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4C63FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
