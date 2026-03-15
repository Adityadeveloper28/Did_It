import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type LoadingProps = {
  text?: string;
};

const Loading = ({ text = 'Loading...' }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageFrame}>
        <Image
          source={require('../assets/loading.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageFrame: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B1140',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: 122,
    height: 122,
    borderRadius: 61,
    borderWidth: 2,
    borderColor: '#ECE8F3',
  },
  text: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: '700',
    color: '#6B6581',
    letterSpacing: 0.3,
  },
});

export default Loading;
