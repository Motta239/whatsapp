import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/context/AuthProvider';

const Layout = () => {
  const { session, loading } = useAuth();

  if (session) return <Redirect href="(tabs)" />;
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen name="[phone]" options={{}} />
    </Stack>
  );
};

export default Layout;
