import {
  Canvas,
  Fill,
  Group,
  ImageSVG,
  LinearGradient,
  Rect,
  Text,
  useFont,
  useSVG,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

import { StoreKeys } from "@/types/global";
import { colors, groundColor, groundHeight } from "@/utils/constant";
import { getStoredData } from "@/utils/handlers";

import Content from "./Content";
import Road from "./Road";

const GameOver = ({
  score,
  onPlay,
}: {
  score: number;
  onPlay: VoidFunction;
}) => {
  const { width, height } = useWindowDimensions();
  const [highestScore, setHighestScore] = useState(0);

  const forwardFont = useFont(require("@/assets/fonts/FFFForward.ttf"), 40);
  const gemunuFont = useFont(
    require("@/assets/fonts/GemunuLibre-Bold.ttf"),
    36
  );
  const playIcon = useSVG(require("@/assets/icons/Play-Button.svg"));

  useEffect(() => {
    (async () => {
      const storedScore = await getStoredData<number>(StoreKeys.score);
      console.log({ storedScore });

      if (storedScore) setHighestScore(storedScore);
    })();
  }, []);

  const labelX = 50;
  const valueX = width - 100;
  const scoresY = height / 4;
  const playX = (width - (playIcon?.width() || 100)) / 2;
  const playY = (height + (playIcon?.height() || 60)) / 2;
  const playW = playIcon?.width() || 100;
  const playH = playIcon?.height() || 60;

  const playGame = () => {
    onPlay();
  };

  const tapToPlay = Gesture.Tap().onEnd(({ x, y }) => {
    const inside =
      x >= playX && x <= playX + playW && y >= playY && y <= playY + playH;

    if (inside) {
      scheduleOnRN(playGame);
    }
  });

  return (
    <GestureDetector gesture={tapToPlay}>
      <Canvas style={{ width, height }}>
        <Rect width={width} height={height}>
          <LinearGradient
            colors={colors.light}
            start={vec(0, 0)}
            end={vec(width, height)}
          />
        </Rect>
        <Content />
        <Road width={width} height={height} />
        <Rect width={width} height={groundHeight} y={height - groundHeight}>
          <LinearGradient
            colors={groundColor}
            start={vec(0, 0)}
            end={vec(groundHeight, groundHeight)}
          />
        </Rect>

        <Fill color="#000000b1" />
        <Group>
          <Text
            text="GAME OVER"
            strokeWidth={4}
            x={(width - 304) / 2}
            y={height / 4}
            font={forwardFont}
            style="stroke"
            color="#F85A45"
          />
          <Text
            text="GAME OVER"
            x={(width - 304) / 2}
            y={height / 4}
            font={forwardFont}
            color="#ffffff"
          />
        </Group>
        <Group transform={[{ translateY: scoresY + 80 }]}>
          <Text text="Score:" font={gemunuFont} x={labelX} color="#E4FFA9" />
          <Text
            text={score.toString()}
            font={gemunuFont}
            x={valueX}
            color="#ffffff"
          />
        </Group>
        <Group transform={[{ translateY: scoresY + 140 }]}>
          <Text
            text="Best Score:"
            font={gemunuFont}
            x={labelX}
            color="#E4FFA9"
          />
          <Text
            text={highestScore.toString() || "-"}
            font={gemunuFont}
            x={valueX}
            color="#ffffff"
          />
        </Group>
        {playIcon && (
          <Group transform={[{ translateY: playY }, { translateX: playX }]}>
            <ImageSVG svg={playIcon} x={0} y={0} />
          </Group>
        )}
      </Canvas>
    </GestureDetector>
  );
};

export default GameOver;
