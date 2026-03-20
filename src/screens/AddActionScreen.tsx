import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { createAction } from '../services/action';
import { invalidateActionsCache } from '../services/storage';
const AddActionScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = loading || !title.trim();

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await createAction(title.trim(), description.trim());
      await invalidateActionsCache();
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create action:', error);
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
            source={require('../assets/addaction.jpg')}
            style={styles.topImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Add New Action</Text>
        <Text style={styles.subtitle}>
          Create an action and start tracking proofs
        </Text>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputWrap}>
            <FontAwesome6
              iconStyle="solid"
              name="bullseye"
              size={14}
              color="#8E88A9"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter action title"
              placeholderTextColor="#9E99B5"
              autoCapitalize="sentences"
              maxLength={80}
            />
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Description</Text>
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
              value={description}
              onChangeText={setDescription}
              placeholder="Enter action description"
              placeholderTextColor="#9E99B5"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        <Pressable
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Save Action'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddActionScreen;

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
    width: 140,
    height: 140,
    borderRadius: 70,
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2E2942',
    paddingVertical: 0,
  },
  textAreaWrap: {
    alignItems: 'flex-start',
    minHeight: 120,
    paddingTop: 12,
  },
  textAreaIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  textAreaInput: {
    flex: 1,
    minHeight: 96,
    fontSize: 15,
    color: '#2E2942',
    paddingVertical: 0,
  },
  button: {
    marginTop: 8,
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
