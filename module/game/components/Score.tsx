import { Text, useFont } from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ScoreText } from "../types.game";

const Score = ({ value, hasScored }: ScoreText) => {
  const font = useFont(require("@/assets/fonts/FFFForward.ttf"), 36);
  const { width, height } = useWindowDimensions();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const textScale = useDerivedValue(() => [
    {
      scale: scale.value,
    },
  ]);

  const xPosition = width / 2;
  const yPosition = Math.floor(height / 6);

  useAnimatedReaction(
    () => hasScored.value,
    (currentState, previousState) => {
      if (!previousState && currentState) {
        scale.value = 0;
        opacity.value = 1;

        // spring pop
        scale.value = withSpring(1, {
          damping: 8,
          stiffness: 120,
          mass: 0.6,
        });

        // fade after 1s
        opacity.value = withDelay(1000, withTiming(0, { duration: 400 }));
      }
    }
  );

  return (
    <Text
      x={xPosition}
      y={yPosition}
      text={`${value}`}
      font={font}
      color="#ffffff"
      transform={textScale}
      opacity={opacity}
      origin={{ x: xPosition, y: yPosition }}
    />
  );
};

export default Score;
