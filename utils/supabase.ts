import { createClient, User, Session, AuthApiError, AuthError } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatMessage, ChatProps } from '~/lib/types';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRole = process.env.EXPO_PUBLIC_SERVICE_ROLE!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

interface AuthResponse {
  user?: User | null;
  session?: Session | null;
  error?: AuthError | null;
}

// Sign in function
export async function signInWithEmail(email: string, password: string): Promise<AuthResponse> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { user, session, error };
}

export async function signInWithProvider(provider: 'google' | 'github' | 'facebook') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider, // use the provider parameter instead of hardcoding it
  });

  if (error) {
    return { error };
  }
  return { data }; // return data which could contain user information
}

// Sign up function
export async function signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  return { user, session, error };
}

// Logout function
export async function logout(): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export const sendPasswordResetEmail = async (email: string) => {
  console.warn(email);
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error };
};

export const signInWithOAuth = async (provider: 'google' | 'github' | 'apple') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  return { data, error };
};

// OTP Sign in function
export async function signInWithOTP(
  phone: string,
  otp: string
): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.verifyOtp({
    phone: phone,
    token: otp,
    type: 'sms', // or 'magiclink' if using email
  });
  return { user, session, error };
}

// Send OTP function
export async function sendOTP(phone: string): Promise<{ error?: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });
  return { error };
}

export async function fetchData<T>(table: string): Promise<Partial<ChatProps>[]> {
  const { data, error } = await supabase
    .from(table)
    .select('name,id,avatar,lastMessage')
    .order('lastMessage->>date', { ascending: false });
  if (error) {
    console.error(`Error retrieving data from ${table}:`, error);
    return [];
  }
  return data || [];
}

export const useGetChatData = () => {
  return useQuery<Partial<ChatProps>[], Error>({
    queryKey: ['chats'],
    queryFn: () => fetchData<ChatProps>('chats'),
  });
};

export async function getUserInfo(userId: string): Promise<Partial<User> | null> {
  const { data, error } = await supabase
    .from('chats')
    .select('name,id,avatar')
    .eq('id', userId)
    .single();
  if (error) {
    console.error(`Error retrieving user info for user ${userId}:`, error);
    return null;
  }
  return data;
}

export async function getUserIdChatMessages(userId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase.from('chats').select('messages').eq('id', userId).single();

  if (error) {
    console.error(`Error retrieving messages for user ${userId}:`, error);
    return [];
  }

  return data?.messages || [];
}

export async function addMessageToUserChat(userId: string, message: ChatMessage): Promise<boolean> {
  // Fetch the current messages array
  const { data: chatData, error: fetchError } = await supabase
    .from('chats')
    .select('messages')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error(`Error retrieving current messages for user ${userId}:`, fetchError);
    return false;
  }

  const currentMessages = chatData?.messages || [];

  // Append the new message
  const updatedMessages = [...currentMessages, message];

  // Update the messages array in the database
  const { error: updateError } = await supabase
    .from('chats')
    .update({ messages: updatedMessages, lastMessage: message })
    .eq('id', userId);

  if (updateError) {
    console.error(`Error adding message for user ${userId}:`, updateError);
    return false;
  }

  return true;
}

export async function updateMessageById(
  userId: string,
  messageId: string,
  newContent: ChatMessage
): Promise<boolean> {
  // Fetch the current messages array
  const { data: chatData, error: fetchError } = await supabase
    .from('chats')
    .select('messages')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error(`Error retrieving current messages for user ${userId}:`, fetchError);
    return false;
  }

  const currentMessages = chatData?.messages || [];

  // Find the message by id and update its content
  const updatedMessages = currentMessages.map((msg: ChatMessage) =>
    msg.id === messageId ? { ...msg, ...newContent } : msg
  );

  // Update the messages array in the database
  const { error: updateError } = await supabase
    .from('chats')
    .update({ messages: updatedMessages })
    .eq('id', userId);

  if (updateError) {
    console.error(`Error updating message for user ${userId}:`, updateError);
    return false;
  }

  return true;
}

export async function updateProfileImage(userId: string, imagePath: string): Promise<boolean> {
  // Update the profile image in the database
  const { error: updateError } = await supabase
    .from('chats')
    .update({ avatar: imagePath })
    .eq('id', userId);

  if (updateError) {
    console.error(`Error updating profile image for user ${userId}:`, updateError);
    return false;
  }

  return true;
}

export const useLiveChatUpdates = (userId: string) => {
  const [Chats, setChats] = useState<ChatProps[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel(`public:chats:id=eq.${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setChats(payload.new.messages);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return Chats;
};

// Function to update user metadata
export const updateUserMetadata = async (userId: string, updates: { [key: string]: string }) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ user_metadata: updates })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error updating user metadata:', error.message);
    return null;
  }
};
