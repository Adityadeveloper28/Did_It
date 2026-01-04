import { View, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  createdAt: string;
};

export default function ProofCard({ text, createdAt }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
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
});
