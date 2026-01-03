import { useMemo } from "react";
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
  score,
  scoreHandler,
  stopGame,
}: BirdMotionHookType) {
  const { width, height } = useWindowDimensions();

  const birdY = useSharedValue(Math.round(height / 3));
  const birdVelocity = useSharedValue(50);
  const hasScored = useSharedValue(false);
  const gameOver = useSharedValue(false);

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

  const gesture = Gesture.Tap().onEnd(() => {
    birdVelocity.value = -150;
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) return;

    birdY.value = birdY.value + (birdVelocity.value * dt) / 1000;
    birdVelocity.value = birdVelocity.value + (GRAVITY * dt) / 1000;
  });

  // Collision detection
  useAnimatedReaction(
    () => ({
      birdY: birdY.value,
      pipeX: poleX.value,
      topPipeHeight: topPipeHeight.value,
    }),
    (currentValue, previousValue) => {
      if (currentValue && currentValue.birdY >= height - FINALPOSITION) {
        gameOver.value = true;
      }

      // Top Pipe Collision
      const isHorizontalCollision =
        birdBounds.value.right >= currentValue.pipeX &&
        birdBounds.value.left <= currentValue.pipeX + pipeWidth;

      const isTopPipeCollision =
        birdBounds.value.top <= currentValue.topPipeHeight &&
        isHorizontalCollision;

      const isBottomPipeCollision =
        birdBounds.value.bottom >= bottomPipeY.value && isHorizontalCollision;

      if (isTopPipeCollision || isBottomPipeCollision) {
        gameOver.value = true;
      }
    }
  );

  useAnimatedReaction(
    () => poleX.value,
    (currentX, previousX) => {
      if (currentX <= 0) {
        hasScored.value = false;
      }

      // scoring: detect crossing the bird center
      const left = birdBounds.value.left;

      if (
        previousX !== null &&
        previousX !== undefined &&
        previousX > left &&
        currentX <= left &&
        birdBounds.value.top > topPipeHeight.value &&
        birdBounds.value.bottom < bottomPipeY.value
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
        scheduleOnRN(stopGame);
      }
    }
  );

  useAnimatedReaction(
    () => hasScored.value,
    (currentState, previousState) => {
      if (currentState && !previousState) {
        scheduleOnRN(scoreHandler, true);
      }
    }
  );

  return useMemo(
    () => ({
      yPosition: birdY,
      gesture,
      transform: birdTransform,
      origin: birdOrigin,
      velocity: birdVelocity,
      gameOver,
      hasScored,
    }),
    [
      birdY,
      gesture,
      birdTransform,
      birdOrigin,
      birdVelocity,
      gameOver,
      hasScored,
    ]
  );
}
