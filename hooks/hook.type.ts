import { SharedValue } from "react-native-reanimated";

export type BirdMotionHookType = {
  poleX: SharedValue<number>;
  backgroundX: SharedValue<number>;
  topPipeHeight: SharedValue<number>;
  bottomPipeY: SharedValue<number>;
  callback?: VoidFunction;
};
