import { View, Text, Dimensions, StyleSheet } from "react-native";
import { horizontalScale, moderateScale } from "../../helpers/Metrics";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import LightTheme from "../../themes/LightTheme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Pegination = ({ data, axis }) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const animatedCircleStyles = useAnimatedStyle(() => {
          return {
            width: interpolate(
              axis.value,
              [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
              ],
              [SCREEN_WIDTH * 0.025, SCREEN_WIDTH * 0.05, SCREEN_WIDTH * 0.025],
              Extrapolate.CLAMP
            ),
            opacity: interpolate(
              axis.value,
              [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
              ],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP
            ),
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.circle, animatedCircleStyles]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: SCREEN_HEIGHT * 0.7,
  },
  circle: {
    width: SCREEN_WIDTH * 0.025,
    height: SCREEN_WIDTH * 0.025,
    backgroundColor: LightTheme.colors.primaryPurple,
    borderRadius: moderateScale(24),
    marginHorizontal: horizontalScale(4),
  },
});

export default Pegination;
