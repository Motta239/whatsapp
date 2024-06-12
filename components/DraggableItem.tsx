import React, { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions } from 'react-native';

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
const { width, height } = Dimensions.get('screen');

interface DraggableItemProps {
  children: (translationX: number, translationY: number) => React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children }) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }, { translateY: translationY.value }],
  }));

  const pan = Gesture.Pan()
    .minDistance(100)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      setTranslate({ x: event.translationX, y: event.translationY });

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .onEnd(() => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyles, styles.item]}>
        {children(translate.x, translate.y)}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
});

export default DraggableItem;
