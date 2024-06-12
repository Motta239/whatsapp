import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect, SplashScreen, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider, useAuth } from '~/context/AuthProvider';
import { useEffect, useState } from 'react';
import { LoaderScreen } from 'react-native-ui-lib';
import '../global.css';
import Colors from '~/lib/Colors';

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <InitialLayout />
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

function InitialLayout() {
  return (
    <>
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', animation: 'fade' }} />
      </Stack>
    </>
  );
}
