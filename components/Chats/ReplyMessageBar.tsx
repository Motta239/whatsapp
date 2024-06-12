import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useColorScheme } from '~/hooks/useColorScheme';
import { Text, View } from '../Themed';

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: string | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  const { background } = useColorScheme();
  return (
    <>
      {message !== null && (
        <Animated.View
          style={tw` m-3 flex-row rounded-lg p-3 bg-[${background}]`}
          entering={FadeInDown}
          exiting={FadeOutDown}>
          <View style={tw` w-1.5 bg-[#89BC0C]`}></View>
          <View style={tw``}>
            <Text style={tw`pt-1.25 pl-2.5 text-base font-semibold text-[#89BC0C]`}>{message}</Text>
            <Text style={tw`pt-1.25 pl-2.5`}>
              {message.length > 40 ? message.substring(0, 40) + '...' : message}
            </Text>
          </View>
          <View style={tw`flex-1 items-end justify-center pr-2.5`}>
            <TouchableOpacity onPress={clearReply}>
              <Ionicons name="close-circle-outline" size={28} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ReplyMessageBar;
