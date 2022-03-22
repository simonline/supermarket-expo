import React from "react";
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import CrossPlatformForm from "../components/CrossPlatformForm";

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <CrossPlatformForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
