import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/Metrics";
import LightTheme from "../../themes/LightTheme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CollectionItem = ({ icon, text, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.collectionContainer}>
        <View style={styles.collectionBody}>
          <Icon name={icon} color={LightTheme.colors.placeholder} size={24} />
        </View>
      </Pressable>
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(120),
    height: verticalScale(180),
    justifyContent: "center",
    alignItems: "center",
  },
  collectionContainer: {
    flex: 0.8,
    aspectRatio: 4 / 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.input,
    borderRadius: moderateScale(10),
  },
  collectionBody: {
    flex: 0.8,
    aspectRatio: 4 / 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LightTheme.colors.placeholder,
    borderRadius: moderateScale(10),
  },
  text: {
    fontSize: 14,
    color: LightTheme.colors.text,
    maxWidth: horizontalScale(80),
    paddingTop: verticalScale(8),
  },
});

export default CollectionItem;
