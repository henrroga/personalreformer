import * as React from 'react';
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { FC } from 'react';
import { useFonts } from 'expo-font';

interface OnboardingScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
}

const OnboardingScreen: FC<OnboardingScreenProps> = (props) => {
  let [fontsLoaded] = useFonts({
    'work-sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    'work-sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <Onboarding
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        nextLabel={'next'}
        skipLabel={'skip'}
        onSkip={() => {
          props.navigation.replace('Register');
        }}
        onDone={() => {
          props.navigation.replace('Register');
        }}
        pages={[
          {
            backgroundColor: '#97c266',
            title: 'lighterliving',
            subtitle: 'welcome to the lighterliving app!',
            image: <Image source={require('../assets/images/logo-white.png')} style={styles.image} />,
          },
          {
            backgroundColor: '#97c266',
            title: 'personal reformer',
            subtitle: 'your personal trainer with you every day!',
            image: <Image source={require('../assets/images/pilates.png')} style={styles.image} />,
          },
          {
            backgroundColor: '#97c266',
            title: 'save progress',
            subtitle: 'train everyday and make progress!',
            image: <Image source={require('../assets/images/progress-2.png')} style={styles.image} />,
          },
          {
            backgroundColor: '#97c266',
            title: 'personalized trainings',
            subtitle: 'we create personalized workouts for you!',
            image: <Image source={require('../assets/images/customer.png')} style={styles.image} />,
          },
        ]}
      />
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'work-sans-bold',
  },
  subtitle: {
    fontFamily: 'work-sans-regular',
  },
  image: {
    width: '70%',
    resizeMode: 'contain',
  },
});

export default OnboardingScreen;
