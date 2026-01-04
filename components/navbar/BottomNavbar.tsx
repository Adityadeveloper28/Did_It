import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface BottomNavbarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const BottomNavbar = ({ selected, setSelected }: BottomNavbarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSelected('home')}
        style={styles.button}
      >
        <Text style={[styles.title, selected === 'home' && styles.active]}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelected('search')}
        style={styles.button}
      >
        <Text style={[styles.title, selected === 'search' && styles.active]}>SEARCH</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelected('profile')}
        style={styles.button}
      >
        <Text style={[styles.title, selected === 'profile' && styles.active]}>PROFILE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    gap: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  active: {
    color: '#007AFF',
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
    margin: 10,
  },
})

export default BottomNavbar