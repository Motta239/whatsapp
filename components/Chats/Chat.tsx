import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';

import { Stack } from 'expo-router';
import { SearchBarCommands } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import ChatListItem from './ChatListItem';
import { View } from '../Themed';
import { useColorScheme } from '~/hooks/useColorScheme';
import { ChatProps } from '~/lib/types';

import * as Progress from 'react-native-progress';
import { useLiveChatUpdates } from '~/hooks/useLIveChat';
import ChatActions from './ChatActions';
import { ChatListEmptyComponent, ChatListHeader } from '../FlatListComponents';

const ChatList: React.FC = () => {
  const { chats, isLoading, error } = useLiveChatUpdates();
  const { colorScheme, textColor, background } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<ChatProps[] | null>(null);
  const [swipingItemId, setSwipingItemId] = useState<string | null>(null);

  const swipeRef = useRef<Swipeable>(null);
  const searchRef = useRef<SearchBarCommands>(null);

  const handleSwipeOpen = (id: string) => {
    if (swipingItemId !== id) {
      setSwipingItemId(id);
    }
  };

  const handleSwipeClose = () => {
    setSwipingItemId(null);
  };

  useEffect(() => {
    if (chats) {
      setFilteredChats(
        chats.filter(
          (item): item is ChatProps =>
            item.name !== undefined && item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredChats(null);
    }
  }, [searchQuery, chats]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Network Error',
        'No network is present. Trying to reload the page.',
        [
          {
            text: 'Retry',
            onPress: () => {
              // Logic to re-mount the component
              setFilteredChats(null);
              setSearchQuery('');
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [error]);

  const renderItem = ({ item }: { item: ChatProps }) => (
    <ChatListItem
      item={item}
      ref={swipeRef}
      onSwipeOpen={handleSwipeOpen}
      onSwipeClose={handleSwipeClose}
      isSwiping={swipingItemId !== null && swipingItemId !== item.id.toString()}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Chats',
          headerBackTitleVisible: true,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal-circle" size={24} color={textColor} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: background,
          },
          headerTintColor: textColor,
          headerRight: () => <ChatActions />,
          headerSearchBarOptions: {
            placeholder: 'Search Chat',
            hideWhenScrolling: true,
            textColor: textColor,
            ref: searchRef as React.RefObject<SearchBarCommands>,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      {isLoading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <Progress.Circle size={100} indeterminate animated />
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          style={tw`bg-[${background}]`}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={(item) => item.id.toString()}
          onMomentumScrollBegin={() => searchRef.current?.cancelSearch()}
          ListHeaderComponent={
            <ChatListHeader
              title="archive"
              textColor={textColor}
              icon="archive"
              onPress={() => {}}
            />
          }
          ListEmptyComponent={
            <ChatListEmptyComponent
              setSearchQuery={setSearchQuery}
              section="chat"
              searchRef={searchRef}
            />
          }
        />
      )}
    </>
  );
};

export default ChatList;
