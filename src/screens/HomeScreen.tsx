import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const HomeScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
    <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Welcome to Modular React Native App!</Text>
    <Button title="Get Started" onPress={() => {}} />
  </View>
);

export default HomeScreen;
