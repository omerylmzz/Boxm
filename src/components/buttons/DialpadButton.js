import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { horizontalScale, moderateScale } from "../../helpers/Metrics";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LightTheme from "../../themes/LightTheme";

const DialpadButton = ({ mode, icon, text, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: mode ? color : LightTheme.colors.primaryPurple },
      ]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      {mode ? (
        <Icon
          name={icon}
          color={mode ? color : Color.colors.primaryPurple}
          size={24}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(75),
    height: horizontalScale(75),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.primaryWhite,
    borderRadius: moderateScale(50),
    borderWidth: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: LightTheme.colors.primaryPurple,
  },
});

export default DialpadButton;
