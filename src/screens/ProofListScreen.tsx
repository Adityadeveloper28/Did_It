import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import ProofCard from '../components/ProofCard';

const ProofListScreen = ({ route, navigation }: any) => {
  const { action } = route.params;
  const [proofs, setProofs] = useState([
    { id: '1', text: 'changes', createdAt: '2024-01-01' },
  ]);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>ProofListScreen</Text>0 */}
      <View style={styles.header}>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.description}>{action.description}</Text>
      </View>

      <FlatList
        data={proofs}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ProofCard text={item.text} createdAt={item.createdAt} />
        )}
      />
      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddProof', {
            addProof: (text: string) =>
              setProofs(prev => [
                ...prev,
                {
                  id: Date.now().toString(),
                  text,
                  createdAt: new Date().toISOString(),
                },
              ]),
          })
        }
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
};

export default ProofListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  proofCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  proofText: {
    fontSize: 16,
    fontWeight: '500',
  },
  proofDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2563eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
  },
});
