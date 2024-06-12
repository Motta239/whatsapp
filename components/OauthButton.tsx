import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import { Text } from './Themed';

const OAuthButton: React.FC<{
  provider: string;
  textColor: string;
  name: React.ComponentProps<typeof AntDesign>['name'];
  onPress?: () => void;
}> = ({ provider, name, onPress }) => {
  return (
    <TouchableOpacity
      style={tw`w-50 h-10 flex-row   items-center gap-3   rounded-lg `}
      onPress={onPress}>
      <AntDesign name={name} size={24} color={'gray'} style={tw``} />
      <Text style={tw`ml-2 justify-start text-base  font-semibold text-gray-500 `}>
        Sign in with {provider}
      </Text>
    </TouchableOpacity>
  );
};
export default OAuthButton;
