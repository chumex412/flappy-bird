import { useEffect } from "react";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useAnimateBackgroundContent(width: number) {
  const poleXPosition = useSharedValue(width - 100);
  const roadXTransalate = useSharedValue(0);

  useEffect(() => {
    poleXPosition.value = withRepeat(
      withSequence(
        withTiming(-200, {
          duration: 3000,
          easing: Easing.linear,
        }),
        withTiming(width, { duration: 0 })
      ),
      -1
    );
  }, []);

  useEffect(() => {
    roadXTransalate.value = withRepeat(
      withSequence(
        withTiming(-100, {
          duration: 3000,
          easing: Easing.linear,
        }),
        withTiming(0, { duration: 0 })
      ),
      -1
    );
  }, []);

  return { poleX: poleXPosition, roadX: roadXTransalate };
}
