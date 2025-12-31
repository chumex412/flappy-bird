import { useEffect } from "react";
import {
  Easing,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import {
  BASE,
  bottomPipeHeight,
  MIN_PIPE_HEIGHT,
  PIPE_GAP,
  pipeWidth,
  topPipeHeight,
} from "@/utils/constant";

const roadWidth = 708;

export function useAnimateBackgroundContent(width: number, height: number) {
  const speed = useSharedValue(1);
  const backgroundX = useSharedValue(0);
  const poleX = useSharedValue(width - 50);

  const cameraX = useDerivedValue(() => backgroundX.value * speed.value);

  const cityX = useDerivedValue(() => cameraX.value * 0.3);
  const cloudX = useDerivedValue(() => (cameraX.value * 0.15) % width);
  const grassX = useDerivedValue(() => cameraX.value * 0.8);
  const roadX = useDerivedValue(() => (cameraX.value * 1.2) % roadWidth);

  const topPoleHeight = useSharedValue(topPipeHeight);
  const bottomPoleHeight = useSharedValue(bottomPipeHeight);
  const bottomPipeY = useDerivedValue(
    () => height - BASE - bottomPoleHeight.value,
    [bottomPoleHeight, height]
  );

  const handleSpeed = () => {
    "worklet";
    return 5000 / speed.value;
  };

  const movePole = () => {
    poleX.value = withRepeat(
      withSequence(
        withTiming(-width - 100, {
          duration: handleSpeed(),
          easing: Easing.linear,
        }),
        withTiming(width, { duration: 0 })
      ),
      -1
    );
  };

  const moveBackground = () => {
    backgroundX.value = withRepeat(
      withTiming(-width, { duration: handleSpeed(), easing: Easing.linear }),
      -1,
      false
    );
  };

  const randomizePipes = () => {
    console.log("hey");
    const playAreaHeight = height - BASE;

    const maxTopPipeHeight = playAreaHeight - PIPE_GAP - MIN_PIPE_HEIGHT;

    const randomTopHeight =
      Math.random() * (maxTopPipeHeight - MIN_PIPE_HEIGHT) + MIN_PIPE_HEIGHT;

    topPoleHeight.value = randomTopHeight;
    bottomPoleHeight.value = playAreaHeight - randomTopHeight - PIPE_GAP;
  };

  useEffect(() => {
    moveBackground();
    movePole();
  }, []);

  useAnimatedReaction(
    () => poleX.value,
    (currentPos, previousPos) => {
      const hasJustExited =
        currentPos <= -pipeWidth && (previousPos ?? 0) > -pipeWidth;

      if (hasJustExited) {
        scheduleOnRN(randomizePipes);
      }
    }
  );

  return {
    backgroundX,
    poleX,
    roadX,
    cityX,
    grassX,
    cloudX,
    topPoleHeight,
    bottomPoleHeight,
    bottomPipeY,
    moveBackground,
    movePole,
  };
}
