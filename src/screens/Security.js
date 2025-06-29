import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import LightTheme from "../themes/LightTheme";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../helpers/Metrics";
import DialpadData from "../constants/DialpadData";
import DialpadButton from "../components/buttons/DialpadButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiView } from "moti";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Security = ({ navigation }) => {
  const codeLength = 6;
  const [title, setTitle] = useState([]);
  const [code, setCode] = useState([]);

  useEffect(() => {
    checkUserPinCode();
  }, []);

  const onPress = async (item) => {
    if (item === "delete") {
      setCode((prevNumber) => prevNumber.slice(0, prevNumber.length - 1));
    } else if (item === "confirm") {
      if (code.length === codeLength) {
        try {
          const _code = await AsyncStorage.getItem("USER_PIN_CODE");
          if (_code === null) {
            await AsyncStorage.setItem("USER_PIN_CODE", code.join(""));
            navigation.replace("Home");
          } else {
            code.join("") === _code
              ? navigation.replace("Home")
              : console.log("Şifre yanlış");
          }
        } catch (error) {
          console.log("USER PIN CODE ERROR: " + error);
        }
      }
    } else {
      code.length !== codeLength &&
        setCode((prevNumber) => [...prevNumber, item]);
    }
  };

  const checkUserPinCode = async () => {
    try {
      const _code = await AsyncStorage.getItem("USER_PIN_CODE");
      if (_code === null) {
        setTitle("Uygulama için bir şifre belirleyin");
      } else {
        setTitle("Lütfen şifrenizi giriniz");
      }
    } catch (error) {
      console.log("SECURITY SCREEN CHECK USER PIN CODE ERROR: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wrapper}>
        {[...Array(codeLength).keys()].map((index) => {
          const isSelected = code[index] === 0 ? true : !!code[index];
          return (
            <MotiView
              key={index}
              style={{
                width: SCREEN_WIDTH * 0.06,
                borderRadius: moderateScale(24),
                backgroundColor: LightTheme.colors.primaryPurple,
              }}
              transition={{
                type: "timing",
                duration: 200,
              }}
              animate={{
                height: isSelected ? SCREEN_WIDTH * 0.06 : 2,
                marginBottom: isSelected ? verticalScale(16) : 0,
              }}
            />
          );
        })}
      </View>
      <FlatList
        style={{ flexGrow: 0 }}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: horizontalScale(32) }}
        contentContainerStyle={{ gap: horizontalScale(16) }}
        data={DialpadData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <DialpadButton
            mode={item === "delete" ? true : item === "confirm" ? true : false}
            icon={item === "delete" ? "backspace-outline" : "check"}
            text={item}
            color={
              item === "delete"
                ? LightTheme.colors.primaryRed
                : LightTheme.colors.primaryGreen
            }
            onPress={() => onPress(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: LightTheme.colors.background,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    color: LightTheme.colors.title,
  },
  wrapper: {
    flexDirection: "row",
    height: verticalScale(100),
    justifyContent: "center",
    alignItems: "flex-end",
    gap: horizontalScale(16),
  },
});

export default Security;
