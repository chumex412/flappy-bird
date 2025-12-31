import { isValidElement, memo } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlertDialogProps, XPModalProps } from "@/types/global";
import { actuateNormalize } from "@/utils/normalize";
import XText from "./XText";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function Modal({
  isVisible,
  backdropColor,
  fullHeight,
  animationInTiming,
  contentStyle,
  onClose,
  ...props
}: XPModalProps) {
  const closeModal = () => onClose?.();
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View>
      <RNModal
        {...props}
        style={[fullHeight && styles.modal]}
        isVisible={isVisible}
        backdropColor={backdropColor || "#00000099"}
        animationIn="zoomIn"
        animationInTiming={animationInTiming || 750}
        hideModalContentWhileAnimating
        coverScreen={fullHeight}
        onSwipeComplete={closeModal}
        swipeDirection="left"
        useNativeDriver={false}
        onBackButtonPress={closeModal}
      >
        <View
          style={[
            styles.content,
            fullHeight && {
              flex: 1,
              borderRadius: 0,
              paddingTop: top,
              paddingBottom: bottom,
            },
            contentStyle,
          ]}
        >
          {props.children}
        </View>
      </RNModal>
    </View>
  );
}

export const AlertDialog = ({
  isVisible,
  title,
  content,
  okBtnLabel = "Ok",
  cancelBtnLabel = "Cancel",
  onOkBtnPress,
  onCancelBtnPress,
  cancelBtnStyle,
  cancelLabelStyle,
  okBtnLabelStyle,
  okBtnStyle,
}: AlertDialogProps) => {
  return (
    <Modal
      fullHeight
      isVisible={isVisible}
      contentStyle={alertStyles.modalWrapper}
      backdropOpacity={0.5}
    >
      <View style={alertStyles.modalContent}>
        <View style={alertStyles.textContent}>
          <View style={{ rowGap: 20 }}>
            {title ? <XText align="center">{title}</XText> : null}
            {isValidElement(content) ? (
              content
            ) : (
              <XText align="center" size="lgBold" style={{ color: "#CB783B" }}>
                {content}
              </XText>
            )}
          </View>
        </View>
        <View style={alertStyles.btnWrapper}>
          {onCancelBtnPress ? (
            <Pressable
              style={[
                alertStyles.button,
                onOkBtnPress && alertStyles.rightBorder,
              ]}
              onPress={onCancelBtnPress}
            >
              <XText align="center" style={cancelLabelStyle}>
                {cancelBtnLabel}
              </XText>
            </Pressable>
          ) : null}
          {onOkBtnPress ? (
            <Pressable
              style={alertStyles.button}
              onPress={() => {
                onOkBtnPress?.();
              }}
            >
              <XText align="center" style={okBtnLabelStyle}>
                {okBtnLabel}
              </XText>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const alertStyles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: actuateNormalize(280, "width"),
  },
  textContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  btnWrapper: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#00000033",
    padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#8BBE34",
    paddingVertical: 10,
    borderRadius: 5,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: "#0000001A",
  },
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  content: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
});

export default memo(Modal);
