import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { Dimensions, Keyboard, Platform, StyleSheet, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnUI,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import LightTheme from "../../themes/LightTheme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = forwardRef(({ snapTo, children }, ref) => {
  const heightOfClose = SCREEN_HEIGHT;
  const percentage = parseFloat(snapTo.replace("%", "")) / 100;
  const heightOfOpen = SCREEN_HEIGHT - SCREEN_HEIGHT * percentage;
  const topSharedAnimation = useSharedValue(heightOfClose);
  const context = useSharedValue(0);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  const open = useCallback(() => {
    "worklet";
    topSharedAnimation.value = withTiming(heightOfOpen);
  }, [heightOfOpen, topSharedAnimation]);

  const close = useCallback(() => {
    "worklet";
    topSharedAnimation.value = withTiming(heightOfClose);
  }, [heightOfClose, topSharedAnimation]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = topSharedAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 0) {
        topSharedAnimation.value = withSpring(heightOfOpen, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        topSharedAnimation.value = withSpring(
          event.translationY + context.value,
          {
            damping: 100,
            stiffness: 400,
          }
        );
      }
    })
    .onEnd(() => {
      if (topSharedAnimation.value > heightOfOpen + 50) {
        topSharedAnimation.value = withSpring(heightOfClose, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        topSharedAnimation.value = withSpring(heightOfOpen, {
          damping: 100,
          stiffness: 400,
        });
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      top: topSharedAnimation.value,
    };
  });

  const rBackDropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      topSharedAnimation.value,
      [heightOfClose, heightOfOpen],
      [0, 0.5]
    );
    const display = opacity === 0 ? "none" : "flex";

    return {
      opacity: opacity,
      display: display,
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
          },
          rBackDropStyle,
        ]}
        onTouchStart={() => {
          close();
        }}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LightTheme.colors.background,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
  },
  line: {
    width: horizontalScale(48),
    height: verticalScale(6),
    alignSelf: "center",
    marginVertical: verticalScale(24),
    backgroundColor: LightTheme.colors.icon,
    borderRadius: moderateScale(50),
  },
});

export default BottomSheet;
