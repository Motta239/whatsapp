import React from 'react';
import { Pressable } from 'react-native';
import * as ContextMenu from 'zeego/context-menu';
import { ChatMessage as ChatMessageType } from '~/lib/types';
import { Text } from '../Themed';

type EmojiReactionProps = {
  message: ChatMessageType;
  addReaction: (reaction: ChatMessageType['reaction']) => void;
  children: React.ReactNode;
};

const EmojiReaction: React.FC<EmojiReactionProps> = ({ message, addReaction, children }) => {
  const emojiReaction = (
    title: string,
    reactionType: ChatMessageType['reaction'],
    filledIcon: string,
    outlineIcon: string
  ) => ({
    title,
    systemIcon: message.reaction === reactionType ? filledIcon : outlineIcon,
    action: () => addReaction(message.reaction === reactionType ? undefined : reactionType),
  });

  const replyEmojis = [
    emojiReaction('Thumbs Up', 'Thumbs Up', 'hand.thumbsup.fill', 'hand.thumbsup'),
    emojiReaction('Thumbs Down', 'Thumbs Down', 'hand.thumbsdown.fill', 'hand.thumbsdown'),
    emojiReaction('Heart', 'Heart', 'heart.fill', 'heart'),
    emojiReaction('Laugh', 'Laugh', 'face.smiling', 'face.smiling.fill'),
    emojiReaction('Surprised', 'Surprised', 'face.surprised.fill', 'face.surprised'),
    emojiReaction('Angry', 'Angry', 'face.angry.fill', 'face.angry'),
  ];

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Pressable>{children}</Pressable>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        {replyEmojis.map((item) => (
          <ContextMenu.Item key={item.title} onSelect={item.action}>
            <ContextMenu.ItemTitle>{item.title}</ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon ios={{ name: item.systemIcon, pointSize: 18 }} />
          </ContextMenu.Item>
        ))}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export default EmojiReaction;
