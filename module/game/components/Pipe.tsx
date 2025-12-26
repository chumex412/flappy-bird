import { Group, ImageSVG, useSVG } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { groundHeight, roadHeight } from "@/utils/constant";

import { PipeProps } from "../types.game";

const Pipes = ({ topHeight, bottomHeight, xValue }: PipeProps) => {
  const topPipe = useSVG(require("@/assets/images/Pipe_2.svg")),
    bottomPipe = useSVG(require("@/assets/images/Pipe.svg"));

  const { width, height } = useWindowDimensions();

  const pipePosition = useMemo(
    () => ({
      x: xValue,
      y: height - groundHeight - roadHeight - topHeight,
    }),
    [width, height, bottomHeight, xValue]
  );

  return (
    <Group>
      {topPipe && <ImageSVG svg={topPipe} x={pipePosition.x} y={0} />}
      {bottomPipe && (
        <ImageSVG
          svg={bottomPipe}
          height={topHeight}
          x={pipePosition.x}
          y={pipePosition.y}
        />
      )}
    </Group>
  );
};

export default Pipes;

const styles = StyleSheet.create({});
