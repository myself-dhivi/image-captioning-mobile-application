import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';

const HomeScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const scaleValue = new Animated.Value(0);
  const translateYValue = new Animated.Value(-30);
  const fadeInValue = new Animated.Value(0);

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

  const goToCameraScreen = () => {
    navigation.navigate('CameraScreen');
  };

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
    // Start the welcome message after the animation is completed
    speakWelcomeMessage();
  });
  };

  const speakWelcomeMessage = () => {
    console.log('Speak function called');
    Speech.speak("Welcome, shall I take a picture?", {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onStart: () => console.log('Speech started'),
      onDone: () => console.log('Speech done'),
      onError: (error) => console.log('Speech error:', error),
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
