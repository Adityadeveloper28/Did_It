import { View, Text, StyleSheet, Image } from "react-native";
import { Proof } from "../types/models";

export default function ProofCard({
  id,
  text,
  createdAt,
  imageUri,
}: Proof) {
  return (
    <View style={styles.card}>
      {text ? <Text style={styles.text}>{text}</Text> : null}

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}

      <Text style={styles.date}>
        {new Date(createdAt).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  text: {
    fontSize: 14,
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});
