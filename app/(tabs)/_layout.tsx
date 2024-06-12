import { Redirect, Tabs, useSegments } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useColorScheme } from '~/hooks/useColorScheme';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { View } from '~/components/Themed';
import { useAuth } from '~/context/AuthProvider';

export default function TabLayout() {
  const { session } = useAuth();
  const { isDarkColorScheme, background, textColor, tabIcon } = useColorScheme();
  const segments = useSegments();
  const currentTab = segments[segments.length - 1];
  const noTabBar = currentTab == '[chat]' || currentTab == '[contactInfo]';

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: tabIcon,
    tabBarStyle: {
      backgroundColor: isDarkColorScheme ? '#2a2a2a' : 'white',
      borderTopWidth: 0,
    },
    headerStyle: {
      backgroundColor: background,
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 16,
      color: textColor,
    },
    headerShadowVisible: false,

    headerTitleAllowFontScaling: false,
    tabBarAllowFontScaling: false,
    tabBarLabelStyle: { fontWeight: '600' },
  };

  if (!session) return <Redirect href="(auth)/login" />;
  return (
    <Tabs tabBar={noTabBar ? () => <View /> : undefined} screenOptions={screenOptions}>
      <Tabs.Screen
        name="(updates)"
        options={{
          headerShown: false,
          title: 'Updates',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud-upload' : 'cloud-upload-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'call' : 'call-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(chats)"
        options={{
          title: 'Chats',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
