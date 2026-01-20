import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProofCard from "../components/ProofCard";
import { getActionById } from "../services/action";
import { useIsFocused } from "@react-navigation/native";

const ProofListScreen = ({ route, navigation }: any) => {
  const { actionId, title, description } = route.params;
  console.log("ProofListScreen params:", route.params);

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
      console.log("Loading proofs for actionId:", actionId);
      const action = await getActionById(actionId);
      console.log("Loaded action:", action);  
      setProofs(action.proofs || []);
    } catch (err) {
      console.error("Failed to load proofs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {/* Proof list */}
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={proofs}
          keyExtractor={item => item._id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <ProofCard
              id={item._id}
              text={item.text}
              createdAt={item.createdAt}
              imageUri={item.imageUrl}
            />
          )}
        />
      )}

      {/* Add Proof */}
      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddProof", {
            actionId,
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
    backgroundColor: "#f2f2f2",
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
  },
});
