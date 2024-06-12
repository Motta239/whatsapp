import React from 'react';
import { Button, TouchableOpacity } from 'react-native';

import { SearchBarCommands } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '~/components/Themed';

import tw from 'twrnc';

export const ChatListHeader: React.FC<{
  textColor: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}> = ({ textColor, title, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={tw`h-10 flex-row items-center gap-2 px-5`}>
      <Ionicons name={icon} size={24} color={textColor} />
      <Text style={tw`font-bold`}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// Component for rendering the empty state of the chat list

export const ChatListEmptyComponent: React.FC<{
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  section: string;
  searchRef: React.RefObject<SearchBarCommands>;
}> = ({ setSearchQuery, section, searchRef }) => (
  <View style={tw`h-30 flex-1 items-center justify-center`}>
    <Text style={tw`text-center font-bold `}>No {section} available</Text>
    <Button
      title="Reset"
      onPress={() => {
        setSearchQuery('');
        searchRef.current?.clearText();
      }}
    />
  </View>
);
