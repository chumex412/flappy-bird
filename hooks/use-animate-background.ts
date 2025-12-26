import { useSharedValue } from "react-native-reanimated";

export function useAnimateBackground() {
  const x = useSharedValue(0);

  return { x: x.value };
}
