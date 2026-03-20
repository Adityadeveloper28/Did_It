import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Proof } from '../types/models';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getTimeAgo = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + ' min ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + ' hr ago';
  const days = Math.floor(hrs / 24);
  return days + ' day ago';
};

export default function ProofCard({ text, createdAt, imageUri }: Proof) {
  const title = text?.trim() || 'No proof text';
  const timeAgo = getTimeAgo(createdAt);
  const dateText = formatDate(createdAt);

  const [isImageLoading, setIsImageLoading] = useState(Boolean(imageUri));
  const pulse = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    setIsImageLoading(Boolean(imageUri));
  }, [imageUri]);

  useEffect(() => {
    if (!imageUri || !isImageLoading) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [imageUri, isImageLoading, pulse]);

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        {imageUri ? (
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: imageUri }}
              style={styles.cover}
              resizeMode="cover"
              onLoadStart={() => setIsImageLoading(true)}
              onLoadEnd={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            {isImageLoading ? (
              <Animated.View
                pointerEvents="none"
                style={[styles.coverSkeleton, { opacity: pulse }]}
              />
            ) : null}
          </View>
        ) : (
          <View style={styles.coverFallback}>
            <Text style={styles.coverFallbackText}>No image attached</Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <View style={styles.avatar}>
            <FontAwesome6
              iconStyle="solid"
              name="image"
              size={14}
              color="#4C63FF"
            />
          </View>

          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>

          <Text style={styles.date}>{dateText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingVertical: 6,
  },
  card: {
    backgroundColor: '#F4F4F6',
    borderRadius: 24,
    padding: 10,
  },
  coverWrap: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#EDEDF2',
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coverSkeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D8D8DE',
  },
  coverFallback: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    backgroundColor: '#EDEDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverFallbackText: {
    fontSize: 13,
    color: '#8A84A5',
    fontWeight: '600',
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E2942',
  },
  timeAgo: {
    marginTop: 2,
    fontSize: 12,
    color: '#8A84A5',
    fontWeight: '600',
  },
  date: {
    marginLeft: 10,
    fontSize: 12,
    color: '#6B6581',
    fontWeight: '700',
  },
});
