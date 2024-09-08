import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home Screen'; // Adjust the path as needed
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen';
import DirectoryScreen from './DirectoryScreen';
import ADIDAS from './DetailsPages/ADIDAS';
import { RootStackParamList } from "./App"; // Import types
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DirectoryScreen" component={DirectoryScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="ADIDAS" component={ADIDAS} />
    </Stack.Navigator>
  );
};

export default HomeStack;
