import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import HomeHeader from "../components/headers/HomeHeader";
import LightTheme from "../themes/LightTheme";
import CollectionItem from "../components/items/CollectionItem";
import { horizontalScale, verticalScale } from "../helpers/Metrics";
import FloatingButton from "../components/buttons/FloatingButton";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const db = useSQLiteContext();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const results = await db.getAllAsync(`SELECT * FROM collections`);
      setCollections(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          rowGap: verticalScale(32),
          paddingVertical: verticalScale(16),
        }}
        columnWrapperStyle={{
          gap: horizontalScale(64),
        }}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyComponentContainer}>
            <Image
              style={styles.emptyComponentImage}
              resizeMode="center"
              source={require("../assets/images/empty_screen_image.png")}
            />
            <Text style={styles.emptyComponentTitle}>
              Hiçbir şey bulunamadı!
            </Text>
            <Text style={styles.emptyComponentDescription}>
              Yeni bir koleksiyon oluşturun
            </Text>
          </View>
        }
        data={
          collections.length % 2 === 1
            ? [...collections, { id: "empty-placeholder", name: "empty" }]
            : collections
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (item.id === "empty-placeholder") {
            return (
              <View
                style={{
                  width: horizontalScale(120),
                  height: verticalScale(180),
                }}
              />
            );
          }
          return <CollectionItem icon={item.icon} text={item.name} />;
        }}
      />
      <FloatingButton onPress={() => navigation.navigate("NewCollection")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
  emptyComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 3.5,
  },
  emptyComponentImage: {
    width: "100%",
    height: verticalScale(150),
  },
  emptyComponentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: LightTheme.colors.title,
  },
  emptyComponentDescription: {
    fontSize: 14,
    color: LightTheme.colors.description,
  },
});

export default Home;
