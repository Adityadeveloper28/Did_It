import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useContext, useState } from 'react';
import { register } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import LinearGradient from 'react-native-linear-gradient';

export default function RegisterScreen({ navigation }: any) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await register(name, email, password);
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/download.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Register</Text>

      <View style={styles.fieldBlock}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>Name</Text>
        </View>

        <View style={styles.inputWrap}>
          <FontAwesome6
            iconStyle="solid"
            name="circle-user"
            size={14}
            color="#8E88A9"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#9E99B5"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>Email</Text>
        </View>

        <View style={styles.inputWrap}>
          <FontAwesome6
            iconStyle="regular"
            name="envelope"
            size={14}
            color="#8E88A9"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9E99B5"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>Password</Text>
        </View>

        <View style={styles.inputWrap}>
          <FontAwesome6
            iconStyle="solid"
            name="lock"
            size={14}
            color="#8E88A9"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#9E99B5"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </LinearGradient>

      <Pressable
        style={styles.signupRow}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.signupHint}>Already have an account? </Text>
        <View style={styles.signupActionWrap}>
          <Text style={styles.signupAction}>Sign In</Text>
          <FontAwesome6
            iconStyle="solid"
            name="chevron-right"
            size={10}
            color="#4C63FF"
            style={styles.signupArrowIcon}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#ECE8F3',
    elevation: 2,
    shadowColor: '#1B1140',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E2942',
    textAlign: 'center',
  },
  fieldBlock: {
    marginBottom: 14,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F4865',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
    paddingHorizontal: 12,
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
  buttonGradient: {
    borderRadius: 12,
  },
  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  signupRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  signupHint: {
    fontSize: 13,
    color: '#8A84A5',
  },
  signupActionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupAction: {
    fontSize: 13,
    color: '#4C63FF',
    fontWeight: '600',
  },
  signupArrowIcon: {
    marginLeft: 6,
  },
});
