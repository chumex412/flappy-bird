import { Text, useFont } from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedReaction,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ScoreText } from "../types.game";

const Score = ({ value, hasScored }: ScoreText) => {
  const font = useFont(require("@/assets/fonts/GemunuLibre-Bold.ttf"), 28);
  const { width, height } = useWindowDimensions();

  const opacity = useSharedValue(0);
  const textScale = useSharedValue(0);

  useAnimatedReaction(
    () => hasScored.value,
    (currentState, previousState) => {
      if (!previousState && currentState) {
        opacity.value = 1;
        textScale.value = withSpring(1, {
          damping: 8,
          stiffness: 120,
          mass: 0.6,
        });

        opacity.value = withDelay(4000, withTiming(0, { duration: 600 }));
        textScale.value = 0;
      }
    }
  );

  return <Text x={width / 2} y={height / 4} text={`${value}`} font={font} />;
};

export default Score;
