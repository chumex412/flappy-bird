import { useWindowDimensions } from "react-native";

import ScreenCanva from "@/components/ScreenCanva";
import { useAnimateBackgroundContent } from "@/hooks/use-animate-background";
import { useBirdMotion } from "@/hooks/use-bird-motion";
import Bird from "@/module/game/components/Bird";
import Content from "@/module/game/components/Content";
import Pipes from "@/module/game/components/Pipe";
import { GestureDetector } from "react-native-gesture-handler";

const App = () => {
  const { width, height } = useWindowDimensions();

  const { poleX } = useAnimateBackgroundContent(width);
  const { gesture, yPosition, transform, origin } = useBirdMotion();

  const topPipeHeight = 350,
    bottomPipeHeight = 170;

  return (
    <GestureDetector gesture={gesture}>
      <ScreenCanva>
        <Content />
        <Pipes
          topHeight={topPipeHeight}
          bottomHeight={bottomPipeHeight}
          xValue={poleX}
        />
        <Bird
          width={width}
          height={height}
          yPosition={yPosition}
          transform={transform}
          origin={origin}
        />
      </ScreenCanva>
    </GestureDetector>
  );
};

export default App;
