import { Group, ImageSVG, useSVG } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import {
  cityHeight,
  cloudsHeight,
  grassHeight,
  groundHeight,
} from "@/utils/constant";

const Content = () => {
  const grass = useSVG(require("@/assets/images/grass.svg")),
    city = useSVG(require("@/assets/images/Buildings.svg")),
    clouds = useSVG(require("@/assets/images/Clouds.svg"));

  const { width, height } = useWindowDimensions();

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
    <Group>
      <ImageSVG
        svg={clouds}
        width={width}
        height={cloudsHeight}
        x={0}
        y={positions.cloud.y}
      />

      <ImageSVG
        svg={city}
        width={width}
        height={cityHeight}
        x={0}
        y={positions.city.y}
      />

      <ImageSVG
        svg={grass}
        width={width}
        height={grassHeight}
        x={0}
        y={positions.grass.y}
      />
    </Group>
  );
};

export default Content;
