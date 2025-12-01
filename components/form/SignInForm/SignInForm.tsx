import styles from './SignInForm.style';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RadiusInput from '@/common/input/radius';
import TextIconButton from '@/common/button/textIconButton';
import { fontStyle, globalStyle } from '@/assets/styles';
import IconIonicons from '@expo/vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { layoutConfig } from '@/config/layout';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';


const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
});

const SignInForm = () => {
  const router = useRouter();
  const { setError: setAuthError, setLoading } = useAuthStore.getState();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log('Sign in Success')
      router.push('/');
    } catch (e: any) {
      setAuthError(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
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
          initialValues={{ email: 'test@gmail.com', password: '123456' }}
          validateOnMount={true}
          onSubmit={handleSignIn}
          validationSchema={loginValidationSchema}>
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
                style={{ ...fontStyle.body03 }}
                value={values.email}
                handleTextChange={handleChange('email')}
                onBlur={handleBlur('email')}
                type='text' />
              <Text
                style={[
                  globalStyle.mt5,
                  { color: 'red' },
                  fontStyle.body03,
                  globalStyle.w100,
                ]}>
                {errors.email && touched.email ?
                  <><IconIonicons name="warning" size={20} /> {errors.email}</> : ''}
              </Text>
              <RadiusInput
                isPassword={true}
                placeHolder='Password'
                value={values.password}
                handleTextChange={handleChange('password')}
                onBlur={handleBlur('password')} />
              <Text
                style={[
                  globalStyle.mt5,
                  { color: 'red' },
                  fontStyle.body03,
                  globalStyle.w100,
                ]}>
                {errors.password && touched.password ?
                  <><IconIonicons name="warning" size={20} /> {errors.password}</> : ''}
              </Text>
              <TextIconButton
                content='SIGN IN'
                isLoading={isSubmitting}
                disabled={isSubmitting || !isValid}
                onPress={handleSubmit} />
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
        <View style={[globalStyle.flexRow, globalStyle.cenCen, { marginTop: 15 }]}>
          <Text style={[fontStyle.title03, { color: layoutConfig.color._COLOR_BRAND_WHITE }]}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}><Text style={{ color: layoutConfig.color._COLOR_HIGHLIGHT }}>Register</Text></TouchableOpacity>
        </View>
      </View>
    </LinearGradient >
  )
}

export default SignInForm;