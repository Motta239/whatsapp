import React from 'react';
import { View, Text } from '~/components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import tw from 'twrnc';
import { User } from '@supabase/supabase-js';
import { Ionicons } from '@expo/vector-icons';
import { updateUserMetadata } from '~/utils/supabase';

export const Header = ({ user }: { user: User | null }) => {
  const handleEdit = async (field: string, value: string) => {
    if (user) {
      await updateUserMetadata(user.id, { [field]: value });
    }
  };

  return (
    <View style={tw`mb-5 items-center`}>
      <TouchableOpacity>
        <Image
          source={require('~/assets/images/avatar.png')}
          style={tw`w-30 h-30 mb-5 rounded-full`}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit('full_name', 'New Name')}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="person" size={24} style={tw`mr-2`} />
          <Text style={[tw`mb-2 text-2xl font-bold`]}>
            {user?.user_metadata?.full_name ?? 'Add Name'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit('phone', 'New Phone')}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="call" size={24} style={tw`mr-2`} />
          <Text style={[tw`text-lg`]}>{user?.phone ?? 'No phone'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit('email', 'New Email')}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="mail" size={24} style={tw`mr-2`} />
          <Text style={[tw`text-sm`]}>{user?.email ?? 'No email'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
