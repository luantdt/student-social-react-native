import styles from './SignUpForm.style';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RadiusInput from '@/common/input/radius';
import TextIconButton from '@/common/button/textIconButton';
import { fontStyle, globalStyle } from '@/assets/styles';
import { useNavigation, useRouter } from 'expo-router';
import { Formik } from 'formik';
import IconIonicons from '@expo/vector-icons/Ionicons';
import * as yup from 'yup';
import { layoutConfig } from '@/config/layout';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please enter your email address"),
  password: yup.string().min(6, number => `Passwords must be at least ${number.min} characters`).required("Please enter your password"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required("Please confirm your password"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log('User account created & signed in!');
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <LinearGradient
      colors={['#7843CE', '#1A024A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >

      <View style={styles.area}>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validateOnMount={true}
          onSubmit={handleSignUp}
          validationSchema={signUpValidationSchema}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
            isValid
          }) => (
            <>
              <RadiusInput
                isPassword={false}
                placeHolder='Email'
                style={{ marginBottom: 20, ...fontStyle.body03 }}
                value={values.email}
                handleTextChange={handleChange('email')}
                onBlur={handleBlur('email')}
                errorText={errors.email && touched.email ? errors.email.toString() : ''}
              />
              <RadiusInput
                isPassword={true}
                placeHolder='Password'
                style={{ marginBottom: 20, ...fontStyle.body03 }}
                value={values.password}
                handleTextChange={handleChange('password')}
                onBlur={handleBlur('password')}
                errorText={errors.password && touched.password ? errors.password.toString() : ''}
              />

              <RadiusInput
                isPassword={true}
                placeHolder='Confirm Password'
                style={{ marginBottom: 40, ...fontStyle.body03 }}
                value={values.confirmPassword}
                handleTextChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                errorText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword.toString() : ''}
              />

              <TextIconButton
                content='SIGN UP'
                onPress={handleSubmit}
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting} />
              <Text
                style={[
                  globalStyle.cenCen,
                  globalStyle.mt5,
                  { color: 'red' },
                  fontStyle.body03,
                ]}>
                {error ? <><IconIonicons name="warning" size={20} /> {error}</> : ""}
              </Text>
            </>
          )}
        </Formik>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, }}>
          <Text style={[fontStyle.title03, { color: layoutConfig.color._COLOR_BRAND_WHITE }]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signin')}><Text style={[fontStyle.title03, { color: layoutConfig.color._COLOR_HIGHLIGHT }]}> Login</Text></TouchableOpacity>
        </View>
      </View>
    </LinearGradient >
  )
}

export default SignUpForm;