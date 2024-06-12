import { useEffect, useState } from 'react';
import { ChatMessage } from '~/lib/types';
import { supabase } from '~/utils/supabase';

export const useLiveChatUpdates = (chatId: string) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('messages')
        .eq('id', chatId)
        .limit(1)
        .single();

      if (error) {
        console.error(`Error retrieving messages for chat ${chatId}:`, error);
        return;
      }

      setChat(data?.messages || []);
    };

    fetchChatMessages();

    const channel = supabase
      .channel(`public:chats:id=eq.${chatId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chats', filter: `id=eq.${chatId}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setChat(payload.new.messages);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  return chat;
};
