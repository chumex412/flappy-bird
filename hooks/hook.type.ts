import { SharedValue } from "react-native-reanimated";

export type BirdMotionHookType = {
  poleX: SharedValue<number>;
  backgroundX: SharedValue<number>;
  topPipeHeight: SharedValue<number>;
  bottomPipeY: SharedValue<number>;
  score: number;
  scoreHandler: (isGameOn: boolean) => void;
  stopGame: VoidFunction;
};

export type CollisionHandlerType = {
  poleXVal: number;
  topPoleHeightVal: number;
  bottomPoleYVal: number;
  birdBoundsVals: { top: number; bottom: number; right: number; left: number };
};
