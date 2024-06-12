export interface Course {
  id: number;
  title: string;
  link: string;
  creator: string;
  imageUrl: string;
  year: number;
  viewers: number;
  description: string;
  videoUrl: string;
}
export interface RenderItemProps {
  item: {
    key: string;
  };
}

// types/index.ts
// export interface ChatItem {
//   id: number;
//   message: string;
//   sender: string;
//   created_at: string;
// }

export interface ChatMessage {
  id: string;
  role: 'user' | 'recipient';
  content: string;
  date: string;
  isRead?: boolean;
  isSent?: boolean;
  isDelivered?: boolean;
  reaction?: 'Thumbs Up' | 'Thumbs Down' | 'Heart' | 'Laugh' | 'Surprised' | 'Angry';
}

export interface ChatProps {
  id: number;
  name: string;
  timestamp: string;
  lastName: string;
  messages: ChatMessage[];
  avatar: string;
  imageUrl: string;
  lastMessage: ChatMessage;
}

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  phone?: string;
  date?: string;
  media?: string;
};

export interface Call {
  missed: boolean;
  name: string;
  img: string;
  video: boolean;
  incoming: boolean;
}
