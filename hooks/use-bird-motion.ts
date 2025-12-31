import { useCallback, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import {
  birdHeight,
  birdWidth,
  FINALPOSITION,
  GRAVITY,
  pipeWidth,
} from "@/utils/constant";

import { BirdMotionHookType } from "./hook.type";

export function useBirdMotion({
  poleX,
  backgroundX,
  topPipeHeight,
  bottomPipeY,
  callback,
}: BirdMotionHookType) {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);

  const birdY = useSharedValue(Math.round(height / 3));
  const birdVelocity = useSharedValue(100);
  const gameOver = useSharedValue(false);
  const hasScored = useSharedValue(false);

  const birdBounds = useDerivedValue(() => ({
    left: (width - birdWidth) / 2,
    right: (width - birdWidth) / 2 + birdWidth,
    top: birdY.value,
    bottom: birdY.value + birdHeight,
  }));
  const birdTransform = useDerivedValue(() => [
    {
      rotateZ: interpolate(
        birdVelocity.value,
        [-500, 500],
        [-0.5, 0.5],
        Extrapolation.CLAMP
      ),
    },
  ]);

  const birdOrigin = useDerivedValue(() => ({
    x: width / 2,
    y: Number.isFinite(birdY.value) ? birdY.value : height / 3,
  }));

  const gesture = Gesture.Tap().onStart(() => {
    birdVelocity.value = -150;
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) return;

    birdY.value = birdY.value + (birdVelocity.value * dt) / 1000;
    birdVelocity.value = birdVelocity.value + (GRAVITY * dt) / 1000;
  });

  const handleScores = useCallback((isGameOn: boolean) => {
    setScore((previousScore) => (isGameOn ? previousScore + 1 : 0));
  }, []);

  // Collision detection
  useAnimatedReaction(
    () => ({
      birdY: birdY.value,
      pipeX: poleX.value,
      topPipeHeight: topPipeHeight.value,
    }),
    (currentValue, previousValue) => {
      if (currentValue.pipeX <= 0) {
        hasScored.value = false;
      }

      if (currentValue && currentValue.birdY >= height - FINALPOSITION) {
        gameOver.value = true;
      }

      // Top Pipe Collision

      const isHorizontalCollision =
        birdBounds.value.right >= poleX.value &&
        birdBounds.value.left <= poleX.value + pipeWidth;

      const isTopPipeCollision =
        birdBounds.value.top <= topPipeHeight.value && isHorizontalCollision;

      const isBottomPipeCollision =
        birdBounds.value.bottom >= bottomPipeY.value && isHorizontalCollision;

      if (isTopPipeCollision || isBottomPipeCollision) {
        gameOver.value = true;
      } else if (
        (isHorizontalCollision && !isTopPipeCollision) ||
        (isHorizontalCollision && isBottomPipeCollision)
      ) {
        hasScored.value = true;
      }
    }
  );

  useAnimatedReaction(
    () => gameOver.value,
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(backgroundX);
        cancelAnimation(poleX);
        hasScored.value = false;
        callback && scheduleOnRN(callback);
      }
    }
  );

  useAnimatedReaction(
    () => hasScored.value,
    (currentState, previousState) => {
      if (currentState && !previousState) {
        scheduleOnRN(handleScores, true);
      }
    }
  );

  console.log(score);

  return useMemo(
    () => ({
      yPosition: birdY,
      gesture,
      transform: birdTransform,
      origin: birdOrigin,
      velocity: birdVelocity,
      gameOver,
      hasScored,
      score,
      handleScores,
    }),
    [
      birdY,
      gesture,
      birdTransform,
      birdOrigin,
      birdVelocity,
      gameOver,
      hasScored,
      score,
    ]
  );
}
