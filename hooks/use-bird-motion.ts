import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import { FINALPOSITION, GRAVITY } from "@/utils/constant";
import { useMemo } from "react";

export function useBirdMotion() {
  const { width, height } = useWindowDimensions();

  const birdY = useSharedValue(Math.round(height / 3));
  const birdVelocity = useSharedValue(100);
  const birdTransform = useDerivedValue(() => [
    {
      rotate: interpolate(
        birdVelocity.value,
        [-500, 500],
        [-0.5, 0.5],
        Extrapolation.CLAMP
      ),
    },
  ]);

  const birdOrigin = useDerivedValue(() => ({ x: width / 2, y: birdY.value }));

  const gesture = Gesture.Tap().onStart(() => {
    birdVelocity.value = -300;
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) return;

    if (birdY.value > height - FINALPOSITION) {
      birdY.value = height - FINALPOSITION;
      birdVelocity.value = 0;
      return;
    }

    birdY.value = birdY.value + (birdVelocity.value * dt) / 1000;
    birdVelocity.value = birdVelocity.value + (GRAVITY * dt) / 1000;
  });

  return useMemo(
    () => ({
      yPosition: birdY,
      gesture,
      transform: birdTransform,
      origin: birdOrigin,
    }),
    [birdY, gesture, birdTransform, birdOrigin]
  );
}
