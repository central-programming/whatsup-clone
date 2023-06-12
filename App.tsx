import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [count, setCount] = useState(0)
  const counter = new Counter(count, setCount)
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
      <Text>The score is: {counter.getCount()}</Text>
      <Button title="Increase" onPress={counter.increment} />
      <Button title="Decrease" onPress={counter.decrement} />
      <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

class Counter {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  constructor(count: number, setCount: React.Dispatch<React.SetStateAction<number>>) {
    this.count = count
    this.setCount = setCount
  }
  increment = () => {
    // this.setCount(this.count + 1)
    this.setCount((prevCount) => prevCount + 1)
  }
  decrement = () => {
    // this.setCount(this.count - 1)
    this.setCount((prevCount) => prevCount - 1)
  }
  getCount() {
    return this.count
  }

}