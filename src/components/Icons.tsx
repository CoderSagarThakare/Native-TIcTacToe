import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type IconProps = {
  name: string;
};

const Icons = ({ name }: IconProps) => {
  switch (name) {
    case 'circle':
      return (
        <View style={[styles.iconContainer, styles.circleBg]}>
          <FontAwesome6 name="circle" size={42} color="#00C853" solid />
        </View>
      );

    case 'cross':
      return (
        <View style={[styles.iconContainer, styles.crossBg]}>
          <FontAwesome6 name="xmark" size={42} color="#D50000" solid />
        </View>
      );

    default:
      return (
        <View style={[styles.iconContainer, styles.defaultBg]}>
          <FontAwesome6 name="question" size={38} color="#B0BEC5" solid />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 80,
    height: 80,
    margin: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  circleBg: {
    backgroundColor: '#003B00',
  },
  crossBg: {
    backgroundColor: '#2B0000',
  },
  defaultBg: {
    backgroundColor: '#222',
  },
});

export default Icons;
