import { Group, Path, Rect } from "@shopify/react-native-skia";

import { RoadProps } from "@/module/game/types.game";
import { groundHeight, roadHeight } from "@/utils/constant";

const Road = ({ width, height, roadX }: RoadProps) => {
  return (
    <Group transform={[{ translateY: height - roadHeight - groundHeight }]}>
      <Rect x={0} y={0} width={width} height={roadHeight} color="#9be658" />

      {/* Clip visible area */}
      <Group clip={{ x: 0, y: 0, width, height: roadHeight }}>
        <Group>
          <Path
            color="#83cb44"
            path={`
              M30 0h50L50 33.113H0z
              M125 0h50l-30 33.113H95z
              M220 0h50l-30 33.113h-50z
              M315 0h50l-30 33.113h-50z
              M410 0h50l-30 33.113h-50z
              M505 0h50l-30 33.113h-50z
              M600 0h50l-30 33.113h-50z
              M695 0h13v33.113h-43z
            `}
          />

          {/* Duplicate for seamless looping */}
          <Group transform={[{ translateX: 708 }]}>
            <Path
              color="#83cb44"
              path={`
                M30 0h50L50 33.113H0z
                M125 0h50l-30 33.113H95z
                M220 0h50l-30 33.113h-50z
                M315 0h50l-30 33.113h-50z
                M410 0h50l-30 33.113h-50z
                M505 0h50l-30 33.113h-50z
                M600 0h50l-30 33.113h-50z
                M695 0h13v33.113h-43z
              `}
            />
          </Group>
        </Group>
      </Group>

      {/* Highlights */}
      <Rect x={0} y={0} width={width} height={3} color="#e6ff87" />
      <Rect x={0} y={30} width={width} height={3} color="#618b35" />
    </Group>
  );
};

export default Road;
