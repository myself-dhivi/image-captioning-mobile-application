import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import AppNavigator from './src/Navigation';

const App = () => {
  const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState(null);

  useEffect(() => {
    // Check if the permission is already granted
    const checkMicrophonePermission = async () => {
      try {
        const status = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        setMicrophonePermissionStatus(status);
      } catch (err) {
        console.warn('Error checking microphone permission:', err);
      }
    };

    checkMicrophonePermission();
  }, []);

  useEffect(() => {
    // Request microphone permission only if it's not already granted
    const requestMicrophonePermission = async () => {
      if (microphonePermissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
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
            setMicrophonePermissionStatus(PermissionsAndroid.RESULTS.GRANTED);
          } else {
            console.log('Microphone permission denied');
          }
        } catch (err) {
          console.warn('Error requesting microphone permission:', err);
        }
      } else {
        console.log('Microphone permission already granted');
      }
    };

    if (microphonePermissionStatus !== null) {
      requestMicrophonePermission();
    }
  }, [microphonePermissionStatus]);

  return <AppNavigator />;
};

export default App;
