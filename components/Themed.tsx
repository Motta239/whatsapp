import React, { useState } from 'react';
import {
  Text as RNText,
  View as RNView,
  TextInput as RNTextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  Pressable as RNPressable,
  PressableProps,
  Switch as RNSwitch,
  SwitchProps,
  ViewProps,
  ScrollView as RNScrollView,
  ScrollViewProps,
} from 'react-native';
import tw from 'twrnc';

import { BlurView } from 'expo-blur';
import { useColorScheme } from '~/hooks/useColorScheme';
import { ScreenProps } from 'react-native-screens';
import { Stack } from 'expo-router';
import Colors from '~/lib/Colors';

const Text: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  const { textColor } = useColorScheme();
  return (
    <RNText maxFontSizeMultiplier={1.3} style={[tw`text-base`, { color: textColor }, style]}>
      {children}
    </RNText>
  );
};

const View: React.FC<{
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  const { background } = useColorScheme();
  return <RNView style={[{ backgroundColor: background }, style]}>{children}</RNView>;
};

const TextInput: React.FC<TextInputProps & { style?: StyleProp<TextStyle> }> = ({
  style,
  ...props
}) => {
  const { textColor, keyboardAppearance } = useColorScheme();

  return (
    <RNTextInput
      style={[
        tw`border-b border-gray-300 p-2`,
        {
          color: textColor,
          backgroundColor: 'transparent',
        },
        style,
      ]}
      textAlign="left"
      maxFontSizeMultiplier={1.3}
      placeholderTextColor={textColor}
      keyboardAppearance={keyboardAppearance as 'light' | 'dark'}
      {...props}
    />
  );
};

const TouchableOpacity: React.FC<
  TouchableOpacityProps & {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }
> = ({ style, children, ...props }) => {
  const { textColor } = useColorScheme();
  return (
    <RNTouchableOpacity style={[tw` items-center rounded-full `, style]} {...props}>
      <BlurView style={[tw`items-center rounded-full p-3`, style]} intensity={50} tint="light">
        <Text style={{ color: textColor }}>{children}</Text>
      </BlurView>
    </RNTouchableOpacity>
  );
};

const Pressable: React.FC<
  PressableProps & { style?: StyleProp<ViewStyle>; children?: React.ReactNode }
> = ({ style, children, ...props }) => {
  const { textColor, modalsColor } = useColorScheme();
  return (
    <RNPressable
      style={[tw`items-center rounded-full p-3`, { backgroundColor: modalsColor }, style]}
      {...props}>
      <Text style={{ color: textColor }}>{children}</Text>
    </RNPressable>
  );
};

const Switch: React.FC<SwitchProps> = (props) => {
  const { switchColor, textColor, background } = useColorScheme();
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);
  };

  return (
    <RNSwitch
      value={isEnabled}
      onValueChange={toggleSwitch}
      ios_backgroundColor={'white'}
      trackColor={{ false: switchColor, true: 'white' }}
      thumbColor={isEnabled ? textColor : background}
      {...props}
    />
  );
};

const Separator: React.FC<ViewProps> = ({ style, ...props }) => {
  return <RNView style={tw`h-[0.5px] bg-[${Colors.gray}] opacity-30`} />;
};

const ScrollView: React.FC<ScrollViewProps> = ({ style, ...props }) => {
  const { background } = useColorScheme();

  return (
    <RNScrollView
      style={[
        tw`p-4`,
        {
          backgroundColor: background,
          paddingBottom: 100,
        },
        style,
      ]}
      {...props}
    />
  );
};

export { Text, View, TextInput, Separator, TouchableOpacity, Pressable, Switch, ScrollView };
