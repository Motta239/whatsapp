import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import tw from 'twrnc';
import { useColorScheme } from '~/hooks/useColorScheme';
import { TextInput } from './Themed';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  error?: string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { background, textColor } = useColorScheme();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, {
            duration: 400,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
      opacity: withTiming(opacity.value, { duration: 200 }),
    };
  });
  const handleFocus = () => {
    scale.value = 1.02;
    opacity.value = 0.9;
  };
  const handleBlur = () => {
    scale.value = 1;
    opacity.value = 1;
  };

  return (
    <View style={tw` gap-2`}>
      <Animated.View
        style={[
          tw`bg-[${background}]  h-14 flex-row items-center rounded-2xl px-4`,
          animatedStyle,
        ]}>
        <TextInput
          style={tw` h-14 flex-1 items-center bg-transparent font-semibold text-[${textColor}]`}
          value={value}
          placeholderTextColor={textColor}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {title === 'Password' && value && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={!showPassword ? 'eye-off' : 'eye'} size={23} color={textColor} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default FormField;
