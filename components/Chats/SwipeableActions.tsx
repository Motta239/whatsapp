import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { useColorScheme } from '~/hooks/useColorScheme';

type SwipeableActionsProps = {
  role: 'user' | 'recipient';
  onSwipeableOpen: () => void;
};

const SwipeableActions: React.FC<SwipeableActionsProps> = ({ role, onSwipeableOpen }) => {
  const { isDarkColorScheme } = useColorScheme();
  const iconColor = isDarkColorScheme ? '#fff' : '#000';

  return (
    <>
      {role === 'user' && (
        <View style={tw`w-20 flex-row items-center justify-center bg-transparent`}>
          <FontAwesome name="reply" size={24} color={iconColor} />
        </View>
      )}
      {role === 'recipient' && (
        <View style={tw`w-20 flex-row items-center justify-center`}>
          <FontAwesome name="mail-reply" size={24} color={iconColor} />
        </View>
      )}
    </>
  );
};

export default SwipeableActions;
