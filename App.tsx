import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Quiz } from "./quiz/Quiz";

export default function App() {
  return (
      <SafeAreaProvider>
        <Quiz />
      </SafeAreaProvider>
  );
}
