import {
  Canvas,
  ImageSVG,
  LinearGradient,
  Rect,
  useSVG,
  vec,
} from "@shopify/react-native-skia";
import React, { ReactNode } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { groundHeight, roadHeight } from "@/utils/constant";

const colors = {
  light: ["#2BC9EC", "#C8F5FF", "#FFFFFF"],
};

const groundColor = ["#CB783B", "#ECBF7D"];

const ScreenCanva = ({ children }: { children?: ReactNode }) => {
  const { width, height } = useWindowDimensions();

  const road = useSVG(require("@/assets/images/road.svg"));

  const { top, bottom } = useSafeAreaInsets();

  const r = width * 0.33;
  const pageHeight = height - bottom;

  return (
    <Canvas style={{ width, height: height }}>
      <Rect width={width} height={height}>
        <LinearGradient
          colors={colors.light}
          start={vec(0, 0)}
          end={vec(width, height)}
        />
      </Rect>
      {children}
      <ImageSVG
        svg={road}
        width={width}
        height={roadHeight}
        x={0}
        y={height - groundHeight - roadHeight}
      />
      <Rect width={width} height={groundHeight} y={height - groundHeight}>
        <LinearGradient
          colors={groundColor}
          start={vec(0, 0)}
          end={vec(groundHeight, groundHeight)}
        />
      </Rect>
    </Canvas>
  );
};

export default ScreenCanva;

const styles = StyleSheet.create({});
