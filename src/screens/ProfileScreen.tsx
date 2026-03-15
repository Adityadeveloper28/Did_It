import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { getProfile, logout } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  if (!user) {
    return <Loading text="Loading profile..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.avatarWrap}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>Your account details</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.iconBadge}>
            <FontAwesome6
              iconStyle="solid"
              name="circle-user"
              size={14}
              color="#4C63FF"
            />
          </View>

          <View style={styles.infoTextWrap}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.iconBadge}>
            <FontAwesome6
              iconStyle="solid"
              name="envelope"
              size={14}
              color="#4C63FF"
            />
          </View>

          <View style={styles.infoTextWrap}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <FontAwesome6
          iconStyle="solid"
          name="right-from-bracket"
          size={14}
          color="#fff"
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  avatarWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFF4BF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ECE8F3',
    marginBottom: 14,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E2942',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A84A5',
  },
  infoCard: {
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#1B1140',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A84A5',
  },
  value: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2942',
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
