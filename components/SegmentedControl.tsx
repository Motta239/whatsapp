import Colors from '~/lib/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useColorScheme } from '~/hooks/useColorScheme';
import tw from 'twrnc';
const Palette = {
  baseGray05: Colors.lightGray,
  baseGray80: '#ff00ff',
  background: '#fff',
};
type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { textColor, background, isDarkColorScheme, switchColor } = useColorScheme();
    const internalPadding = 6;
    const segmentedControlWidth = 190;

    const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 6,
            paddingLeft: internalPadding / 2,
            backgroundColor: switchColor,
          },
        ]}>
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}>
              <Text
                maxFontSizeMultiplier={1.2}
                style={tw`text-base text-[${selectedOption === option && isDarkColorScheme ? background : textColor}]`}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 34,
    backgroundColor: Palette.baseGray05,
  },
  activeBox: {
    position: 'absolute',
    borderRadius: 6,
    height: '80%',
    top: '10%',
    backgroundColor: Palette.background,
  },
  labelContainer: { justifyContent: 'center', alignItems: 'center' },
  label: {
    fontSize: 14,
  },
});

export { SegmentedControl };
