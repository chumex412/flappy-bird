import { useEffect, useState } from "react";
import {
  Easing,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
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
  const [score, setScore] = useState(0);

  const backgroundX = useSharedValue(0);
  const poleX = useSharedValue(width + 100);

  const speed = useSharedValue(1);
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

  const speedControl = Math.round(5000 / speed.value);

  const movePole = () => {
    poleX.value = withRepeat(
      withTiming(-200, {
        duration: 3500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  };

  const moveBackground = () => {
    backgroundX.value = withRepeat(
      withTiming(-width, {
        duration: 3500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  };

  const handleScores = (isGameOn: boolean) => {
    setScore((previousScore) => (isGameOn ? previousScore + 1 : 0));
  };

  const randomizePipes = () => {
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
        speed.value = speed.value + 0.4;
        scheduleOnRN(randomizePipes);
      }
    }
  );

  console.log("speed", speed.value, "control", speedControl);

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
    speed,
    score,
    moveBackground,
    movePole,
    handleScores,
  };
}
