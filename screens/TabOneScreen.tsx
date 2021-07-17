import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [userFullName, setUserFullName] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem('fullName').then((name) => {
      setUserFullName(name);
    });
  }, [userFullName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userFullName?.trim()}!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'work-sans-bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
