import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";
import LightTheme from "../../themes/LightTheme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PrimaryButton = ({ text, onPress }) => {
  const scaleOffset = useSharedValue(1);
  const onPressIn = () => (scaleOffset.value = 0.96);
  const onPressOut = () => (scaleOffset.value = 1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scaleOffset.value, { damping: 50 }) }],
    };
  });

  return (
    <Animated.View style={[animatedStyles]}>
      <Pressable
        style={styles.container}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(350),
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: LightTheme.colors.primaryPurple,
    borderRadius: moderateScale(24),
  },
  text: {
    fontSize: 18,
    color: LightTheme.colors.primaryWhite,
  },
});

export default PrimaryButton;
