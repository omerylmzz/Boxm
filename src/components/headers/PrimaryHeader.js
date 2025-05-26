import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LightTheme from "../../themes/LightTheme";

const PrimaryHeader = ({
  title,
  leftIcon,
  leftIconOnPress,
  rightIcon,
  rightIconOnPress,
  optionalIcon,
  optionalIconOnPress,
  isLoading,
}) => {
  const RippleButton = ({ children, onPress }) => (
    <View style={styles.button}>
      <Pressable
        style={{ padding: moderateScale(4) }}
        onPress={onPress}
        android_ripple={{ color: LightTheme.colors.ripple }}
      >
        {children}
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <RippleButton onPress={leftIconOnPress}>
          <Icon name={leftIcon} color={LightTheme.colors.icon} size={24} />
        </RippleButton>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.wrapper}>
        {optionalIcon && (
          <RippleButton onPress={optionalIconOnPress}>
            <Icon
              name={optionalIcon}
              color={LightTheme.colors.icon}
              size={24}
            />
          </RippleButton>
        )}
        {isLoading ? (
          <ActivityIndicator
            style={{ paddingHorizontal: horizontalScale(4) }}
            size="small"
            color={LightTheme.colors.text}
          />
        ) : (
          <RippleButton onPress={rightIconOnPress}>
            <Icon name={rightIcon} color={LightTheme.colors.icon} size={24} />
          </RippleButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(60),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightTheme.colors.background,
    paddingHorizontal: horizontalScale(4),
  },
  wrapper: {
    flexDirection: "row",
    columnGap: horizontalScale(8),
  },
  button: {
    overflow: "hidden",
    borderRadius: moderateScale(24),
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: LightTheme.colors.title,
  },
});

export default PrimaryHeader;
