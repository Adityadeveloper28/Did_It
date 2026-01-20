import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadProof } from '../services/proof';

export default function AddProofScreen({ route, navigation }: any) {
  const { actionId } = route.params;

  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Safety guard (VERY IMPORTANT)
  // if (!addProof) {
  //   console.warn("addProof function not provided");
  //   navigation.goBack();
  //   return null;
  // }

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });
    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const openCamera = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });
    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    console.log("Submitting proof:", { actionId, text, imageUri });
    try {
      setLoading(true);
      await uploadProof(actionId, text, imageUri || '');
    } catch (error) {
      console.error('Failed to upload proof:', error);
    } finally {
      setLoading(false);
    }
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
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={pickImage}>
          <Text>Select Image</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={openCamera}>
          <Text>Open Camera</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit Proof'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  secondaryButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    width: '48%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 8,
    // resizeMode: "cover",
    marginVertical: 10,
  },
});
