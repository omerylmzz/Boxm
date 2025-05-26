import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";
import LightTheme from "../../themes/LightTheme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="magnify" color={LightTheme.colors.secondary} size={18} />
        <TextInput
          style={styles.input}
          placeholder="Ara"
          placeholderTextColor={LightTheme.colors.placeholder}
        />
        <Pressable style={styles.button}>
          <Icon
            name="account"
            color={LightTheme.colors.primaryWhite}
            size={14}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "95%",
    height: verticalScale(40),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightTheme.colors.input,
    borderRadius: moderateScale(50),
    marginVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: LightTheme.colors.text,
    paddingHorizontal: horizontalScale(8),
  },
  button: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.primaryPurple,
    borderRadius: moderateScale(50),
  },
});

export default HomeHeader;
