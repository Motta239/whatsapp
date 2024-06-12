import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, Text, Separator } from '~/components/Themed';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import BoxedIcon from '~/components/BoxedIcon';
import { FlatList, Image } from 'react-native';
import Colors from '~/lib/Colors';
import { Stack } from 'expo-router';
import { useColorScheme } from '~/hooks/useColorScheme';
import tw from 'twrnc';

import { useRef, useState } from 'react';
import DraggableItem from '~/components/DraggableItem';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { settings } from '~/lib/settings';
import { useAuth } from '~/context/AuthProvider';
import { Header } from '~/components/Settings/SettingsHeader';

const Settings = () => {
  const { user } = useAuth();
  const { textColor, background, isDarkColorScheme, sectionBackground } = useColorScheme();
  const searchRef = useRef<SearchBarCommands>(null);
  const [search, setSearch] = useState('');
  const { signOut } = useAuth();
  const filteredItems = settings
    .map((section) => section.data)
    .flat()
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={tw`flex-row items-center justify-between  p-3`}>
      <View style={tw`flex-row items-center bg-transparent`}>
        <Ionicons name={item.icon} size={24} color={textColor} style={tw`mr-3`} />
        <Text style={[tw`text-base text-[${textColor}]`]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerBackTitleVisible: false,
          title: 'Settings',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
            color: textColor,
          },
          headerStyle: {
            backgroundColor: background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
            ref: searchRef,
            onChangeText: (text) => {
              setSearch(text.nativeEvent.text);
            },
          },
        }}
      />
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        {search.length > 0 ? (
          <View style={tw`absolute bottom-0 left-0 right-0  top-0 z-30  bg-transparent p-3`}>
            <DraggableItem>
              {(translationX, translationY) => {
                if (translationX < -200) {
                  searchRef?.current?.clearText();
                  searchRef?.current?.blur();
                  searchRef?.current?.cancelSearch();
                }
                return (
                  <View style={tw`flex-1 rounded-xl`}>
                    <FlatList
                      style={tw`pt-20`}
                      data={filteredItems}
                      keyExtractor={(item) => item.name}
                      contentInsetAdjustmentBehavior="automatic"
                      ItemSeparatorComponent={() => <Separator />}
                      contentContainerStyle={tw`  rounded-xl bg-[${isDarkColorScheme ? Colors.muted : Colors.lightGray}] `}
                      renderItem={renderItem}
                    />
                  </View>
                );
              }}
            </DraggableItem>
          </View>
        ) : null}
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={tw`pb-20`}>
          <Header user={user ?? null} />

          {settings.map((section) => (
            <View key={section.title} style={tw`m-3 bg-[${sectionBackground}] rounded-xl `}>
              <FlatList
                scrollEnabled={false}
                data={section.data}
                ItemSeparatorComponent={() => (
                  <View style={tw`h-[0.5px] bg-[${Colors.gray}] opacity-30`} />
                )}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </View>
          ))}
          <View style={tw`items-center justify-center`}>
            <TouchableOpacity
              onPress={signOut}
              style={tw` items-center bg-[${sectionBackground}] justify-center rounded-xl  p-3 shadow-lg`}>
              <Text style={[tw`  font-semibold  text-[${textColor}]`]}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Settings;
