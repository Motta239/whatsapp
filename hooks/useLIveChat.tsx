import { useEffect, useState } from 'react';
import { ChatProps } from '~/lib/types';
import { fetchData, supabase } from '~/utils/supabase';

export const useLiveChatUpdates = () => {
  // State to store chat data
  const [chats, setChats] = useState<Partial<ChatProps>[]>([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch initial chat data
    const fetchInitialData = async () => {
      try {
        // Fetch chat data from the 'chats' table
        const initialChats = await fetchData<ChatProps>('chats');
        // Update state with fetched chat data
        setChats(initialChats);
      } catch (err) {
        // Set error message if fetching fails
        setError('Failed to fetch initial chat data');
      } finally {
        // Set loading state to false after fetching is done
        setIsLoading(false);
      }
    };

    // Call the function to fetch initial chat data
    fetchInitialData();

    // Subscribe to real-time updates on the 'chats' table
    const channel = supabase
      .channel('public:chats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          setChats((prevChats) => {
            const updatedChat = payload.new as ChatProps;
            const existingChatIndex = prevChats.findIndex((chat) => chat.id === updatedChat.id);

            let updatedChats;
            if (existingChatIndex !== -1) {
              // Update existing chat in the state
              updatedChats = [...prevChats];
              updatedChats[existingChatIndex] = updatedChat;
            } else {
              // Add new chat to the state
              updatedChats = [updatedChat, ...prevChats];
            }
            // Sort chats based on lastMessage.date
            return updatedChats.sort((a, b) => {
              const dateA = new Date(a.lastMessage?.date || 0);
              const dateB = new Date(b.lastMessage?.date || 0);
              return dateB.getTime() - dateA.getTime();
            });
          });
        } else if (payload.eventType === 'DELETE') {
          // Handle DELETE event by removing the chat from the state
          setChats((prevChats) => prevChats.filter((chat) => chat.id !== payload.old.id));
        }
      })
      .subscribe();

    // Cleanup function to remove the subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Return the state variables
  return { chats, isLoading, error };
};
