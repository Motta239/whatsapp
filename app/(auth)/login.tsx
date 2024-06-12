// Import necessary libraries and components
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Animated, { StretchInX } from 'react-native-reanimated';
import * as Burnt from 'burnt';
import OAuthButton from '~/components/OauthButton';

import tw from 'twrnc';
import { useColorScheme } from '~/hooks/useColorScheme';
import { signInWithEmail, signInWithOAuth } from '~/utils/supabase';
import { Text, View } from '~/components/Themed';
import CountryPickerComponent from '~/components/CountryPicker';
import FormField from '~/components/FormField';
import DropdownComponent from '~/components/CountrySelect';
import { Country } from 'react-native-country-picker-modal';

// Define the structure of the form data
type FormData = {
  email: string;
  password: string;
};

// Define the Login component
const Login: React.FC = () => {
  // Get color scheme for theming
  const { background, textColor } = useColorScheme();

  // State hooks for form data, submission status, validation, and loading
  const [form, setForm] = useState<FormData>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Handle changes in form fields
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsValid(!!(form.email && form.password)); // Validate form
  };

  // Handle login button press
  const onLoginPress = async () => {
    setLoading(true); // Set loading state
    const { error } = await signInWithEmail(form.email, form.password); // Attempt to sign in
    if (error) {
      // Show error toast if login fails
      Burnt.toast({
        title: 'Login Error',
        preset: 'error',
        message: error.message,
        haptic: 'error',
      });
    }
    setLoading(false); // Reset loading state
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-[${background}]`}
      contentInsetAdjustmentBehavior="automatic"
      scrollEnabled={false}>
      <Animated.View
        entering={StretchInX.withInitialValues({
          transform: [{ scaleX: 0.9 }],
        }).duration(700)}
        style={tw`  m-3 bg-[${background}] gap-4  rounded-xl p-3`}>
        <View style={tw`  gap-3 p-4 `}>
          {/* Email input field */}
          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(value: string) => handleChange('email', value)}
            error={form.email ? '' : 'Email is required'}
          />
          {/* Password input field */}
          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(value: string) => handleChange('password', value)}
            error={form.password ? '' : 'Password is required'}
          />
          {/* Login button */}
          <TouchableOpacity
            onPress={onLoginPress}
            style={tw`  mx-7 my-7 flex-row items-center justify-center rounded-lg py-3 bg-[${
              isValid ? '#2A63F6' : background
            }]`}
            disabled={!isValid || isSubmitting}>
            {loading ? (
              <Text style={tw`  text-${isValid ? 'white' : `[${textColor}]`} font-semibold`}>
                Loading...
              </Text>
            ) : (
              <Text style={tw`  text-${isValid ? 'white' : `[${textColor}]`} font-semibold`}>
                Login
              </Text>
            )}
          </TouchableOpacity>
          {/* Link to sign up page */}
          <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
            <Text style={tw`  font-semibold  `}>
              Don't Have an Account?{' '}
              <Text style={tw` border font-bold  text-blue-700 `}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section for phone login */}
        <View style={tw`  gap-3 p-4`}>
          <Text style={tw`   font-semibold  `}>Login with Phone</Text>

          <DropdownComponent
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </View>

        {/* Section for OAuth login buttons */}
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

export default Login;
