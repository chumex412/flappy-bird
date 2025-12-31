import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SharedValue } from "react-native-reanimated";

type HideModalHanldeType = {
  birdPosition: SharedValue<number>;
  velocity: SharedValue<number>;
  xPosition: SharedValue<number>;
};

export function useAlert() {
  const [isVisible, setIsVisible] = useState(false);

  const { width, height } = useWindowDimensions();

  const show = () => {
    // "worklet";
    console.log("hey");

    setIsVisible(true);
  };

  const hide = () => {
    "worklet";
    setIsVisible(false);
  };

  return { isVisible, show, hide };
}
