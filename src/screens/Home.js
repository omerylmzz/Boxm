import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import HomeHeader from "../components/headers/HomeHeader";
import LightTheme from "../themes/LightTheme";
import CollectionItem from "../components/items/CollectionItem";
import { horizontalScale, verticalScale } from "../helpers/Metrics";
import FloatingButton from "../components/buttons/FloatingButton";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../store/slices/HomeSlice";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const selector = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader />,
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(fetchCollections());
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            rowGap: verticalScale(16),
            paddingVertical: verticalScale(16),
          }}
          columnWrapperStyle={{
            gap: horizontalScale(64),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Image
                style={styles.emptyComponentImage}
                source={require("../assets/images/empty_screen_image.png")}
                resizeMode="contain"
              />
              <Text style={styles.emptyComponentTitle}>
                Hiçbir şey bulunamadı!
              </Text>
              <Text style={styles.emptyComponentDescription}>
                Yeni bir koleksiyon oluşturun
              </Text>
            </View>
          }
          data={selector.data}
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
            return (
              <CollectionItem
                icon={item.icon}
                text={item.name}
                onPress={() =>
                  navigation.navigate("Applications", {
                    COLLECTION_NAME: item.name,
                  })
                }
              />
            );
          }}
        />
        <FloatingButton onPress={() => navigation.navigate("NewCollection")} />
      </SafeAreaView>
    </SafeAreaProvider>
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
    width: SCREEN_WIDTH,
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
