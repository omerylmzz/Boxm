import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import LightTheme from "../themes/LightTheme";
import { verticalScale } from "../helpers/Metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      const pin = await AsyncStorage.getItem("USER_PIN_CODE");
      if (pin === null) {
        navigation.replace("Onboarding");
      } else {
        navigation.replace("Security");
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={LightTheme.colors.primaryPurple}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
        resizeMode="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.primaryPurple,
  },
  image: {
    width: "100%",
    height: verticalScale(150),
  },
});

export default Splash;
