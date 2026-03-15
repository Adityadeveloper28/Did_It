import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import ProofCard from '../components/ProofCard';
import { getActionById } from '../services/action';
import Loading from '../components/Loading';

const ProofListScreen = ({ route, navigation }: any) => {
  const { actionId, title, description } = route.params;

  const [proofs, setProofs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadAction();
    }
  }, [isFocused]);

  const loadAction = async () => {
    try {
      setLoading(true);
      const action = await getActionById(actionId);
      setProofs(action?.proofs || []);
    } catch (err) {
      console.error('Failed to load proofs', err);
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
      <Text style={styles.emptyTitle}>No proof found</Text>
      <Text style={styles.emptySubtitle}>
        Add your first proof to start tracking progress
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <View style={styles.titleDescBlock}>
            <Text style={styles.title} numberOfLines={1}>
              {title || 'Proofs'}
            </Text>
            <Text style={styles.descriptionLine} numberOfLines={2}>
              {description || 'Track your progress with proof logs'}
            </Text>
          </View>

          <View style={styles.countChip}>
            <Text style={styles.countText}>{proofs.length}</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <Loading text="Loading proofs..." />
      ) : (
        <FlatList
          style={styles.list}
          data={proofs}
          keyExtractor={item => item._id}
          contentContainerStyle={[
            styles.listContentBase,
            proofs.length === 0
              ? styles.emptyListContainer
              : styles.listContent,
          ]}
          renderItem={({ item }) => (
            <ProofCard
              id={item._id}
              text={item.text}
              createdAt={item.createdAt}
              imageUri={item.imageUrl}
            />
          )}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddProof', {
            actionId,
          })
        }
      >
        <FontAwesome6 iconStyle="solid" name="plus" size={20} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};

export default ProofListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDescBlock: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E2942',
  },
  descriptionLine: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B6581',
  },
  countChip: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4C63FF',
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    marginTop: 10,
    color: '#6B6581',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContentBase: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E2942',
  },
  emptySubtitle: {
    marginTop: 6,
    textAlign: 'center',
    color: '#8A84A5',
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4C63FF',
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
