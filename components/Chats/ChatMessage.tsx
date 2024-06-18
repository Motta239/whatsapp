import React, { forwardRef, useRef } from 'react';
import Animated, { FadeIn, SlideInDown, SlideInUp } from 'react-native-reanimated';
import tw from 'twrnc';
import { Text, View } from '../Themed';
import { ChatMessage as ChatMessageType } from '~/lib/types';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/hooks/useColorScheme';
import { updateMessageById } from '~/utils/supabase';
import EmojiReaction from './EmojiReaction';
import SwipeableActions from './SwipeableActions';
import getReactionEmoji from '~/lib/ReactionEmoji';

type ChatMessageProps = {
  chatId: string;
  setSwipeMessage: (message: string) => void;
  message: ChatMessageType;
  onSwipeableOpen: (ref: Swipeable) => void;
};

const ChatMessage = forwardRef<Swipeable, ChatMessageProps>(
  ({ chatId, message, onSwipeableOpen, setSwipeMessage }, ref) => {
    const { background, isDarkColorScheme } = useColorScheme();
    const swipeableRef = useRef<Swipeable>(null);

    const addReaction = async (reaction: ChatMessageType['reaction']) => {
      const updated = await updateMessageById(chatId, message.id, {
        ...message,
        reaction: reaction,
      });
    };

    const handleSwipeableOpen = () => {
      if (swipeableRef.current) {
        onSwipeableOpen(swipeableRef.current);
        setSwipeMessage(message.content);
      }
    };

    const containerStyle = [
      tw`flex-row items-end gap-4 bg-transparent p-3`,
      message.role === 'recipient' ? tw`justify-end` : tw`justify-start`,
    ];

    const messageContainerStyle = [
      message.role === 'recipient'
        ? tw`rounded-br-none bg-[${isDarkColorScheme ? '#353537' : '#E7FED7'}]`
        : tw`bg-[${isDarkColorScheme ? '#333' : '#215146'}] rounded-bl-none`,
      tw`rounded-lg p-3 shadow-lg`,
    ];

    const textStyle = tw`text-base text-[${isDarkColorScheme ? '#fff' : message.role === 'recipient' ? '#232621' : '#E7FED7'}]`;

    const dateStyle = tw`text-xs text-[${isDarkColorScheme ? '#fff' : message.role === 'recipient' ? '#232621' : '#E7FED7'}] ${message.role === 'user' ? 'text-right' : 'text-left'} mt-1`;

    const reactionStyle = tw`absolute bottom-[-3] right-[-3] text-2xl text-[${isDarkColorScheme ? '#fff' : '#000'}]`;

    return (
      <Animated.View entering={SlideInDown}>
        <Swipeable
          ref={swipeableRef}
          onSwipeableOpen={handleSwipeableOpen}
          renderLeftActions={() => (
            <SwipeableActions role={message.role} onSwipeableOpen={handleSwipeableOpen} />
          )}
          shouldCancelWhenOutside>
          <View style={containerStyle}>
            <EmojiReaction message={message} addReaction={addReaction}>
              <View style={messageContainerStyle}>
                <Text style={textStyle}>{message.content}</Text>
                <View style={tw`flex-row items-center justify-between bg-transparent`}>
                  <Text style={dateStyle}>{message.date}</Text>
                  {message.isSent && <Ionicons name="checkmark" size={20} color={background} />}
                </View>
                {message.reaction && (
                  <Text style={reactionStyle}>{getReactionEmoji(message.reaction)}</Text>
                )}
              </View>
            </EmojiReaction>
          </View>
        </Swipeable>
      </Animated.View>
    );
  }
);

export default ChatMessage;
