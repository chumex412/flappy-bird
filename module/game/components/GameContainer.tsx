import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

import ScreenCanva from "@/components/ScreenCanva";
import { useAnimateBackgroundContent } from "@/hooks/use-animate-background";
import { useBirdMotion } from "@/hooks/use-bird-motion";
import GameOver from "@/module/splash/components/GameOver";
import { StoreKeys } from "@/types/global";
import { getStoredData, storeData } from "@/utils/handlers";

import Bird from "./Bird";
import Content from "./Content";
import Pipes from "./Pipe";
import Score from "./Score";

const GameContainer = () => {
  const { width, height } = useWindowDimensions();

  const [isGameOver, setIsGameOver] = useState(false);

  const storeScore = async () => {
    let storedScore = await getStoredData<number>(StoreKeys.score);

    console.log(storedScore);

    if (typeof storedScore !== "number" && !storedScore) {
      storedScore = 0;
    }

    await storeData(
      StoreKeys.score,
      String(storedScore < score ? score : storedScore)
    );
  };

  const stopGame = () => {
    storeScore();
    setIsGameOver(true);
  };

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
    speed,
    score,
    moveBackground,
    movePole,
    handleScores,
  } = useAnimateBackgroundContent(width, height);

  const {
    gesture,
    yPosition,
    transform,
    origin,
    velocity,
    hasScored,
    gameOver,
  } = useBirdMotion({
    poleX,
    backgroundX,
    topPipeHeight: topPoleHeight,
    bottomPipeY,
    score,
    scoreHandler: handleScores,
    stopGame,
  });

  useEffect(() => {
    setIsGameOver(false);
  }, []);

  const resetGame = () => {
    yPosition.value = height / 3;
    velocity.value = 0;
    gameOver.value = false;
    backgroundX.value = 0;
    poleX.value = width + 100;
    topPoleHeight.value = 170;
    bottomPoleHeight.value = 350;
    speed.value = 1;

    moveBackground();
    movePole();
    handleScores(false);
    setIsGameOver(false);
  };

  return (
    <>
      {!isGameOver ? (
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
      ) : (
        <GameOver onPlay={resetGame} score={score} />
      )}
    </>
  );
};

export default GameContainer;
