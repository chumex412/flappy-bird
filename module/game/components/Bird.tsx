import { ImageSVG, useSVG } from "@shopify/react-native-skia";

import { birdHeight, birdWidth } from "@/utils/constant";

import { BirdProps } from "../types.game";

const Bird = ({ width, height, yPosition }: BirdProps) => {
  const bird = useSVG(require("@/assets/icons/bird.svg"));

  const birdXPosition = (width - birdWidth) / 2;

  return (
    <ImageSVG
      svg={bird}
      width={birdWidth}
      height={birdHeight}
      y={yPosition}
      x={birdXPosition}
    />
  );
};

export default Bird;
