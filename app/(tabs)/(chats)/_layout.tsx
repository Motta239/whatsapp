import { Stack } from 'expo-router';

export default function ChatsLayout() {
  return (
    <Stack initialRouteName="chats">
      <Stack.Screen name="chats" />
      <Stack.Screen name="[chat]/index" options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen
        name="contact/[contactInfo]/index"
        options={{ animation: 'fade_from_bottom' }}
      />
    </Stack>
  );
}
