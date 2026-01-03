import { ImageSVG, Text, useFont, useSVG } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

import { birdHeight, birdWidth } from "@/utils/constant";
import { useMemo } from "react";

const Bird = () => {
  const bird = useSVG(require("@/assets/icons/bird.svg"));
  const font = useFont(require("@/assets/fonts/FFFForward.ttf"), 40);

  const { width, height } = useWindowDimensions();

  const birdXPosition = (width - birdWidth) / 2;
  const textPosition = useMemo(
    () => ({
      x: (width - 285) / 2,
      y: (height - 55) / 2.5,
    }),
    [height, width]
  );

  return (
    <>
      <ImageSVG
        svg={bird}
        width={birdWidth}
        height={birdHeight}
        y={height / 4}
        x={birdXPosition}
      />
      {font && (
        <>
          <Text
            x={textPosition.x}
            y={textPosition.y}
            font={font}
            text="Flappy Bird"
            color="#f2891A3"
            strokeWidth={3.5}
            style="stroke"
          />
          <Text
            x={textPosition.x}
            y={textPosition.y}
            font={font}
            text="Flappy Bird"
            color="#ffffff"
          />
        </>
      )}
    </>
  );
};

export default Bird;
