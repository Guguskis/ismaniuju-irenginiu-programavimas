import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './app/hooks/useCachedResources';
import MainScreen from './app/university/first-test/MainScreen';
import Index from './app/university/second-task/Index';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Index />
      </SafeAreaProvider>
    )
  }
}