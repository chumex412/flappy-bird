import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import React, { ReactNode } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Road from "@/module/game/components/Road";
import Loader from "@/module/splash/components/Loader";
import { colors, groundColor, groundHeight } from "@/utils/constant";

const ScreenCanva = ({
  children,
  roadX,
  isLoading,
  onLoaded,
  isGameOver,
}: {
  children?: ReactNode;
  roadX?: SharedValue<number>;
  isLoading?: boolean;
  onLoaded?: VoidFunction;
  isGameOver?: boolean;
}) => {
  const { width, height } = useWindowDimensions();

  const { bottom } = useSafeAreaInsets();

  const r = width * 0.33;

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
      <Road width={width} height={height} roadX={roadX} />
      <Rect width={width} height={groundHeight} y={height - groundHeight}>
        <LinearGradient
          colors={groundColor}
          start={vec(0, 0)}
          end={vec(groundHeight, groundHeight)}
        />
      </Rect>
      {isLoading && <Loader onLoaded={onLoaded} />}
    </Canvas>
  );
};

export default ScreenCanva;

const styles = StyleSheet.create({});
