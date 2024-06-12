import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import tw from 'twrnc';

import { router } from 'expo-router';

import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/hooks/useColorScheme';
import { Text, View } from '../Themed';
import { ChatProps } from '~/lib/types';

enum SwipeType {
  DELETE = 'Delete',
  ARCHIVE = 'Archive',
  MARK_READ = 'Mark Read',
}

interface ChatListItemProps {
  item: ChatProps;
  onSwipeOpen: (id: string) => void;
  onSwipeClose: () => void;
  isSwiping: boolean;
}

const ChatListItem = forwardRef<Swipeable, ChatListItemProps>(
  ({ item, onSwipeOpen, onSwipeClose, isSwiping }, ref) => {
    const { colorScheme, background } = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [swipeableRow, setSwipeableRow] = useState<Swipeable | null>(null);

    const navigateToChat = () => {
      router.push({
        pathname: '/(tabs)/(chats)/[chat]/',
        params: { chatId: item.id, chatName: item.name, chatAvatar: item.avatar },
      });
    };

    const handleSwipeAction = (type: SwipeType) => {
      if (isSwiping) return; // Prevent multiple swipes at the same time

      console.warn(`Swipe Type: ${type}`);
      if (type === SwipeType.DELETE) {
        handleDelete(item.id.toString());
      } else if (type === SwipeType.ARCHIVE) {
        handleArchive(item.id.toString());
      } else if (type === SwipeType.MARK_READ) {
        handleMarkRead(item.id.toString());
      }
    };

    const handleDelete = (id: string) => {
      Alert.alert(
        'Delete',
        'Are you sure you want to delete this chat?',
        [
          { text: 'Cancel', style: 'cancel', onPress: onSwipeClose },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              // Implement delete logic here
              onSwipeClose();
            },
          },
        ],
        { userInterfaceStyle: isDarkMode ? 'dark' : 'light' }
      );
    };

    const handleArchive = (id: string) => {
      console.warn('Archive', id);
      // Add your archive logic here
      onSwipeClose();
    };

    const handleMarkRead = (id: string) => {
      console.warn('Mark Read', id);
      // Add your mark read logic here
      onSwipeClose();
    };

    const renderRightActions = () => (
      <View style={tw`flex-row`}>
        <TouchableOpacity
          style={tw`w-24 items-center justify-center bg-red-500`}
          onPress={() => handleSwipeAction(SwipeType.DELETE)}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={tw`text-white`}>{SwipeType.DELETE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-24 items-center justify-center bg-blue-500`}
          onPress={() => handleSwipeAction(SwipeType.ARCHIVE)}>
          <Ionicons name="archive-outline" size={24} color="white" />
          <Text style={tw`text-white`}>{SwipeType.ARCHIVE}</Text>
        </TouchableOpacity>
      </View>
    );

    const renderLeftActions = () => (
      <TouchableOpacity
        style={tw`w-24 items-center justify-center bg-green-500`}
        onPress={() => handleSwipeAction(SwipeType.MARK_READ)}>
        <Ionicons name="checkmark-outline" size={24} color="white" />
        <Text style={tw`text-white`}>{SwipeType.MARK_READ}</Text>
      </TouchableOpacity>
    );
    return (
      <Swipeable
        ref={ref}
        shouldCancelWhenOutside={false}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableWillOpen={() => onSwipeOpen(item.id.toString())}
        onSwipeableWillClose={onSwipeClose}>
        <TouchableOpacity style={tw`bg-[${background}]`} onPress={navigateToChat}>
          <View style={tw`flex-row justify-between gap-2 p-3`}>
            <Avatar
              source={{ uri: item.avatar }}
              size={50}
              containerStyle={tw`bg-white shadow-md`}
            />
            <View style={tw`flex-1 items-start`}>
              <Text style={tw`font-bold`}>{item.name}</Text>
              <Text style={tw`text-sm`}>{item.lastMessage?.content ?? ''}</Text>
            </View>
            <Text style={tw`text-xs text-gray-500`}>
              {new Date(item.lastMessage?.date).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
);

export default ChatListItem;
