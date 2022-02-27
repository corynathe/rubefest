import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Quiz } from "./quiz/Quiz";

export default function App() {
  return (
      <SafeAreaProvider>
        <Quiz />
        <StatusBar  />
      </SafeAreaProvider>
  );
}
