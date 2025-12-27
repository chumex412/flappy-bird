import { SharedValue } from "react-native-reanimated";

export interface PipeProps {
  topHeight: number;
  bottomHeight: number;
  xValue: SharedValue<number>;
}

export interface RoadProps {
  width: number;
  height: number;
}

export interface BirdProps {
  width: number;
  height: number;
  yPosition: SharedValue<number>;
}
