import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Font from 'expo-font';
import Voice from '@react-native-community/voice'; // Import the Voice module
import * as Speech from 'expo-speech';

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const scaleValue = new Animated.Value(0);
  const translateYValue = new Animated.Value(-30);
  const fadeInValue = new Animated.Value(0);
  const [voiceResponse, setVoiceResponse] = useState('');
  const [speechStarted, setSpeechStarted] = useState(false); // Track if speech is already started

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-light': require('../assets/fonts/Poppins-Light.ttf'),
        // Add more custom fonts here if needed
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    // Speak the welcome message when the component mounts
    speakWelcomeMessage();

    // Setup voice recognition when the component mounts
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechEnd = () => {
      console.log('Voice recognition ended.');
      Voice.destroy().then(Voice.removeAllListeners);
    };

    return () => {
      Voice.removeAllListeners('onSpeechResults');
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleSpeechResults = (e) => {
    // Process the recognized speech results
    const speechResult = e.value[0].toLowerCase();
    console.log('User said:', speechResult); // Console log the user's voice command
    setVoiceResponse(speechResult);
    if (speechResult.includes('yes')) {
      // If the user said 'yes', navigate to the Camera screen
      navigation.navigate('CameraScreen');
    }
  };

  const goToCameraScreen = () => {
    // Start voice recognition
    Voice.start('en-US');
  };

  const startAnimation = () => {
    // ... Same as before
  };

  const speakWelcomeMessage = () => {
    if (speechStarted) {
      return; // If speech is already started, return
    }

    console.log('Speech started');
    setSpeechStarted(true);
    Speech.speak("Welcome, shall I take a picture?", {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => {
        console.log('Speech done');
        setSpeechStarted(false); // Reset speechStarted when speech is done
      },
      onError: (error) => {
        console.log('Speech error:', error);
        setSpeechStarted(false); // Reset speechStarted on error
      },
    });
  };

  if (!fontLoaded) {
    return null; // Render nothing while the font is loading
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleContainer, { transform: [{ translateY: translateYValue }] }]}>
        <Text style={styles.title}>IntelliVision</Text>
      </Animated.View>
      <Animated.Text
        style={[styles.subtitle, { opacity: fadeInValue, transform: [{ translateX: fadeInValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }) }] }]}
      >
        Capture and Analyze the World Around You
      </Animated.Text>
      <TouchableOpacity style={styles.button} onPress={goToCameraScreen} onLayout={startAnimation}>
        <Animated.Text style={[styles.buttonText, { opacity: fadeInValue }]}>Go to Camera</Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontFamily: 'poppins-bold',
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'poppins-regular',
    color: '#3b82f6',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1f4fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'poppins-bold',
  },
});

export default HomeScreen;
