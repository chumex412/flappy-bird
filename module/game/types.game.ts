import { DerivedValue, SharedValue } from "react-native-reanimated";

export interface PipeProps {
  topHeight: SharedValue<number>;
  bottomHeight: SharedValue<number>;
  xValue: SharedValue<number>;
  bottomPipeY: SharedValue<number>;
}

export interface RoadProps {
  width: number;
  height: number;
  roadX: SharedValue<number>;
}

export interface BirdProps {
  width: number;
  height: number;
  yPosition: SharedValue<number>;
  transform: DerivedValue<{ rotateZ: number }[]>;
  origin: DerivedValue<{ x: number; y: number }>;
}

export interface GameContentProps {
  cityX: DerivedValue<number>;
  cloudX: DerivedValue<number>;
  grassX: DerivedValue<number>;
}

export interface ScoreText {
  value: number;
  hasScored: SharedValue<boolean>;
}
