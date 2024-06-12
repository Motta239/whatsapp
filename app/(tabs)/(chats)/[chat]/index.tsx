import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import HeaderActions from '~/components/Chats/HeaderActions';
import ChatMessage from '~/components/Chats/ChatMessage';
import { useColorScheme } from '~/hooks/useColorScheme';
import { Swipeable } from 'react-native-gesture-handler';
import Reanimated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import { useKeyboardAnimation } from '~/hooks/useKeyboardAnimation';
import MessageInput from '~/components/Chats/MessageInput';
import { addMessageToUserChat } from '~/utils/supabase';
import { Text } from '~/components/Themed';
import { useLiveChatUpdates } from '~/hooks/useLiveChatUpdates';
import { ChatMessage as ChatMessageType } from '~/lib/types';

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { generateId } from '~/lib/IdGenerator';
import Colors from '~/lib/Colors';

// Constants
const AnimatedView = Reanimated.createAnimatedComponent(View);
const TEXT_INPUT_HEIGHT = 60;
const contentContainerStyle = {
  paddingBottom: 120,
};

const ChatDetail = () => {
  // Hooks
  const { chatId, chatName, chatAvatar } = useLocalSearchParams();
  const { isDarkColorScheme, background, textColor, chatImage } = useColorScheme();
  const { height, onScroll, inset, offset, isKeyboardVisible } = useKeyboardAnimation();

  // Refs
  const flatListRef = useRef<Reanimated.FlatList<any>>(null);
  const swipeRef = useRef<Swipeable>(null);

  // State
  const chat: ChatMessageType[] = useLiveChatUpdates(chatId as string); // Use the custom hook
  const [openSwipeable, setOpenSwipeable] = useState<Swipeable | null>(null);
  const [swipeMessage, setSwipeMessage] = useState<string>('');

  // Callbacks
  const scrollToBottom = useCallback(() => {
    if (chat?.length) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: chat.length - 1,
      });
    }
  }, [chat]);
  const getItemLayout = (data: any, index: number) => ({
    length: 100, // Assuming each item has a height of 100
    offset: 100 * index,
    index,
  });
  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };
  const textInputStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      height: isKeyboardVisible.value ? TEXT_INPUT_HEIGHT : 100,
      width: '100%',
      backgroundColor: background,
      transform: [{ translateY: -height.value }],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }),
    []
  );
  const props = useAnimatedProps(() => ({
    contentInset: {
      bottom: inset.value,
    },
    contentOffset: {
      x: 0,
      y: offset.value,
    },
  }));
  const handleSwipeableOpen = (ref: Swipeable) => {
    if (openSwipeable && openSwipeable !== ref && swipeMessage) {
      openSwipeable.close();
    }
    setOpenSwipeable(ref);
  };
  const canClearReply = () => {
    setSwipeMessage('');
    openSwipeable?.close();
  };
  const sendMessage = async (message: string) => {
    if (message.trim().length === 0) return;
    const newMessage: ChatMessageType = {
      id: generateId(),
      role: 'user',
      content: message.trim(),
      date: new Date().toISOString(),
      isSent: true,
    };
    await addMessageToUserChat(chatId as string, newMessage);
  };
  const navigateToContactInfo = () => {
    router.push({
      pathname: '/(tabs)/(chats)/contact/[contactInfo]/',
      params: { contactInfo: chatId as string },
    });
  };
  const Header = () => (
    <View style={tw`h-25 w-full flex-row items-end justify-between gap-3 bg-[${background}] pb-1`}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`h-10 w-10 items-center justify-center `}>
        <Ionicons name="chevron-back" size={30} color={textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToContactInfo}
        style={tw`h-10 flex-1 flex-row items-center gap-3 `}>
        <Image source={{ uri: chatAvatar as string }} style={tw`h-10 w-10 rounded-full`} />
        <Text style={tw`text-2xl  font-bold`}>{chatName}</Text>
      </TouchableOpacity>
      <View style={tw` h-10 justify-end  `}>
        <HeaderActions />
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: ChatMessageType }) => (
    <ChatMessage
      chatId={chatId as string}
      message={item}
      ref={swipeRef}
      setSwipeMessage={setSwipeMessage}
      onSwipeableOpen={handleSwipeableOpen}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: true,
          headerStyle: { backgroundColor: background },
          headerTintColor: textColor,
          header: Header,
        }}
      />
      <ImageBackground source={chatImage} style={tw`flex-1`}>
        <View style={tw`flex-1 justify-end`}>
          <Reanimated.FlatList
            contentContainerStyle={contentContainerStyle}
            onScrollToIndexFailed={onScrollToIndexFailed}
            onContentSizeChange={scrollToBottom}
            keyboardDismissMode="interactive"
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            animatedProps={props}
            onScroll={onScroll}
            ref={flatListRef}
            style={tw`ml-1`}
            data={chat}
          />
          <AnimatedView style={textInputStyle}>
            <MessageInput onShouldSend={sendMessage} />
          </AnimatedView>
        </View>
      </ImageBackground>
    </>
  );
};
export default ChatDetail;
