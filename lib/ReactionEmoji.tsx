import { ChatMessage as ChatMessageType } from '~/lib/types';

const getReactionEmoji = (reaction: ChatMessageType['reaction']) => {
  switch (reaction) {
    case 'Thumbs Up':
      return '👍';
    case 'Thumbs Down':
      return '👎';
    case 'Heart':
      return '❤️';
    case 'Laugh':
      return '😂';
    case 'Surprised':
      return '😮';
    case 'Angry':
      return '😡';
    default:
      return '';
  }
};

export default getReactionEmoji;
