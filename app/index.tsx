import { useWindowDimensions } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

import { AlertDialog } from "@/components/Modal";
import ScreenCanva from "@/components/ScreenCanva";
import { useAlert } from "@/hooks/use-alert";
import { useAnimateBackgroundContent } from "@/hooks/use-animate-background";
import { useBirdMotion } from "@/hooks/use-bird-motion";
import Bird from "@/module/game/components/Bird";
import Content from "@/module/game/components/Content";
import Pipes from "@/module/game/components/Pipe";
import Score from "@/module/game/components/Score";

const App = () => {
  const { width, height } = useWindowDimensions();

  const { isVisible, show, hide } = useAlert();

  const {
    backgroundX,
    poleX,
    roadX,
    cityX,
    cloudX,
    grassX,
    topPoleHeight,
    bottomPoleHeight,
    bottomPipeY,
    moveBackground,
    movePole,
  } = useAnimateBackgroundContent(width, height);
  const {
    gesture,
    yPosition,
    transform,
    origin,
    velocity,
    gameOver,
    hasScored,
    score,
    handleScores,
  } = useBirdMotion({
    poleX,
    backgroundX,
    topPipeHeight: topPoleHeight,
    bottomPipeY,
    callback: show,
  });

  const resetGame = () => {
    yPosition.value = height / 3;
    velocity.value = 0;
    gameOver.value = false;
    backgroundX.value = 0;
    poleX.value = width - 50;
    topPoleHeight.value = 170;
    bottomPoleHeight.value = 350;
    moveBackground();
    movePole();
    handleScores(false);
  };

  const closeDialog = () => {
    resetGame();
    hide();
  };

  return (
    <>
      <GestureDetector gesture={gesture}>
        <ScreenCanva roadX={roadX}>
          <Content grassX={grassX} cityX={cityX} cloudX={cloudX} />
          <Pipes
            topHeight={topPoleHeight}
            bottomHeight={bottomPoleHeight}
            bottomPipeY={bottomPipeY}
            xValue={poleX}
          />
          <Bird
            width={width}
            height={height}
            yPosition={yPosition}
            transform={transform}
            origin={origin}
          />
          <Score value={score} hasScored={hasScored} />
        </ScreenCanva>
      </GestureDetector>
      {isVisible ? (
        <AlertDialog
          isVisible={isVisible}
          content="Game Over"
          onOkBtnPress={closeDialog}
        />
      ) : null}
    </>
  );
};

export default App;
