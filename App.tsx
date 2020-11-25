import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './app/hooks/useCachedResources';
import MainScreen from './app/university/task-8/MainScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <MainScreen />
      </SafeAreaProvider>
    )
  }
}