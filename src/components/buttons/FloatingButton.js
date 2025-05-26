import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LightTheme from "../../themes/LightTheme";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";

const FloatingButton = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name="plus" color={LightTheme.colors.primaryWhite} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: horizontalScale(50),
    height: horizontalScale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.primaryPurple,
    borderRadius: moderateScale(50),
    bottom: verticalScale(16),
    right: horizontalScale(16),
  },
});

export default FloatingButton;
