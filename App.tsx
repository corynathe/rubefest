import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LinkingConfiguration from "./LinkingConfiguration";
import { Home } from "./Home";
import { Quiz } from "./quiz/Quiz";
import { CrystalBall } from "./ball/CrystalBall";
import { Maze } from "./maze/Maze";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
                <Stack.Screen name="Ball" component={CrystalBall} options={{ headerShown: false }} />
                <Stack.Screen name="Maze" component={Maze} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        <StatusBar  />
    </SafeAreaProvider>
  );
}
