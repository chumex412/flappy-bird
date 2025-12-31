import { Group, ImageSVG, useSVG } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

import {
  cityHeight,
  cloudsHeight,
  grassHeight,
  groundHeight,
} from "@/utils/constant";

import { GameContentProps } from "../types.game";

const Content = ({ cityX, cloudX, grassX }: GameContentProps) => {
  const grass = useSVG(require("@/assets/images/grass.svg")),
    city = useSVG(require("@/assets/images/Buildings.svg")),
    clouds = useSVG(require("@/assets/images/Clouds.svg"));

  const { width, height } = useWindowDimensions();

  const loopX = (x: number, width: number) => {
    "worklet";
    return (((x % width) + width) % width) - width;
  };

  const wrappedCityTransform = useDerivedValue(() => {
    return [{ translateX: loopX(cityX.value, width) }];
  });

  const wrappedCloudTransform = useDerivedValue(() => {
    return [{ translateX: loopX(cloudX.value, width) }];
  });

  const wrappedGrassTransform = useDerivedValue(() => {
    return [{ translateX: loopX(grassX.value, width) }];
  });

  const positions = useMemo(
    () => ({
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
      <Group transform={wrappedCloudTransform}>
        <ImageSVG
          svg={clouds}
          width={width}
          height={cloudsHeight}
          x={0}
          y={positions.cloud.y}
        />
        <ImageSVG
          svg={clouds}
          width={width}
          height={cloudsHeight}
          x={width}
          y={positions.cloud.y}
        />
      </Group>
      <Group transform={wrappedCityTransform}>
        <ImageSVG
          svg={city}
          width={width}
          height={cityHeight}
          x={0}
          y={positions.city.y}
        />
        <ImageSVG
          svg={city}
          width={width}
          height={cityHeight}
          x={width}
          y={positions.city.y}
        />
      </Group>
      <Group transform={wrappedGrassTransform}>
        <ImageSVG
          svg={grass}
          width={width}
          height={grassHeight}
          x={0}
          y={positions.grass.y}
        />
        <ImageSVG
          svg={grass}
          width={width}
          height={grassHeight}
          x={width}
          y={positions.grass.y}
        />
      </Group>
    </>
  );
};

export default Content;
