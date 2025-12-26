import {
  birdHeight,
  birdWidth,
  cityHeight,
  cloudsHeight,
  grassHeight,
  groundHeight,
} from "@/utils/constant";
import { Group, ImageSVG, useSVG } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const Content = () => {
  const grass = useSVG(require("@/assets/images/grass.svg")),
    bird = useSVG(require("@/assets/icons/bird.svg")),
    city = useSVG(require("@/assets/images/Buildings.svg")),
    clouds = useSVG(require("@/assets/images/Clouds.svg"));

  const { width, height } = useWindowDimensions();

  const positions = useMemo(
    () => ({
      bird: { x: (width - birdWidth) / 2, y: Math.round(height / 3) },
      grass: { x: 0, y: height - groundHeight - grassHeight },
      city: { x: 0, y: height - groundHeight - grassHeight - cityHeight },
      cloud: {
        x: 0,
        y: height - groundHeight - grassHeight - cityHeight - cloudsHeight,
      },
    }),
    [width, height]
  );

  return (
    <>
      <ImageSVG
        svg={bird}
        width={birdWidth}
        height={birdHeight}
        y={positions.bird.y}
        x={positions.bird.x}
      />
      <Group>
        <ImageSVG
          svg={clouds}
          width={width}
          height={cloudsHeight}
          x={positions.cloud.x}
          y={positions.cloud.y}
        />

        <ImageSVG
          svg={city}
          width={width}
          height={cityHeight}
          x={positions.city.x}
          y={positions.city.y}
        />
        <ImageSVG
          svg={grass}
          width={width}
          height={grassHeight}
          x={positions.grass.x}
          y={positions.grass.y}
        />
      </Group>
    </>
  );
};

export default Content;

const styles = StyleSheet.create({});
