import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useFrameCallback, useSharedValue } from "react-native-reanimated";

import { FINALPOSITION, GRAVITY } from "@/utils/constant";
import { useMemo } from "react";

export function useBirdMotion() {
  const height = useWindowDimensions().height;

  const birdY = useSharedValue(Math.round(height / 3));
  const birdVelocity = useSharedValue(100);

  const gesture = Gesture.Tap().onStart(() => {
    birdVelocity.value = -300;
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) return;
    birdY.value = birdY.value + (birdVelocity.value * dt) / 1000;
    birdVelocity.value = birdVelocity.value + (GRAVITY * dt) / 1000;

    if (birdY.value > height - FINALPOSITION) {
      birdY.value = height - FINALPOSITION;
      birdVelocity.value = 0;
    }
  });

  return useMemo(() => ({ yPosition: birdY, gesture }), [birdY, gesture]);
}
