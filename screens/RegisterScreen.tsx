import * as React from 'react';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet, TextInput, Image, Pressable, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useFonts } from 'expo-font';

interface RegisterScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const RegisterScreen: FC<RegisterScreenProps> = (props) => {
  let [fontsLoaded] = useFonts({
    'work-sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    'work-sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });

  const form = useFormik<{
    fullName: string;
    email: string;
    password: string;
  }>({
    async onSubmit(data) {
      console.log(data.fullName);
      await AsyncStorage.setItem('fullName', data.fullName);
      await AsyncStorage.setItem('email', data.email);
      props.navigation.replace('Root');
    },
    validationSchema: () =>
      yup.lazy(() => {
        const schema = {
          fullName: yup.string().required('This field is required!'),
          email: yup.string().required('This field is required!'),
          password: yup.string().required('This field is required!'),
        };

        return yup.object(schema);
      }),
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <KeyboardAwareScrollView>
          <Text style={styles.title}>Register</Text>
          <TextInput onChangeText={form.handleChange('fullName')} placeholder="Full Name" style={styles.input} textContentType="name" />
          <TextInput onChangeText={form.handleChange('email')} placeholder="Email" style={styles.input} textContentType="emailAddress" />
          <TextInput placeholder="Password" onChangeText={form.handleChange('password')} secureTextEntry={true} style={styles.input} />
          <Pressable onPress={form.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'work-sans-bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#71a0ae',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'work-sans-bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#393D47',
    paddingHorizontal: 20,
    marginBottom: 30,
    fontFamily: 'work-sans-regular',
  },
  logo: {
    marginBottom: 30,
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
