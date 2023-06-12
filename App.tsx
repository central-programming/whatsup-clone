import 'react-native-gesture-handler';
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
        new Promise(resolve => setTimeout(resolve, 2000)),
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

  if (!appIsReady) {
    return null;
  }




  return (
    <SafeAreaProvider style={styles.container}>
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
