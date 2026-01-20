import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getProfile, logout } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
