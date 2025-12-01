import React from 'react';
import SignInForm from '@/components/form/SignInForm';
import { View } from 'react-native';

const SignIn = () => {
  return <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 320 }}>
    <SignInForm />
  </View>
};

export default SignIn;