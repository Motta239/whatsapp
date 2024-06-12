import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/hooks/useColorScheme';
import { View } from '../Themed';

const ChatActions = () => {
  const { textColor, tabIcon } = useColorScheme();

  return (
    <View style={tw`flex-row items-center gap-4 rounded-full bg-transparent px-4 py-1`}>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="camera" size={30} color={textColor} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="add-circle" size={30} color={tabIcon} />
      </TouchableOpacity>
    </View>
  );
};
export default ChatActions;
