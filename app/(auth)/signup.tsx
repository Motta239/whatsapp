import React, { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import Animated, { ReduceMotion, StretchInX } from 'react-native-reanimated';
import { useColorScheme } from '~/hooks/useColorScheme';
import { signInWithOAuth, signUpWithEmail } from '~/utils/supabase';
import FormField from '~/components/FormField';
import tw from 'twrnc';
import CountryPickerComponent from '~/components/CountryPicker';
import OAuthButton from '~/components/OauthButton';

type FormData = {
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { background, textColor } = useColorScheme();
  const [form, setForm] = useState<FormData>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsValid(!!(form.email && form.password));
  };
  const onSignUpPress = async () => {
    setIsSubmitting(true);
    const { user, error } = await signUpWithEmail(form.email, form.password);
    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      Alert.alert('Sign Up Successful', `Welcome, ${user?.email}`);
      // Navigate to home or another route after successful sign up
    }

    setIsSubmitting(false);
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-[${background}]`}
      contentInsetAdjustmentBehavior="automatic"
      scrollEnabled={false}>
      <Animated.View
        entering={StretchInX.withInitialValues({
          transform: [{ scaleX: 0.9 }],
        }).duration(700)}>
        <View style={tw`  gap-4 p-3`}>
          <View style={tw`  gap-3 p-4 `}>
            <FormField
              title="Email"
              placeholder="Email"
              value={form.email}
              handleChangeText={(value: string) => handleChange('email', value)}
              error={form.email ? '' : 'Email is required'}
            />
            <FormField
              title="Password"
              placeholder="Password"
              value={form.password}
              handleChangeText={(value: string) => handleChange('password', value)}
              error={form.password ? '' : 'Password is required'}
            />
            <TouchableOpacity
              onPress={onSignUpPress}
              style={tw`  mx-7 my-7 flex-row items-center justify-center rounded-lg py-3 bg-[${
                isValid ? '#2A63F6' : background
              }]`}
              disabled={!isValid || isSubmitting}>
              <Text style={tw`  text-${isValid ? 'white' : `[${textColor}]`} font-semibold`}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={tw`  font-semibold  `}>
                Already Have an Account?{' '}
                <Text style={tw` border font-bold  text-blue-700 `}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`  gap-3 p-4`}>
            <Text style={tw`   font-semibold  `}>Sign Up with Phone</Text>
            <CountryPickerComponent />
          </View>
          <View style={tw`  mx-2.5 flex-row justify-between px-3`}></View>
        </View>
        <View style={tw`items-center gap-3`}>
          <OAuthButton
            provider="Apple"
            textColor={textColor}
            name="apple1"
            onPress={() => signInWithOAuth('apple')}
          />
          <OAuthButton
            provider="Google"
            textColor={textColor}
            name="google"
            onPress={() => signInWithOAuth('google')}
          />
          <OAuthButton
            provider="GitHub"
            textColor={textColor}
            name="github"
            onPress={() => signInWithOAuth('github')}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default SignUp;
