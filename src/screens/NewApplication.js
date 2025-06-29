import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LightTheme from "../themes/LightTheme";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PrimaryTextInput from "../components/inputs/PrimaryTextInput";
import BottomSheet from "../components/layouts/BottomSheet";
import ApplicationSettingData from "../constants/ApplicationSettingData";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../helpers/Metrics";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCounter,
  increaseCounter,
  toggleSwitch,
} from "../store/slices/NewApplicationSlice";

const NewApplication = ({ navigation }) => {
  const bottomSheetRef = useRef(null);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.newApplication);

  const [settingsData, setSettingsData] = useState(selector.data);

  const showSettings = useCallback(() => {
    bottomSheetRef?.current?.open();
  }, []);

  const saveSettings = () => {
    if (selector.data[5].count === 1) {
      setSettingsData([
        ...selector.data,
        {
          id: 7,
          label: "Şifre",
          placeholder: "Şifre",
          selected: true,
          type: "toggle",
        },
      ]);
    } else if (selector.data[5].count === 2) {
      const newData = [
        {
          id: 7,
          label: "Birinci Şifre",
          placeholder: "Birinci şifre",
          selected: true,
          type: "toggle",
        },
        {
          id: 8,
          label: "İkinci Şifre",
          placeholder: "İkinci şifre",
          selected: true,
          type: "toggle",
        },
      ];
      setSettingsData([...selector.data, ...newData]);
    } else if (selector.data[5].count === 3) {
      const newData = [
        {
          id: 7,
          label: "Birinci Şifre",
          placeholder: "Birinci şifre",
          selected: true,
          type: "toggle",
        },
        {
          id: 8,
          label: "İkinci Şifre",
          placeholder: "İkinci şifre",
          selected: true,
          type: "toggle",
        },
        {
          id: 9,
          label: "Üçüncü Şifre",
          placeholder: "Üçüncü şifre",
          selected: true,
          type: "toggle",
        },
      ];
      setSettingsData([...selector.data, ...newData]);
    }
    bottomSheetRef?.current?.close();
  };
  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title="Yeni Uygulama"
        leftIcon="window-close"
        leftIconOnPress={() => navigation.goBack()}
        rightIcon="check"
        optionalIcon="tune-variant"
        optionalIconOnPress={showSettings}
      />
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <PrimaryTextInput
              visible={item.selected}
              title={item.label}
              placeholder={item.placeholder}
            />
          );
        }}
      />
      <BottomSheet ref={bottomSheetRef} snapTo="%55">
        <Text style={styles.bottomSheetTitle}>Ayarlar</Text>
        <Text style={styles.bottomSheetDescription}>
          Uygulamanızın sizden istediği bilgilere göre kişiselleştirme
          yapabilirsiniz
        </Text>
        <View style={{ paddingVertical: verticalScale(24) }}>
          {selector.data.map((item) => (
            <View key={item.id} style={styles.bottomSheetContainer}>
              <Text style={styles.bottomSheetText}>{item.label}</Text>
              {item.type === "toggle" && (
                <Switch
                  value={item.selected}
                  onValueChange={() => {
                    item.id !== 1 && dispatch(toggleSwitch(item));
                  }}
                  trackColor={{
                    true: LightTheme.colors.primaryGreen,
                    false: LightTheme.colors.placeholder,
                  }}
                  thumbColor={LightTheme.colors.primaryWhite}
                />
              )}
              {item.type === "counter" && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[
                      styles.bottomSheetButton,
                      {
                        borderTopLeftRadius: moderateScale(25),
                        borderBottomLeftRadius: moderateScale(25),
                      },
                    ]}
                    onPress={() => dispatch(decreaseCounter())}
                    activeOpacity={0.5}
                  >
                    <Icon
                      name="minus"
                      color={LightTheme.colors.primaryWhite}
                      size={14}
                    />
                  </TouchableOpacity>
                  <View style={styles.bottomSheetCounter}>
                    <Text style={styles.bottomSheetCounterText}>
                      {selector.data[5].count}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.bottomSheetButton,
                      {
                        borderTopRightRadius: moderateScale(25),
                        borderBottomRightRadius: moderateScale(25),
                      },
                    ]}
                    onPress={() => dispatch(increaseCounter())}
                    activeOpacity={0.5}
                  >
                    <Icon
                      name="plus"
                      color={LightTheme.colors.primaryWhite}
                      size={14}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
        <PrimaryButton text="Kaydet" onPress={saveSettings} />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
  bottomSheetContainer: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(36),
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: horizontalScale(8),
    paddingRight: horizontalScale(4),
  },
  bottomSheetTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: LightTheme.colors.title,
    alignSelf: "center",
  },
  bottomSheetDescription: {
    fontSize: 14,
    color: LightTheme.colors.description,
    textAlign: "center",
    maxWidth: "80%",
    alignSelf: "center",
  },
  bottomSheetText: {
    fontSize: 18,
    color: LightTheme.colors.text,
  },
  bottomSheetButton: {
    width: horizontalScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.primaryPurple,
  },
  bottomSheetCounter: {
    width: horizontalScale(20),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LightTheme.colors.input,
  },
  bottomSheetCounterText: {
    fontWeight: "bold",
    fontSize: 14,
    color: LightTheme.colors.text,
  },
});

export default NewApplication;
