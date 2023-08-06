import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Font from 'expo-font';
import { Speech } from 'expo-speech';

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const scaleValue = new Animated.Value(0);
  const translateYValue = new Animated.Value(-30);
  const fadeInValue = new Animated.Value(0);

  // Load custom fonts when the component mounts
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

    const sayWelcomeMessage = async () => {
      try {
        await Speech.speak('Welcome! I shall take a picture.');
      } catch (error) {
        console.warn('Error speaking the welcome message:', error);
      }
    };

    loadFont();
    sayWelcomeMessage();
  }, []);

  // Navigate to CameraScreen when the "Go to Camera" button is pressed
  const goToCameraScreen = () => {
    navigation.navigate('CameraScreen');
  };

  // Animation function to fade in the subtitle text
  const startAnimation = () => {
    Animated.timing(fadeInValue, {
      toValue: 1, // Final value of the opacity (fully opaque)
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: true, // For better performance, set useNativeDriver to true
    }).start(); // Start the animation
  };

  // Render nothing while the font is loading
  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Animated title */}
      <Animated.View style={[styles.titleContainer, { transform: [{ translateY: translateYValue }] }]}>
        <Text style={styles.title}>IntelliVision</Text>
      </Animated.View>

      {/* Animated subtitle */}
      <Animated.Text
        style={[styles.subtitle, { opacity: fadeInValue }]}
      >
        Capture and Analyze the World Around You
      </Animated.Text>

      {/* Button to navigate to the CameraScreen */}
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
    fontSize: 20,
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
