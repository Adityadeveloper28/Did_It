import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Action } from '../types/models';

type Props = Pick<Action, 'title' | 'description'> & {
  onPress: () => void;
};

const ActionCard = ({ title, description, onPress }: Props) => {
  const subtitle = description?.trim() || '09:00';

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#E6E6E6' }}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.leftWrap}>
        <View style={styles.iconWrap}>
          <FontAwesome6
            iconStyle="solid"
            name="dumbbell"
            size={18}
            color="#9B9B9B"
          />
        </View>

        <View style={styles.textWrap}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      <FontAwesome6
        iconStyle="solid"
        name="chevron-right"
        size={13}
        color="#7F7F7F"
      />
    </Pressable>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EFEFEF',
    borderRadius: 26,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.92,
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E2E2E',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#A0A0A0',
  },
});
