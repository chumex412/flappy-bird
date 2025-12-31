import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { ModalProps } from "react-native-modal";

export interface NotificationParams {
  title?: string;
  message: string;
  type: NotificationType;
}

export type NotificationType = "success" | "error" | "info" | "custom";

export interface XPModalProps extends Partial<ModalProps> {
  isVisible: boolean;
  fullHeight?: boolean;
  contentStyle?: ViewStyle;
  onClose?: () => void;
}

export interface AlertDialogProps {
  isVisible: boolean;
  title?: string;
  content?: ReactNode;
  okBtnLabel?: string;
  cancelBtnLabel?: string;
  onOkBtnPress?: VoidFunction;
  onCancelBtnPress?: VoidFunction;
  okBtnStyle?: ViewStyle;
  okBtnLabelStyle?: TextStyle;
  cancelBtnStyle?: ViewStyle;
  cancelLabelStyle?: TextStyle;
}

type FontVariantTypes = "lgBold" | "baseBold";

export interface XTextProps {
  size?: FontVariantTypes;
  align?: TextStyle["textAlign"];
  style?: TextStyle | (TextStyle | undefined)[];
  children: ReactNode;
}
