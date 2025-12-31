import { ImageSVG, useSVG } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

import { pipeWidth } from "@/utils/constant";

import { PipeProps } from "../types.game";

const { width: screenWidth } = Dimensions.get("window");

const PIPE_IMAGE_HEIGHT = 398;

const containerWidth = screenWidth - 40;

const Pipes = ({ topHeight, bottomHeight, xValue, bottomPipeY }: PipeProps) => {
  const topPipe = useSVG(require("@/assets/images/top_pipe.svg")),
    bottomPipe = useSVG(require("@/assets/images/bottom_pipe.svg"));

  const originalWidth = topPipe?.width() || pipeWidth;
  const originalHeight = topPipe?.height() || PIPE_IMAGE_HEIGHT;

  const topTransform = useDerivedValue(() => [
    { scaleY: topHeight.value / originalHeight },
  ]);

  const bottomTransform = useDerivedValue(() => [
    { scaleY: bottomHeight.value / originalHeight },
  ]);

  return (
    <>
      {topPipe && (
        <ImageSVG
          svg={topPipe}
          x={xValue}
          y={0}
          transform={topTransform}
          width={originalWidth}
          height={originalHeight}
        />
      )}
      {bottomPipe && (
        <ImageSVG
          svg={bottomPipe}
          x={xValue}
          y={bottomPipeY}
          width={originalWidth}
          height={bottomHeight}
        />
      )}
    </>
  );
};

export default Pipes;
