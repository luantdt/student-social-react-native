import SignUpForm from '@/components/form/SignUpForm';
import { View } from 'react-native';

const SignUp = () => {
  return <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 400 }}>
    <SignUpForm />
  </View>
}

export default SignUp;