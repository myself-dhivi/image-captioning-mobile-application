import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Import your screens here
import HomeScreen from './Screens/Home';
import CameraScreen from './Screens/Camera';
// Add more screens as needed

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        {/* Add more screen entries here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
