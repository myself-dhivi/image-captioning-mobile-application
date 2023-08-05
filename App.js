import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import AppNavigator from './src/Navigation';

const App = () => {
  useEffect(() => {
    // Request microphone permission
    const requestMicrophonePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'IntelliVision needs access to your microphone.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn('Error requesting microphone permission:', err);
      }
    };

    requestMicrophonePermission();
  }, []);

  return <AppNavigator />;
};

export default App;
