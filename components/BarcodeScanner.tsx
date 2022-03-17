import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Platform, StyleSheet, Text } from 'react-native';
import { BarCodeScanningResult, Camera } from 'expo-camera';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();
  let camera: Camera | null;

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        setHasPermission(true);
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const handleBarCodeScanned = (scanResult: BarCodeScanningResult) => {
    console.log({ scanResult });
    const { type, data } = scanResult;
    setScanned(true);
    alert(data);
    setTimeout(() => {
      setScanned(false);
    }, 1000);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera
      ref={(ref) => {
        camera = ref;
      }}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    height: '80%',
    width: '100%',
    borderWidth: 2,
  },
});
