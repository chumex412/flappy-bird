import { useWindowDimensions } from "react-native";

import ScreenCanva from "@/components/ScreenCanva";
import { useAnimateBackground } from "@/hooks/use-animate-background";
import Content from "@/module/game/components/Content";
import Pipes from "@/module/game/components/Pipe";

const App = () => {
  const width = useWindowDimensions().width;

  const { x } = useAnimateBackground();

  const topPipeHeight = 350,
    bottomPipeHeight = 170;

  return (
    <ScreenCanva>
      <Content />
      <Pipes
        topHeight={topPipeHeight}
        bottomHeight={bottomPipeHeight}
        xValue={x}
      />
    </ScreenCanva>
  );
};

export default App;
