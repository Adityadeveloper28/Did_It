import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { uploadProof } from '../services/proof';
import {
  invalidateProofsCache,
  invalidateActionsCache,
} from '../services/storage';
export default function AddProofScreen({ route, navigation }: any) {
  const { actionId } = route.params;

  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isDisabled = loading || !text.trim();

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: false,
      cameraType: 'back',
    });
    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      await uploadProof(actionId, text.trim(), imageUri || '');
      await Promise.all([
        invalidateProofsCache(actionId),
        invalidateActionsCache(),
      ]);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to upload proof:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topImageWrap}>
          <Image
            source={require('../assets/addproof2.jpg')}
            style={styles.topImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Add Proof</Text>
        <Text style={styles.subtitle}>
          Add details and photo evidence for your action
        </Text>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>What did you do?</Text>
          <View style={[styles.inputWrap, styles.textAreaWrap]}>
            <FontAwesome6
              iconStyle="solid"
              name="align-left"
              size={14}
              color="#8E88A9"
              style={styles.textAreaIcon}
            />
            <TextInput
              style={styles.textAreaInput}
              placeholder="Describe your proof..."
              placeholderTextColor="#9E99B5"
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {imageUri ? (
          <View style={styles.previewWrap}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        ) : null}

        <View style={styles.row}>
          <Pressable style={styles.secondaryButton} onPress={pickImage}>
            <FontAwesome6
              iconStyle="solid"
              name="image"
              size={14}
              color="#4C63FF"
              style={styles.secondaryIcon}
            />
            <Text style={styles.secondaryText}>Select Image</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={openCamera}>
            <FontAwesome6
              iconStyle="solid"
              name="camera"
              size={14}
              color="#4C63FF"
              style={styles.secondaryIcon}
            />
            <Text style={styles.secondaryText}>Open Camera</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isDisabled}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Submit Proof</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  topImageWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  topImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#ECE8F3',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E2942',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    textAlign: 'center',
    color: '#8A84A5',
    fontSize: 13,
  },
  fieldBlock: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F4865',
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
    paddingHorizontal: 12,
    minHeight: 50,
    shadowColor: '#1B1140',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  textAreaWrap: {
    alignItems: 'flex-start',
    minHeight: 130,
    paddingTop: 12,
  },
  textAreaIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  textAreaInput: {
    flex: 1,
    minHeight: 106,
    fontSize: 15,
    color: '#2E2942',
    paddingVertical: 0,
  },
  previewWrap: {
    marginTop: 4,
    marginBottom: 12,
  },
  imagePreview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryIcon: {
    marginRight: 8,
  },
  secondaryText: {
    color: '#4F4865',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#4C63FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
