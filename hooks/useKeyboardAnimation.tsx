import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  const inset = useSharedValue(100);
  const offset = useSharedValue(0);
  const scroll = useSharedValue(0);
  const shouldUseOnMoveHandler = useSharedValue(false);
  const isKeyboardVisible = useSharedValue(false);

  useKeyboardHandler({
    onStart: (e) => {
      'worklet';

      if (progress.value !== 1 && progress.value !== 0 && e.height !== 0) {
        shouldUseOnMoveHandler.value = true;
        return;
      }

      progress.value = e.progress;
      height.value = e.height;

      inset.value = e.height;
      offset.value = Math.max(e.height + scroll.value, 0);
      isKeyboardVisible.value = e.height > 0;
    },
    onInteractive: (e) => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
      isKeyboardVisible.value = e.height > 0;
    },
    onMove: (e) => {
      'worklet';

      if (shouldUseOnMoveHandler.value) {
        progress.value = e.progress;
        height.value = e.height;
        isKeyboardVisible.value = e.height > 0;
      }
    },
    onEnd: (e) => {
      'worklet';
      height.value = e.height;
      progress.value = e.progress;
      shouldUseOnMoveHandler.value = false;
      isKeyboardVisible.value = e.height > 0;
    },
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scroll.value = e.contentOffset.y - inset.value;
    },
  });

  return { height, progress, onScroll, inset, offset, isKeyboardVisible };
};
