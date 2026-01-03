import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import ScreenCanva from "@/components/ScreenCanva";

import { scheduleOnRN } from "react-native-worklets";
import Bird from "./Bird";
import Content from "./Content";

const SplashWrapper = ({ onStartGame }: { onStartGame: VoidFunction }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const handlePress = () => {
    onStartGame();
  };

  const loadingComplete = () => {
    setHasLoaded(true);
  };

  const tap = Gesture.Tap().onEnd(() => {
    if (!hasLoaded) return;
    scheduleOnRN(handlePress);
  });

  return (
    <GestureDetector gesture={tap}>
      <ScreenCanva isLoading={true} onLoaded={loadingComplete}>
        <Content />
        <Bird />
      </ScreenCanva>
    </GestureDetector>
  );
};

export default SplashWrapper;
