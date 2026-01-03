import { Group, Rect, Text, useFont } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { groundHeight } from "@/utils/constant";
import { actuateFontSize } from "@/utils/normalize";

const Loader = ({ onLoaded }: { onLoaded?: VoidFunction }) => {
  const fontSize = 36;
  const font = useFont(
    require("@/assets/fonts/GemunuLibre-Bold.ttf"),
    actuateFontSize(fontSize)
  );

  const { width, height } = useWindowDimensions();

  const loaderX = useSharedValue(0);

  useEffect(() => {
    loaderX.value = withTiming(width, {
      easing: Easing.cubic,
      duration: 8000,
    });
  }, []);

  useAnimatedReaction(
    () => loaderX.value,
    (currentWidth, previousWidth) => {
      if (currentWidth >= width) {
        onLoaded && scheduleOnRN(onLoaded);
      }
    }
  );

  const beforeOPacity = useDerivedValue(() => (loaderX.value >= width ? 0 : 1));
  const afterOpacity = useDerivedValue(() => (loaderX.value >= width ? 1 : 0));

  const loaderTextX = (width - 126) / 2;
  const loaderTextY = groundHeight / 2;
  const afterTextX = (width - 290) / 2;

  return (
    <Group transform={[{ translateY: height - groundHeight }]}>
      <Text
        font={font}
        text="Loading..."
        color="#ffffff"
        x={loaderTextX}
        y={loaderTextY}
        opacity={beforeOPacity}
      />

      <Rect
        x={0}
        y={groundHeight - 16 * 2.5}
        height={16}
        width={loaderX}
        color="#ffffff"
        opacity={beforeOPacity}
      />

      <Group transform={[{ translateY: loaderTextY }]}>
        <Text
          font={font}
          text="Tap anywhere to start"
          color="#ffffff"
          x={afterTextX}
          opacity={afterOpacity}
        />
      </Group>
    </Group>
  );
};

export default Loader;
