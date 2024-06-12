import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useRef, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { useColorScheme } from '~/hooks/useColorScheme';
import Colors from '~/lib/Colors';

// Create an animated component from TouchableOpacity
const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AView = Animated.createAnimatedComponent(View);

export type Props = {
  onShouldSend: (message: string) => void;
};

const MessageInput = ({ onShouldSend }: Props) => {
  // State to hold the message input
  const [message, setMessage] = useState('');
  // Shared value to control the expansion of items
  const expanded = useSharedValue(0);
  // Reference to the TextInput component
  const inputRef = useRef<TextInput>(null);
  // Get color scheme details
  const { textColor, isDarkColorScheme, background } = useColorScheme();

  // Function to expand items with animation
  const expandItems = () => {
    expanded.value = withSpring(1, {
      damping: 50,
      stiffness: 10,
    });
  };

  // Function to collapse items with animation
  const collapseItems = () => {
    expanded.value = withSpring(0, { damping: 10, stiffness: 100 });
  };

  // Animated style for the expand button
  const expandButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(expanded.value, [0, 1], [0, 0], Extrapolation.CLAMP);
    const widthInterpolation = interpolate(expanded.value, [0, 1], [30, 0], Extrapolation.CLAMP);

    return {
      // opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  // Animated style for the button view
  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(expanded.value, [0, 1], [0, 100], Extrapolation.CLAMP);
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  // Handle text change in the input
  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  // Handle send button press
  const onSend = () => {
    onShouldSend(message);
    setMessage('');
  };

  return (
    <View style={tw`flex-row items-center  gap-1 p-3`}>
      <ATouchableOpacity
        onPress={expandItems}
        style={[tw`w-7.5 h-7.5 items-center justify-center rounded-full`, expandButtonStyle]}>
        <Ionicons name="add" size={30} color="#387CF0" />
      </ATouchableOpacity>

      <AView style={[tw`flex-row items-center justify-center gap-3`, buttonViewStyle]}>
        <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
          <Ionicons name="camera-outline" size={24} color="#387CF0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ImagePicker.launchImageLibraryAsync()}>
          <Ionicons name="image-outline" size={24} color="#387CF0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
          <Ionicons name="folder-outline" size={24} color="#387CF0" />
        </TouchableOpacity>
      </AView>

      <TextInput
        ref={inputRef}
        placeholder="Message"
        maxFontSizeMultiplier={1.2}
        textAlign="left"
        placeholderTextColor={textColor}
        style={tw`mr-2.5  flex-1  text-[${textColor}] border-[0.1] bg-[${background}] border-[${Colors.gray}] ${
          message.length < 100 ? 'rounded-full' : 'rounded-lg'
        } p-2.5`}
        onFocus={collapseItems}
        onChangeText={onChangeText}
        value={message}
        multiline
        keyboardAppearance={isDarkColorScheme ? 'dark' : 'light'}
      />
      {message.length > 0 ? (
        <TouchableOpacity onPress={onSend}>
          <Ionicons name="arrow-up-circle-outline" size={30} color="#387CF0" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={30} color="#387CF0" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageInput;
