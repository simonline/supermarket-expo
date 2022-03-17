import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import BarcodeScanner from "../components/BarcodeScanner";

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <BarcodeScanner />
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
