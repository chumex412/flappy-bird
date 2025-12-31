import { StyleSheet, Text } from "react-native";

import { XTextProps } from "@/types/global";
import { FONT_FAMILY } from "@/utils/constant";
import { actuateFontSize, actuateLineHeight } from "@/utils/normalize";

const sizeStyle = StyleSheet.create({
  lgBold: {
    fontFamily: FONT_FAMILY.gemunuLibre.bold,
    fontSize: actuateFontSize(24),
    lineHeight: actuateLineHeight(24, 26),
  },
  baseBold: {
    fontFamily: FONT_FAMILY.gemunuLibre.bold,
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 18),
  },
});

function XText({
  size = "baseBold",
  align = "left",
  style,
  children,
}: XTextProps) {
  return (
    <Text style={[sizeStyle[size], { color: "#FFF", textAlign: align }, style]}>
      {children}
    </Text>
  );
}

export default XText;
