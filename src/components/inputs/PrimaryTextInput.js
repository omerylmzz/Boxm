import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LightTheme from "../../themes/LightTheme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";

const PrimaryTextInput = ({
  visible,
  title,
  passwordIcon,
  passwordIconOnPress,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={{ display: visible ? "flex" : "none", alignSelf: "center" }}>
      {title && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={LightTheme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {passwordIcon && (
          <TouchableOpacity onPress={passwordIconOnPress} activeOpacity={0.5}>
            <Icon
              name={passwordIcon}
              color={LightTheme.colors.placeholder}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: horizontalScale(350),
    height: verticalScale(50),
    alignItems: "center",
    backgroundColor: LightTheme.colors.input,
    borderRadius: moderateScale(50),
    paddingHorizontal: horizontalScale(16),
  },
  wrapper: {
    flexDirection: "row",
    width: horizontalScale(350),
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: LightTheme.colors.text,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: LightTheme.colors.title,
    paddingVertical: verticalScale(8),
  },
});

export default PrimaryTextInput;
