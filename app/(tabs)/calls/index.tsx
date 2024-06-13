import React, { useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { SegmentedControl } from '~/components/SegmentedControl';
import calls from '~/assets/data/calls.json';

import { Ionicons } from '@expo/vector-icons';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';
import Colors from '~/lib/Colors';
import SwipeableRow from '~/components/SwipeableRow';
import { View, Text } from '~/components/Themed';
import tw from 'twrnc';
import { useColorScheme } from '~/hooks/useColorScheme';
import { SearchBarCommands } from 'react-native-screens';
import { Call } from '~/lib/types';

const transition = CurvedTransition.delay(100);

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const { background, textColor, isDarkColorScheme } = useColorScheme();
  const [selectedOption, setSelectedOption] = useState('All');
  const [filteredItems, setFilteredItems] = useState(calls);
  const [isEditing, setIsEditing] = useState(false);
  const searchRef = useRef<SearchBarCommands>(null);
  const editing = useSharedValue(-50);

  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'All') {
      setFilteredItems(calls);
    } else {
      setFilteredItems(calls.filter((call) => call.missed));
    }
  };

  const removeCall = (toDelete: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilteredItems(filteredItems.filter((item) => item.id !== toDelete.id));
  };

  const onEdit = () => {
    const editingNew = !isEditing;
    editing.value = editingNew ? 0 : -50;
    setIsEditing(editingNew);
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  const animatedPosition = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  const renderItem = ({ item, index }: { item: Call; index: number }) => (
    <SwipeableRow onDelete={() => removeCall(item)}>
      <Animated.View
        entering={FadeInUp.delay(index * 20)}
        exiting={FadeOutUp}
        style={tw` flex-row items-center justify-between gap-2  bg-[${background}] px-3 py-2`}>
        <AnimatedTouchableOpacity
          style={[animatedPosition, tw`pl-2 `]}
          onPress={() => removeCall(item)}>
          <Ionicons name="remove-circle" size={24} color={Colors.red} />
        </AnimatedTouchableOpacity>

        <Animated.View style={[tw` flex-row  items-center  pl-5`, animatedRowStyles]}>
          <Image source={{ uri: item.img }} style={tw`h-10 w-10 rounded-full`} />

          <View style={tw`ml-3 flex-1`}>
            <Text style={tw` ${item.missed ? `text-[${Colors.red}]` : `text-[${textColor}]`}`}>
              {item.name}
            </Text>

            <View style={tw`flex-row items-center `}>
              <Ionicons name={item.video ? 'videocam' : 'call'} size={16} color={textColor} />
              <Text style={tw`text-[${textColor}] ml-1`}>
                {item.incoming ? 'Incoming' : 'Outgoing'}
              </Text>
            </View>
          </View>

          <Ionicons
            name="information-circle-outline"
            allowFontScaling={false}
            minimumFontScale={1.3}
            size={24}
            color={textColor}
          />
        </Animated.View>
      </Animated.View>
    </SwipeableRow>
  );

  return (
    <View style={tw` flex-1 ${isDarkColorScheme ? 'bg-black ' : 'bg-gray-100'} `}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitleStyle: tw`text-[${textColor}]`,
          headerStyle: tw`${isDarkColorScheme ? 'bg-black' : 'bg-gray-100'}`,
          headerLargeTitle: true,
          title: 'Calls',
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={selectedOption}
              onOptionPress={onSegmentChange}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={tw`text-[${textColor}] text-lg font-bold`}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={onEdit}>
              <Ionicons name="add-circle" size={30} color={textColor} />
            </TouchableOpacity>
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            ref: searchRef,
            onChangeText: (text) => {
              setFilteredItems(
                calls.filter((call) =>
                  call.name.toLowerCase().includes(text.nativeEvent.text.toLowerCase())
                )
              );
            },
          },
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        onMomentumScrollEnd={() => searchRef.current?.cancelSearch()}>
        <Animated.View layout={transition}>
          <View
            style={tw` h-15 m-4 flex-row items-center  gap-2  bg-[${background}] rounded-2xl px-3 py-2 shadow-md`}>
            <View style={tw` rounded-full p-2`}>
              <Ionicons name="link" size={23} color={textColor} />
            </View>
            <View style={tw`flex-1 justify-center`}>
              <Text style={tw`text-[${textColor}] text-lg font-semibold`}>Create a call link </Text>
              <Text style={tw`text-[${textColor}]  `}>
                Share a link with your whatsapp contacts
              </Text>
            </View>
          </View>

          <Text style={tw`text-[${textColor}] px-6 text-lg font-bold`}>Recents</Text>
          <FlatList
            data={filteredItems}
            style={tw`m-4 rounded-2xl`}
            ItemSeparatorComponent={() => (
              <View style={tw`h-[0.5px] bg-[${Colors.gray}] opacity-10`} />
            )}
            ListEmptyComponent={() => (
              <View
                style={tw` h-45 m-4 flex-row items-center justify-center  gap-2  bg-[${background}] rounded-2xl px-3 py-2 shadow-md`}>
                <Text>
                  No Resualts Please try diffrent query <TouchableOpacity>Reset</TouchableOpacity>
                </Text>
              </View>
            )}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Page;
