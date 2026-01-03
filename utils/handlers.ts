import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaintStyle, Skia } from "@shopify/react-native-skia";

export const storeData = async (key: string, value: unknown) => {
  try {
    const value2Store =
      typeof value === "string"
        ? value
        : typeof value === "object"
        ? JSON.stringify(value)
        : "";

    await AsyncStorage.setItem(key, value2Store);
  } catch (err) {
    console.error(err);
  }
};

export const getStoredData = async function <T>(
  key: string
): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      throw Error("Unable to retrieve data or it doesn't exist.");
    }
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

export const paintSkiaStroke = (width: number, stroke: string) => {
  const strokePaint = Skia.Paint();
  strokePaint.setStyle(PaintStyle.Stroke);
  strokePaint.setStrokeWidth(width);
  strokePaint.setColor(Skia.Color(stroke));

  return strokePaint;
};
