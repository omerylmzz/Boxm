import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LightTheme from "../themes/LightTheme";
import PrimaryHeader from "../components/headers/PrimaryHeader";
import { horizontalScale, moderateScale } from "../helpers/Metrics";
import BottomSheet from "../components/layouts/BottomSheet";
import CollectionIconData from "../constants/CollectionIconData";
import { useSQLiteContext } from "expo-sqlite";
import { useDispatch } from "react-redux";
import { fetchCollections } from "../store/slices/HomeSlice";

const NewCollection = ({ navigation }) => {
  const db = useSQLiteContext();
  const bottomSheetRef = useRef(null);
  const [collectionName, setCollectionName] = useState("Koleksiyon Adı");
  const [collectionIconData, setCollectionIconData] = useState(
    JSON.parse(JSON.stringify(CollectionIconData))
  );
  const [selectedIcon, setSelectedIcon] = useState("bank");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchCollections());
    };
  }, []);

  const addCollection = () => {
    if (collectionName.trim() === "") {
      return Alert.alert("Error", "Koleksiyon adı boş olamaz!");
    }
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await db.runAsync(
          `INSERT INTO collections (name, icon) VALUES (?, ?)`,
          [collectionName.trim(), selectedIcon]
        );
        Alert.alert("Success", "Koleksiyon başarıyla oluşturuldu!");
        setIsLoading(false);
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message || "Koleksiyon oluşturulamadı!");
        setIsLoading(false);
      }
    }, 2000);
  };

  const showIcons = useCallback(() => {
    bottomSheetRef?.current?.open();
  }, []);

  const selectIcon = useCallback((item) => {
    const oldSelectedIndex = collectionIconData.findIndex(
      (element) => element.selected
    );
    const newSelectedIndex = collectionIconData.findIndex(
      (element) => element.id === item.id
    );
    if (oldSelectedIndex === newSelectedIndex) {
      bottomSheetRef?.current?.close();
    } else {
      const updatedData = [...collectionIconData];
      updatedData[newSelectedIndex].selected = true;
      updatedData[oldSelectedIndex].selected = false;
      setSelectedIcon(updatedData[newSelectedIndex].icon);
      setCollectionIconData(updatedData);
      bottomSheetRef?.current?.close();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PrimaryHeader
        title="Yeni Koleksiyon"
        leftIcon="window-close"
        leftIconOnPress={() => navigation.goBack()}
        rightIcon="check"
        rightIconOnPress={addCollection}
        isLoading={isLoading}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.collectionContainer}>
          <View style={styles.collectionBody}>
            <Pressable onPress={showIcons}>
              <Icon
                name={selectedIcon}
                color={LightTheme.colors.placeholder}
                size={36}
              />
            </Pressable>
          </View>
        </View>
        <TextInput
          style={styles.collectionInput}
          value={collectionName}
          onChangeText={setCollectionName}
        />
      </View>
      <BottomSheet ref={bottomSheetRef} snapTo="%15">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {collectionIconData.map((item) => (
            <Pressable key={item.id} onPress={() => selectIcon(item)}>
              <Icon
                name={item.icon}
                color={
                  item.selected
                    ? LightTheme.colors.primaryPurple
                    : LightTheme.colors.placeholder
                }
                size={24}
              />
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
  collectionContainer: {
    flex: 0.5,
    aspectRatio: 4 / 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.colors.input,
    borderRadius: moderateScale(12),
  },
  collectionBody: {
    flex: 0.8,
    aspectRatio: 4 / 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: LightTheme.colors.placeholder,
    borderRadius: moderateScale(12),
  },
  collectionInput: {
    fontSize: 20,
    textAlign: "center",
    minWidth: horizontalScale(250),
  },
});

export default NewCollection;
