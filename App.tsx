import 'react-native-gesture-handler';
import 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Router from './router';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    loadResourcesAsync()
  }, [])

  const loadResourcesAsync = async () => {
    try {
      await Promise.all([
        Font.loadAsync({
          'regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'regular-italic': require('./assets/fonts/Roboto-Italic.ttf'),
        }),
        new Promise(resolve => setTimeout(resolve, 2000)),// look into this
      ]);
    }
    catch (e) {
      console.warn(e);
    }
    finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }



  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <Router />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontFamily: 'regular',
    fontSize: 16,
    color: '#000',
  }
});
