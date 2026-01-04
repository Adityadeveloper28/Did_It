import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";

export default function AddProofScreen({ route, navigation }: any) {
  const addProof = route?.params?.addProof;

  const [text, setText] = useState("");

  // Safety guard (VERY IMPORTANT)
  if (!addProof) {
    console.warn("addProof function not provided");
    navigation.goBack();
    return null;
  }

  const handleSubmit = () => {
    if (!text.trim()) return;

    addProof(text.trim());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What did you do?</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your proof..."
        value={text}
        onChangeText={setText}
        multiline
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Proof</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
